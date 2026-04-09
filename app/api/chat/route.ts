import { NextRequest, NextResponse } from "next/server";
import pageRegistry from "@/lib/chatbot/page-registry.json";

// ── Load ALL available Gemini API keys into a pool ──
// Supports: GEMINI_API_KEY, GEMINI_API_KEY_1 .. GEMINI_API_KEY_10
const GEMINI_API_KEYS: string[] = [];
if (process.env.GEMINI_API_KEY) GEMINI_API_KEYS.push(process.env.GEMINI_API_KEY);
for (let i = 1; i <= 10; i++) {
  const k = process.env[`GEMINI_API_KEY_${i}`];
  if (k) GEMINI_API_KEYS.push(k);
}
let geminiKeyIndex = 0; // round-robin pointer

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

const GEMINI_MODEL = "gemini-2.5-flash";
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

function geminiUrl(apiKey: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
}

// ============================================================
// PAGE REGISTRY TYPES
// ============================================================

interface PageEntry {
  name: string;
  route: string;
  content: string[];
}

type Registry = Record<string, PageEntry>;
const registry = pageRegistry as unknown as Registry;
const N = Object.keys(registry).length;

// ============================================================
// CONTENT-AWARE SEARCH INDEX
// ============================================================
// Three tiers:
//   nameIndex  — words from page name & route (highest priority)
//   fieldIndex — structured data values: jurisdictions, banks, services, etc.
//   wordIndex  — all other content words (lowest priority)
// ============================================================

type Index = Record<string, Set<string>>;

const STOPWORDS = new Set([
  "the","and","for","are","but","not","you","all","can","had","her","was",
  "one","our","out","has","his","how","its","may","new","now","see","way",
  "who","did","get","let","say","she","too","use","with","from","have",
  "been","will","would","could","should","their","there","these","those",
  "which","where","about","after","before","other","under","over","into",
  "also","than","then","only","just","more","most","some","such","each",
  "every","both","well","very","much","many","still","back","down","even",
  "find","give","help","here","know","last","long","look","make","part",
  "take","them","they","this","what","when","does","were","based","across",
  "through","within","being","same","like","need","page","tell","give",
  "show","want","please","summarize","summarise","summary","overview",
]);

function buildIndexes(): { nameIdx: Index; fieldIdx: Index; wordIdx: Index } {
  const nameIdx: Index = {};
  const fieldIdx: Index = {};
  const wordIdx: Index = {};

  const addTo = (idx: Index, term: string, route: string) => {
    if (!idx[term]) idx[term] = new Set();
    idx[term].add(route);
  };

  for (const [route, data] of Object.entries(registry)) {
    // ── Name & route words (tier 1) ──
    const nameWords = (data.name + " " + route).toLowerCase().match(/[a-z]{3,}/g) || [];
    for (const w of new Set(nameWords)) addTo(nameIdx, w, route);

    // Also index 2-word name phrases (e.g. "trust foundations", "burn rate", "year 1")
    const nw = nameWords.filter((w) => !STOPWORDS.has(w));
    for (let i = 0; i < nw.length - 1; i++) {
      addTo(nameIdx, `${nw[i]} ${nw[i + 1]}`, route);
    }

    const seenFields = new Set<string>();
    const seenWords = new Set<string>();

    for (const item of data.content) {
      // ── Structured field values (tier 2) ──
      const fieldPattern =
        /(?:Jurisdiction|jurisdiction|Bank|Service|Category|Item|Option|Month|License|companyType|supplierName|region):\s*([^|$\n]+)/g;
      let m;
      while ((m = fieldPattern.exec(item)) !== null) {
        const val = m[1].trim().replace(/\s*\|?\s*$/, "").toLowerCase();
        if (val.length > 2 && !["—", "null", "true", "false", "n/a"].includes(val) && !seenFields.has(val)) {
          seenFields.add(val);
          addTo(fieldIdx, val, route);
          // Index individual words of multi-word field values
          for (const w of val.split(/\s+/)) {
            const clean = w.replace(/[^a-z]/g, "");
            if (clean.length > 2) addTo(fieldIdx, clean, route);
          }
        }
      }

      // ── Content words (tier 3) ──
      const words = item.match(/\b[a-zA-Z]{4,}\b/g) || [];
      for (const w of words) {
        const wl = w.toLowerCase();
        if (!STOPWORDS.has(wl) && !seenWords.has(wl)) {
          seenWords.add(wl);
          addTo(wordIdx, wl, route);
        }
      }
    }
  }

  return { nameIdx, fieldIdx, wordIdx };
}

