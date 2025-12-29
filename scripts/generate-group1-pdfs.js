/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

let React;
let pdf;
let Document;
let Page;
let Text;
let View;
let StyleSheet;

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

let styles;

function bulletList(items) {
  return items.map((item, idx) =>
    React.createElement(
      View,
      { key: idx, style: styles.bullet },
      React.createElement(View, { style: styles.bulletDot }),
      React.createElement(Text, { style: styles.bulletText }, item)
    )
  );
}

function createPdfDoc(modelName, type) {
  const label = type === "what-is-it" ? "What Is It" : "Execution Playbook";
  const summary =
    "Use capture-group1-pdfs.js for pixel-accurate PDFs. This generator is retained only as a fallback template.";
  const highlights = [
    "Clean grid layout with enforced margins",
    "Text aligned to columns with no overflow",
    "Optimized for on-screen viewing and browser download",
  ];

  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: "A4", style: styles.page },
      React.createElement(
        View,
        { style: styles.header },
        React.createElement(Text, { style: styles.title }, modelName),
        React.createElement(Text, { style: styles.subtitle }, label)
      ),
      React.createElement(
        View,
        { style: styles.grid },
        React.createElement(
          View,
          { style: styles.column },
          React.createElement(Text, { style: styles.sectionTitle }, "Overview"),
          React.createElement(Text, { style: styles.paragraph }, summary),
          React.createElement(Text, { style: styles.sectionTitle }, "Structure"),
          ...bulletList([
            "Consistent 2-column grid for balanced reading.",
            "Margins maintained to avoid clipping in viewers.",
            "Typography tuned for clarity at 11pt.",
          ])
        ),
        React.createElement(
          View,
          { style: styles.column },
          React.createElement(Text, { style: styles.sectionTitle }, "Key Notes"),
          ...bulletList(highlights),
          React.createElement(
            Text,
            { style: [styles.paragraph, { marginTop: 8 }] },
            "These files are served statically from the dashboard and open directly in the browser's PDF viewer for faster access."
          )
        )
      )
    )
  );
}

async function ensureDir() {
  await fs.promises.mkdir(OUTPUT_DIR, { recursive: true });
}

async function generateAll() {
  // Lazy-load ESM modules so the script runs under CommonJS
  const renderer = await import("@react-pdf/renderer");
  React = (await import("react")).default;
  pdf = renderer.pdf;
  Document = renderer.Document;
  Page = renderer.Page;
  Text = renderer.Text;
  View = renderer.View;
  StyleSheet = renderer.StyleSheet;
  styles = StyleSheet.create({
    page: {
      padding: 36,
      backgroundColor: "#ffffff",
      color: "#1f2937",
      fontSize: 11,
    },
    header: {
      marginBottom: 14,
      borderBottom: "1 solid #e5e7eb",
      paddingBottom: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: 700,
      color: "#0f172a",
    },
    subtitle: {
      fontSize: 12,
      color: "#475569",
      marginTop: 4,
    },
    grid: {
      display: "flex",
      flexDirection: "row",
      gap: 12,
    },
    column: {
      flex: 1,
      border: "1 solid #e5e7eb",
      padding: 12,
      borderRadius: 6,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: 700,
      marginBottom: 6,
      color: "#0f172a",
    },
    paragraph: {
      marginBottom: 8,
      lineHeight: 1.45,
      textAlign: "justify",
    },
    bullet: {
      flexDirection: "row",
      marginBottom: 4,
    },
    bulletDot: {
      width: 4,
      height: 4,
      marginTop: 4,
      marginRight: 6,
      backgroundColor: "#0ea5e9",
      borderRadius: 2,
    },
    bulletText: {
      flex: 1,
      lineHeight: 1.45,
    },
  });

  await ensureDir();
  for (const model of models) {
    for (const type of ["what-is-it", "execution-playbook"]) {
      const filename = `${model.id}-${type}.pdf`;
      const target = path.join(OUTPUT_DIR, filename);
      const doc = createPdfDoc(model.name, type);
      // eslint-disable-next-line no-await-in-loop
      const buffer = await pdf(doc).toBuffer();
      await fs.promises.writeFile(target, buffer);
      console.log(`Generated ${filename}`);
    }
  }
}

generateAll().catch((err) => {
  console.error(err);
  process.exit(1);
});

