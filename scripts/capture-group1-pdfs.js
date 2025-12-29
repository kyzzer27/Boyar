/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const BASE_URL = process.env.BASE_URL || "http://localhost:3010";
const OUTPUT_DIR = path.join(
  __dirname,
  "..",
  "public",
  "aquisition-channels",
  "group-1"
);

const models = [
  { id: "founder-led-origination", name: "Founder-Led Origination" },
  { id: "linkedin-executive-outreach", name: "LinkedIn Executive Outreach" },
  { id: "commission-based-representative", name: "Commission-Based Representative Channel" },
  { id: "family-office-uhnw", name: "Family Office & UHNW Network" },
  { id: "private-banker-wealth-manager", name: "Private Banker & Wealth Manager Alliances" },
  { id: "fund-manager-pipeline", name: "Fund Manager Pipeline Programs" },
  { id: "cross-border-ma-feeder", name: "Cross-Border M&A Feeder Channel" },
  { id: "investor-club-syndicate", name: "Investor Club & Syndicate Partnerships" },
  { id: "crypto-exchange-otc", name: "Crypto Exchange / OTC Desk Partnerships" },
  { id: "incubator-accelerator", name: "Incubator & Accelerator Dealflow Access" },
  { id: "law-firm-co-branded", name: "Law Firm Strategic Co-Branded Funnels" },
  { id: "strategic-partnerships-referral", name: "Strategic Partnership & Referral Alliances" },
];

function targetPath(modelId, type) {
  return path.join(OUTPUT_DIR, `${modelId}-${type}.pdf`);
}

function pageUrl(modelId, type) {
  return `${BASE_URL}/client-acquisition/models/group-1/${modelId}/${type}`;
}

async function ensureDir() {
  await fs.promises.mkdir(OUTPUT_DIR, { recursive: true });
}

async function captureAll() {
  await ensureDir();

  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: { width: 1400, height: 2200 },
  });

  try {
    for (const model of models) {
      for (const type of ["what-is-it", "execution-playbook"]) {
        const page = await browser.newPage();

        // Pre-authenticate for ProtectedRoute
        await page.evaluateOnNewDocument(() => {
          sessionStorage.setItem("isAuthenticated", "true");
          sessionStorage.setItem("userRole", "Team");
        });

        const url = pageUrl(model.id, type);
        const output = targetPath(model.id, type);

        await page.goto(url, { waitUntil: "networkidle0", timeout: 120000 });

        // Give animations/layout a moment to settle
        await new Promise((resolve) => setTimeout(resolve, 800));

        await page.pdf({
          path: output,
          format: "A4",
          printBackground: true,
          margin: {
            top: "12mm",
            bottom: "12mm",
            left: "12mm",
            right: "12mm",
          },
        });

        console.log(`Captured ${model.id}-${type}.pdf`);
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
}

captureAll().catch((err) => {
  console.error(err);
  process.exit(1);
});