const { nameIdx, fieldIdx, wordIdx } = buildIndexes();

// ============================================================
// SEARCH FUNCTION
// ============================================================

function idf(termRoutes: Set<string> | undefined): number {
  if (!termRoutes || termRoutes.size === 0) return 0;
  return Math.log(N / termRoutes.size + 1);
}

function findRelevantPages(userText: string, maxResults = 4): PageEntry[] {
  const lower = userText.toLowerCase();
  const words = (lower.match(/[a-z]{3,}/g) || []).filter((w) => !STOPWORDS.has(w));
  const scores: Record<string, number> = {};

  // ── Single word matches ──
  for (const w of words) {
    // Tier 1: page name/route match (weight 15)
    if (nameIdx[w]) {
      const weight = 15 * idf(nameIdx[w]);
      for (const r of nameIdx[w]) scores[r] = (scores[r] || 0) + weight;
    }
    // Tier 2: field value match (weight 8)
    if (fieldIdx[w]) {
      const weight = 8 * idf(fieldIdx[w]);
      for (const r of fieldIdx[w]) scores[r] = (scores[r] || 0) + weight;
    }
    // Tier 3: content word match (weight 1)
    if (wordIdx[w]) {
      const weight = 1 * idf(wordIdx[w]);
      for (const r of wordIdx[w]) scores[r] = (scores[r] || 0) + weight;
    }
  }

  // ── 2-word phrase matches ──
  for (let i = 0; i < words.length - 1; i++) {
    const p2 = `${words[i]} ${words[i + 1]}`;

    // Name phrase match (weight 30) — e.g. "trust page", "year 2", "burn rate"
    if (nameIdx[p2]) {
      const weight = 30 * idf(nameIdx[p2]);
      for (const r of nameIdx[p2]) scores[r] = (scores[r] || 0) + weight;
    }
    // Field phrase match (weight 20) — e.g. "hong kong", "cayman islands"
    if (fieldIdx[p2]) {
      const weight = 20 * idf(fieldIdx[p2]);
      for (const r of fieldIdx[p2]) scores[r] = (scores[r] || 0) + weight;
    }
  }

  // ── 3-word phrase matches ──
  for (let i = 0; i < words.length - 2; i++) {
    const p3 = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
    if (fieldIdx[p3]) {
      for (const r of fieldIdx[p3]) scores[r] = (scores[r] || 0) + 40;
    }
    if (nameIdx[p3]) {
      for (const r of nameIdx[p3]) scores[r] = (scores[r] || 0) + 50;
    }
  }

  // Sort and return top results above threshold
  const sorted = Object.entries(scores)
    .filter(([, s]) => s > 10)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxResults);

  return sorted.map(([route]) => registry[route]).filter(Boolean);
}

// ============================================================
// BUILD PAGE CONTEXT FOR INJECTION
// ============================================================

function buildPageContext(pages: PageEntry[]): string {
  if (pages.length === 0) return "";

  const blocks = pages.map((page) => {
    const contentText = page.content.join("\n");
    return `--- PAGE: ${page.name} (${page.route}) ---\n${contentText}`;
  });

  return `

=== MATCHED PAGE CONTENT ===
The user is asking about content from a specific dashboard page. Below is the EXACT content extracted from that page.

CRITICAL INSTRUCTIONS:
1. Use ONLY the content below to answer questions about this page.
2. Do NOT mix this with the general knowledge base or content from other pages.
3. If asked for a summary, cover ALL sections comprehensively.
4. Quote specific numbers, names, jurisdictions, and details EXACTLY as they appear.
5. For pricing questions, find the exact row matching the jurisdiction/entity asked about and quote the Boyar Price.
6. If the data does not contain what was asked, say so honestly.

${blocks.join("\n\n")}

=== END OF PAGE CONTENT ===
`;
}

// ============================================================
// SYSTEM PROMPT
// ============================================================

