import { NextResponse } from "next/server";

function rewriteToAbsoluteUrls(html: string): string {
  return html
    .replace(/(src|href)=["']\/(?!\/)/g, '$1="https://realfood.gov/')
    .replace(/(srcset|imagesrcset)=["']\/(?!\/)/gi, '$1="https://realfood.gov/');
}

function replaceHeadline(html: string): string {
  let out = html;
  out = out.replace(/Real Food\s*<br\s*\/?>\s*Wins/gi, "Boyar Partners");
  out = out.replace(/<span>\s*Real Food\s*<\/span>\s*<br\/?>\s*<span[^>]*>\s*Wins\s*<\/span>/gi, "Boyar Partners");
  out = out.replace(/>\s*Real Food\s*<\s*\/span>\s*<br\/?>\s*<span[^>]*>\s*Wins\s*</gi, ">Boyar Partners<");
  return out;
}

function injectRuntimePatch(html: string): string {
  const patchScript = `
<script>
(() => {
  function patchHeroTitle() {
    const headings = Array.from(document.querySelectorAll("h1"));
    for (const h1 of headings) {
      const text = (h1.textContent || "").replace(/\\s+/g, " ").trim().toLowerCase();
      if (text.includes("real food") && text.includes("wins")) h1.textContent = "Boyar Partners";
    }
  }

  patchHeroTitle();
  const observer = new MutationObserver(() => patchHeroTitle());
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  setTimeout(() => observer.disconnect(), 12000);
})();
</script>`;

  if (html.includes("</body>")) return html.replace("</body>", `${patchScript}</body>`);
  return `${html}${patchScript}`;
}

export async function GET() {
  try {
    const res = await fetch("https://realfood.gov/", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BoyarMirror/1.0)",
        Accept: "text/html,application/xhtml+xml",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to load upstream site (${res.status})` },
        { status: 502 },
      );
    }

    const html = await res.text();
    const rewritten = injectRuntimePatch(replaceHeadline(rewriteToAbsoluteUrls(html)));

    return new NextResponse(rewritten, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to mirror realfood.gov" },
      { status: 500 },
    );
  }
}