const BASE_SYSTEM_PROMPT = `You are the Boyar Partners AI Assistant — a knowledgeable, professional, and credible expert on cross-border trust and corporate services (TCSP), the offshore structuring industry, and Boyar Partners specifically.

=== TONE & PERSONALITY ===

You are speaking to potential investors and partners. Be:
- Professional, warm, and confident — like a senior relationship manager at a respected firm.
- Clear and precise with data — always quote exact figures when available.
- Honest about limitations — Boyar Partners is pre-seed, pre-revenue. Revenue figures are PROJECTIONS. Moats are STRATEGIC INTENTIONS. Frame accurately but positively.
- Supportive of Boyar's positioning without being promotional or sycophantic — let the data speak for itself. If Boyar has a genuine advantage, state it factually. If something is aspirational, label it as planned or projected.
- Never dismissive of competitors — acknowledge the market landscape professionally.
- If you don't know something, say so clearly rather than guessing.

=== HOW YOU MUST BEHAVE ===

RULE 1 — PAGE CONTENT IS SUPREME: When MATCHED PAGE CONTENT is provided below, answer using ONLY that content. This is the exact data from the actual dashboard page. Do not supplement with data from other pages. Do not invent figures.

RULE 2 — DATA LOOKUP: When someone asks about a specific jurisdiction, bank, service, or pricing — FIND the exact matching row in the page content. Quote the exact Boyar Price, Supplier Cost, and Margin. For example, if asked "banking price for Julius Baer", find the row containing "Bank Julius Baer" and state: Supplier Cost $1,174, Boyar Price $5,500, Margin 78.7%.

RULE 3 — PRICING COMPLETENESS: For pricing questions, always provide all three: Supplier Cost (what Boyar pays), Boyar Client Price (what the client pays), and Gross Margin. If any of these is "On Quote", say so and explain that pricing is bespoke for that jurisdiction.

RULE 4 — GENERAL KNOWLEDGE BASE: When no specific page content is matched, use the general knowledge base below.

RULE 5 — WEB SEARCH FOR GENERIC QUESTIONS: When the user asks a generic or definitional question (e.g., "what is bps", "what is MiCA", "explain SEPA", "how do EMIs work"), use web search results to give a clear, accurate, and helpful answer — even if related terms appear in the dashboard data. If the question is clearly asking for a general definition or explanation rather than Boyar-specific data, use web search. You can combine dashboard data with web search results when appropriate (e.g., "what is bps" → explain the concept from web search, then mention Boyar's specific bps rates from the dashboard).

RULE 6 — HONEST GAPS: If something isn't in the matched page content, the knowledge base, or web search results, say clearly: "I don't have that specific information at the moment." Never say a term is "not defined or mentioned" if it actually appears in the page content — check the content carefully before claiming it is missing.

RULE 7 — COMPLETE SUMMARIES: When asked to summarize a page or a pricing category, cover every section and data point comprehensively.

RULE 8 — FORMATTING: Professional but conversational. Plain text with line breaks. No markdown headers (no **, no ##). Use dashes for lists. Keep responses focused and well-structured.

=== BOYAR PARTNERS GENERAL KNOWLEDGE BASE ===

COMPANY: Boutique cross-border TCSP targeting HNWIs, family offices, globally mobile entrepreneurs. UK public-facing entity. Pre-seed, pre-revenue. Founder-led Year 1-2.

JURISDICTIONS: 53 target via Boyar Network. Primary: UAE (ADGM, DIFC, RAK, VARA), Singapore, Hong Kong, BVI, Cayman, Mauritius, UK, GIFT City.

SERVICES: Company Formation, Trust & Foundation Structuring, Corporate Services, Banking Introduction, Licensing (VASP/MiCA/forex/banking/gaming), Fund Admin, Custodian, Family Office Admin, Estate Planning, Succession, Economic Substance, Office Registration, Redomiciliation, Marine Services, Accounting, Tokenisation, Shelf Companies, Citizenship & Residency Stewardship.

REVENUE PROJECTIONS (Year 1-5):
- Year 1: $110,900 (16 clients). Breakdown: Company Formation 6x$2,500=$15,000, Standalone Trust 1x$13,000=$13,000, Full Structure 2x$29,700=$59,400, Corporate Services 4x$3,500=$14,000, Office Registration 2x$1,500=$3,000, Banking Introduction 1x$6,500=$6,500.
- Year 2: $212,780 (91.9% growth). Includes $61,180 renewals from 9 Y1 clients. First licensing revenue expected.
- Year 3: $528,900. Scaling with licensing mandates and renewal flywheel.
- Year 4: $985,000. Licensing and multi-vertical compounding.
- Year 5: $1,754,200. 73 entities under administration generating $128K+ annual recurring at 90%+ gross margin.

PRICING SUMMARY:
- Banking: 75-80% gross margin (Group 1 private banks), 25-35% (Group 2 corporate/EMI banks). 141+ bank options across 30+ jurisdictions.
- Company Formation: 43-56% target GM. 53 jurisdictions. Avg $2,500.
- Trust: 25-48% implied GM depending on jurisdiction. 17 jurisdictions. Jersey $12K, Cook Islands $13K, Nevis $8K.
- Foundation: 30-50% implied GM. 9 jurisdictions. Guernsey $22K, Gibraltar $18K, Cook Islands $16K.
- Trustee Services: 17-35% GM. Nominee Shareholder $1,150, Nominee Director $1,250, Nominee Trustee $1,750.
- Full Structure mandate avg $29,700 per client. Advisory conversion target: 30%.
- Licensing: On Quote. Single $75K VASP mandate projects $150-200K lifecycle revenue.

FUNDRAISING: ₹1.30 Crore (~$137K) for 20% post-money. Pre-money ₹5.11 Crore (~$548K). Three tranches (₹40L/₹50L/₹40L at M0/M6/M9). Scenario A (equity only) vs B (equity + follow-on right with dual triggers).

COMPETITORS: Tier 1 mass incorporators (Ocra, BBCincorp — $1-3K, zero advisory). Tier 2 planned (Boyar — $9-12K blended, 15-25% below Tier 3). Tier 3 legacy firms (Sovereign, TMF, Vistra, Appleby — $15-50K+). Direct: Dixcart, Amicorp, Astons, Ocra, Rosemont, Trident Trust.

7 MOATS: Advisory (30% conversion), Relationship (named-advisor), Licensing (first TCSP with VASP/MiCA practice), Experience (digital-native), Renewal Flywheel (73 entities by Y5), Boyar Network (100+ partners, 53 jurisdictions), Multi-Vertical Architecture (3.8x LTV multiplier).

6 RISKS: Founder Dependency(H), MiCA Timeline(H), Client Concentration(M), Banking Fragility(M), Competitive Pressure(M), Regulatory Changes(H).

=== END OF GENERAL KNOWLEDGE BASE ===
`;

// ============================================================
// SYSTEM PROMPT BUILDER
// ============================================================

function buildSystemPrompt(messages: ChatMessage[], currentPage?: string): { prompt: string; hasPageMatch: boolean } {
  const recentText = messages.slice(-6).map((m) => m.content).join(" ");
  const matchedPages = findRelevantPages(recentText);

  // Always inject the current page context if we have it in the registry
  let currentPageEntry: PageEntry | null = null;
  if (currentPage) {
    // Try exact match first, then try matching route prefixes
    if (registry[currentPage]) {
      currentPageEntry = registry[currentPage];
    } else {
      // Find the longest matching route prefix
      const matchingRoutes = Object.keys(registry).filter((r) => currentPage.startsWith(r));
      if (matchingRoutes.length > 0) {
        const bestMatch = matchingRoutes.sort((a, b) => b.length - a.length)[0];
        currentPageEntry = registry[bestMatch];
      }
    }
  }

  // Merge: current page first (if not already in matches), then search matches
  const allPages: PageEntry[] = [];
  if (currentPageEntry) {
    allPages.push(currentPageEntry);
  }
  for (const page of matchedPages) {
    if (!currentPageEntry || page.route !== currentPageEntry.route) {
      allPages.push(page);
    }
  }
  // Cap at 5 pages total
  const finalPages = allPages.slice(0, 5);

  let pageAwareNote = "";
  if (currentPageEntry) {
    pageAwareNote = `\n\nRULE 9 — CURRENT PAGE AWARENESS: The user is currently viewing the "${currentPageEntry.name}" page (${currentPageEntry.route}). When the user asks for a summary, explanation, or general question without specifying a topic, provide information about THIS page. Use the page content below to generate a professional, accurate summary with exact figures and data points. If they ask something unrelated to this page, answer normally using search matches or general knowledge.\n`;
  }

  if (finalPages.length === 0) return { prompt: BASE_SYSTEM_PROMPT + pageAwareNote, hasPageMatch: false };
  return { prompt: BASE_SYSTEM_PROMPT + pageAwareNote + buildPageContext(finalPages), hasPageMatch: true };
}

// ============================================================
// QUERY CLASSIFIER
// ============================================================

type ModelTier = "lite" | "heavy";

function classifyQuery(messages: ChatMessage[]): ModelTier {
  const last = messages[messages.length - 1]?.content ?? "";
  const lower = last.toLowerCase();
  const wordCount = last.split(/\s+/).length;

  const heavyKeywords = [
    "compare","comparison","versus","vs","difference","analyze","analyse",
    "analysis","evaluate","strategy","strategic","recommend","advise",
    "structure","structuring","explain in detail","walk me through",
    "break down","elaborate","compliance","regulatory","regulation",
    "projection","forecast","scenario","risk","due diligence","valuation",
    "moat","competitive","differentiation","why","how does","how would",
    "what if","pros and cons","trust","licensing","fund administration",
    "investor","fundraising","pre-seed","cap table","summary","summarize",
    "summarise","overview","tell me about","what does the","give me the",
    "page","price","pricing","cost","how much","expenditure","revenue",
    "burn rate","cac","acquisition",
  ];

  const isLong = wordCount >= 12;
  const isMultiQ = (lower.match(/\?/g) || []).length >= 2;
  const hasHeavy = heavyKeywords.some((kw) => lower.includes(kw));
  const isDeep = messages.length >= 8;

  return isLong || isMultiQ || hasHeavy || isDeep ? "heavy" : "lite";
}

// ============================================================
// MODEL CALLERS
// ============================================================

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

async function callDeepSeek(messages: ChatMessage[], systemPrompt: string): Promise<string> {
  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      temperature: 0.3,
      max_tokens: 4096,
      stream: false,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("DeepSeek error:", res.status, err);
    throw new Error(`DeepSeek error: ${res.status}`);
  }

  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "";
}

async function callGemini(messages: ChatMessage[], systemPrompt: string, useGrounding = false): Promise<string> {
  const body: Record<string, unknown> = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    generationConfig: { temperature: 0.3, topP: 0.95, maxOutputTokens: 4096 },
  };

  if (useGrounding) {
    body.tools = [{ google_search: {} }];
  }

  // Try each key in the pool, rotating on quota/auth errors
  const totalKeys = GEMINI_API_KEYS.length;
  for (let attempt = 0; attempt < totalKeys; attempt++) {
    const keyIdx = (geminiKeyIndex + attempt) % totalKeys;
    const apiKey = GEMINI_API_KEYS[keyIdx];
    const url = geminiUrl(apiKey);

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      // Advance pointer so next call starts with next key (round-robin)
      geminiKeyIndex = (keyIdx + 1) % totalKeys;
      const data = await res.json();
      return (
        data?.candidates?.[0]?.content?.parts
          ?.filter((p: { text?: string }) => p.text)
          .map((p: { text: string }) => p.text)
          .join("\n") ?? ""
      );
    }

    const errText = await res.text();
    console.error(`Gemini key ${keyIdx + 1}/${totalKeys} error (${res.status}):`, errText.slice(0, 200));

    // If quota exhausted (429) or auth error (401/403), try next key
    if (res.status === 429 || res.status === 401 || res.status === 403) {
      console.log(`Key ${keyIdx + 1} exhausted/invalid, trying next key...`);
      continue;
    }

    // For other errors (500, etc.), don't retry with another key
    throw new Error(`Gemini error: ${res.status}`);
  }

  throw new Error(`All ${totalKeys} Gemini API keys exhausted`);
}

// ============================================================
// ROUTE HANDLER
// ============================================================

export async function POST(req: NextRequest) {
  if (!DEEPSEEK_API_KEY && GEMINI_API_KEYS.length === 0) {
    return NextResponse.json({ error: "No API keys configured." }, { status: 500 });
  }

  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages ?? [];
    const currentPage: string | undefined = body.currentPage;
    if (messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const { prompt: systemPrompt, hasPageMatch } = buildSystemPrompt(messages, currentPage);
    const tier = classifyQuery(messages);
    const useGrounding = true;
    let reply = "";
    let model = "";

    if (tier === "heavy" && DEEPSEEK_API_KEY) {
      try {
        reply = await callDeepSeek(messages, systemPrompt);
        model = "deepseek-v3.2";
      } catch {
        if (GEMINI_API_KEYS.length > 0) {
          reply = await callGemini(messages, systemPrompt, useGrounding);
          model = `gemini-2.5-flash (fallback, ${GEMINI_API_KEYS.length} keys)`;
        }
      }
    } else if (GEMINI_API_KEYS.length > 0) {
      try {
        reply = await callGemini(messages, systemPrompt, useGrounding);
        model = `gemini-2.5-flash (${GEMINI_API_KEYS.length} keys)`;
      } catch {
        if (DEEPSEEK_API_KEY) {
          reply = await callDeepSeek(messages, systemPrompt);
          model = "deepseek-v3.2 (fallback)";
        }
      }
    } else if (DEEPSEEK_API_KEY) {
      reply = await callDeepSeek(messages, systemPrompt);
      model = "deepseek-v3.2";
    }

    if (!reply) {
      return NextResponse.json({ error: "All models failed" }, { status: 502 });
    }

    return NextResponse.json({ reply, model });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
