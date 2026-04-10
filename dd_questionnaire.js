const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
        ShadingType, LevelFormat, PageNumber, PageBreak } = require("docx");

const accentColor = "1A1A2E";
const headerBg = "F0F0F5";
const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

function sectionHeading(text, num) {
  return new Paragraph({
    spacing: { before: 360, after: 200 },
    children: [
      new TextRun({ text: `Section ${num}: ${text}`, bold: true, size: 28, font: "Arial", color: accentColor }),
    ],
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: accentColor, space: 1 } },
  });
}

function questionRow(num, question, context) {
  const rows = [];
  rows.push(
    new TableRow({
      children: [
        new TableCell({
          borders, cellMargins, width: { size: 600, type: WidthType.DXA },
          shading: { fill: headerBg, type: ShadingType.CLEAR },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${num}`, bold: true, size: 20, font: "Arial" })] })],
        }),
        new TableCell({
          borders, cellMargins, width: { size: 8760, type: WidthType.DXA },
          children: [
            new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: question, bold: true, size: 21, font: "Arial" })] }),
            ...(context ? [new Paragraph({ children: [new TextRun({ text: context, size: 18, font: "Arial", italics: true, color: "666666" })] })] : []),
          ],
        }),
      ],
    })
  );
  return rows;
}

const sections = [
  {
    title: "Founder Background & Credentials",
    questions: [
      ["What were your specific roles and responsibilities at HPT Group / Forward Point Solutions?", "Include job titles, reporting lines, duration of employment, and key clients you personally managed."],
      ["Can you provide verifiable references from HPT Group \u2014 a former manager, colleague, or client who can confirm your tenure?", "Employment offer letters, relieving letters, or LinkedIn endorsements from HPT colleagues would also work."],
      ["What specific jurisdictions and service lines did you handle at HPT Group?", "E.g., did you handle trust formation in BVI, banking introductions in Switzerland, licensing in Malta, etc.?"],
      ["What prompted both of you to leave HPT Group and start Boyar Partners? Is the departure amicable?", "Important to understand if there are any non-compete or non-solicitation clauses that could restrict your operations."],
      ["What is the relationship between Boyar Partners and HPT Group going forward?", "The pricing dashboard lists HPT Group as a supplier. Is this a formal agreement or assumed?"],
      ["Who are the other four promoters (Sparsh Goja, Zulfiqar Ahmed, Kapil Mittal, Yuri Pronin) and what do they bring?", "Are they co-founders, advisors, or silent investors? What is their equity stake and active involvement?"],
    ]
  },
  {
    title: "Legal Structure & Regulatory Compliance",
    questions: [
      ["Where is Boyar Partners legally incorporated, and in which jurisdictions do you plan to register?", "Provide company registration numbers and incorporation documents."],
      ["What regulatory licenses or registrations do you currently hold or have applied for?", "TCSP licenses, FIU registrations, AML compliance certifications, etc. \u2014 specify jurisdiction for each."],
      ["What is your AML/KYC compliance framework?", "How will you screen clients, handle PEPs, and comply with CRS/FATCA reporting obligations?"],
      ["Are there any non-compete, non-solicitation, or IP assignment agreements from HPT Group that could affect Boyar Partners?", "This is critical \u2014 if HPT Group considers you a competitor using their supplier network, there could be legal exposure."],
      ["What professional indemnity or liability insurance do you carry?", "Standard for advisory firms handling wealth structuring."],
    ]
  },
  {
    title: "Business Model & Revenue",
    questions: [
      ["Your Year 1 projection shows $110,900 from 16 clients. What is your current pipeline?", "How many prospects are in conversation? Any signed LOIs, MOUs, or verbal commitments?"],
      ["How did you arrive at the specific pricing in your dashboard (141+ banking options with margins)?", "Are these based on your HPT Group experience, formal supplier agreements, or estimates?"],
      ["Do you have formal agreements with any of the suppliers listed (Gatwick AG, Law & Trust, BBCincorp, Trident Trust, Pictet Group)?", "Or are these aspirational relationships you plan to establish?"],
      ["Your gross margins show 52\u201378%. What are the realistic margins after accounting for compliance costs, failed applications, and client support?", "Banking introductions in particular can have high rejection rates."],
      ["What happens if a supplier relationship breaks down? How diversified is your supply chain per jurisdiction?", "Single-supplier dependency per jurisdiction is a key risk."],
    ]
  },
  {
    title: "Client Acquisition & Go-to-Market",
    questions: [
      ["Your total Year 1 marketing budget is $17,000 across 5 regions. How will you acquire HNWI clients with this budget?", "Your CAAC model shows a blended CPC of $3.09 \u2014 but HNWIs rarely convert from Google Ads for $30K+ structuring services."],
      ["The pitch deck shows 6 client acquisition models but they\u2019re labeled Model-1 through Model-6 with no details. What are they?", "Please provide the actual acquisition strategies, not placeholders."],
      ["What is your expected conversion rate from click to paying client, and what data supports that assumption?", "Industry benchmarks for B2B financial services typically show 1\u20133% conversion from lead to client."],
      ["Do you have any channel partnerships, referral networks, or intermediary relationships in place?", "Warm introductions are typically how offshore advisory clients are acquired, not digital ads."],
    ]
  },
  {
    title: "Capital Structure & Use of Funds",
    questions: [
      ["What is the total investment you are seeking, and what valuation are you proposing?", "Pre-money valuation, equity offered, and any existing cap table details."],
      ["Your expenditure model shows \u20B913.7M (~$150K) total capital with 76% preserved after Year 1. What is the capital already raised vs. being sought?", "Who has contributed the existing capital?"],
      ["How are the founders compensated? The salary line shows only \u20B920,000/month for a social media manager.", "Are founders drawing any salary, or is this purely equity-based? What\u2019s the plan for founder compensation once revenue starts?"],
      ["What are the milestones or conditions under which you would seek additional funding?", "Is this a one-time raise, or do you anticipate a Series A / follow-on round?"],
      ["What governance and reporting will investors receive?", "Board seat, quarterly reporting, audit rights, information rights, etc."],
    ]
  },
  {
    title: "Risk & Contingency",
    questions: [
      ["What is your biggest operational risk in Year 1 and how do you plan to mitigate it?", ""],
      ["If revenue takes 6\u201312 months longer than projected to materialize, what\u2019s the plan?", "Your runway analysis shows 39\u201371 months depending on burn mode \u2014 but what triggers the decision to cut spend?"],
      ["How do you handle a scenario where a client\u2019s structure is challenged by a regulator or tax authority?", "Professional liability and reputational risk in this space can be catastrophic."],
      ["What is your exit strategy for investors?", "Acquisition, buyback, dividend distributions, or other liquidity events?"],
    ]
  }
];

// Build document
const allChildren = [];

// Title page
allChildren.push(new Paragraph({ spacing: { before: 3000 }, alignment: AlignmentType.CENTER, children: [] }));
allChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
  new TextRun({ text: "INVESTOR DUE DILIGENCE", size: 44, bold: true, font: "Arial", color: accentColor }),
]}));
allChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [
  new TextRun({ text: "QUESTIONNAIRE", size: 44, bold: true, font: "Arial", color: accentColor }),
]}));
allChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: accentColor, space: 1 } },
  children: [] }));
allChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 300, after: 100 }, children: [
  new TextRun({ text: "Boyar Partners", size: 36, font: "Arial", color: "444444" }),
]}));
allChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [
  new TextRun({ text: "Pre-Investment Due Diligence \u2014 Confidential", size: 24, font: "Arial", color: "888888", italics: true }),
]}));
allChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [
  new TextRun({ text: "Prepared: April 2026", size: 22, font: "Arial", color: "888888" }),
]}));
allChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600, after: 200 }, children: [
  new TextRun({ text: "INSTRUCTIONS", size: 24, bold: true, font: "Arial", color: accentColor }),
]}));
allChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [
  new TextRun({ text: "Please respond to each question with supporting documentation where indicated.", size: 20, font: "Arial", color: "555555" }),
]}));
allChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [
  new TextRun({ text: "Italicized notes below each question provide context on what the investor is looking for.", size: 20, font: "Arial", color: "555555" }),
]}));
allChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [
  new TextRun({ text: "Incomplete or evasive answers will be treated as risk indicators.", size: 20, font: "Arial", color: "555555" }),
]}));

allChildren.push(new PageBreak());

// Summary box
allChildren.push(new Paragraph({ spacing: { before: 200, after: 200 }, children: [
  new TextRun({ text: "EXECUTIVE SUMMARY", size: 28, bold: true, font: "Arial", color: accentColor }),
]}));
allChildren.push(new Paragraph({ spacing: { after: 120 }, children: [
  new TextRun({ text: "This questionnaire covers 6 critical areas across 30 questions designed to validate the investment thesis for Boyar Partners. The questions are informed by a thorough review of the company\u2019s pitch deck, financial models (revenue projections, CAAC module, expenditure tracking), internal dashboard codebase, and independent market research.", size: 21, font: "Arial" }),
]}));
allChildren.push(new Paragraph({ spacing: { after: 200 }, children: [
  new TextRun({ text: "Key areas of focus: founder credibility and HPT Group connection, regulatory readiness, revenue pipeline validation, client acquisition realism, capital structure, and risk mitigation.", size: 21, font: "Arial" }),
]}));

// Sections
let qNum = 1;
sections.forEach((section, idx) => {
  allChildren.push(sectionHeading(section.title, idx + 1));
  
  const rows = [];
  // Header row
  rows.push(new TableRow({
    children: [
      new TableCell({
        borders, cellMargins, width: { size: 600, type: WidthType.DXA },
        shading: { fill: accentColor, type: ShadingType.CLEAR },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "#", bold: true, size: 20, font: "Arial", color: "FFFFFF" })] })],
      }),
      new TableCell({
        borders, cellMargins, width: { size: 8760, type: WidthType.DXA },
        shading: { fill: accentColor, type: ShadingType.CLEAR },
        children: [new Paragraph({ children: [new TextRun({ text: "Question", bold: true, size: 20, font: "Arial", color: "FFFFFF" })] })],
      }),
    ],
  }));
  
  section.questions.forEach(([q, ctx]) => {
    rows.push(...questionRow(qNum, q, ctx));
    qNum++;
  });
  
  allChildren.push(new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [600, 8760],
    rows: rows,
  }));
});

// Closing
allChildren.push(new Paragraph({ children: [new PageBreak()] }));
allChildren.push(new Paragraph({ spacing: { before: 400, after: 200 }, children: [
  new TextRun({ text: "DOCUMENT CHECKLIST", size: 28, bold: true, font: "Arial", color: accentColor }),
]}));
allChildren.push(new Paragraph({ spacing: { after: 400 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: accentColor, space: 1 } },
  children: [new TextRun({ text: "Please attach the following documents alongside your responses:", size: 21, font: "Arial" })] }));

const checklist = [
  "Proof of employment at HPT Group / Forward Point Solutions (offer letters, relieving letters, pay slips, or references)",
  "Company incorporation certificate(s) and registration documents",
  "Regulatory license applications or approvals (TCSP, FIU, AML registrations)",
  "Formal supplier / partner agreements (banking, trust, licensing providers)",
  "Cap table showing all shareholders, equity percentages, and vesting schedules",
  "Founder CVs / resumes with verifiable employment history",
  "Any existing client LOIs, MOUs, or signed engagement letters",
  "Professional indemnity insurance certificate",
  "AML/KYC policy document",
  "Shareholder agreement and investor term sheet (if available)",
];

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
  },
  numbering: {
    config: [{
      reference: "checklist",
      levels: [{
        level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } },
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: "DDDDDD", space: 1 } },
          children: [new TextRun({ text: "CONFIDENTIAL \u2014 Boyar Partners Due Diligence", size: 16, font: "Arial", color: "999999", italics: true })],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: "DDDDDD", space: 1 } },
          children: [
            new TextRun({ text: "Page ", size: 16, font: "Arial", color: "999999" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 16, font: "Arial", color: "999999" }),
          ],
        })],
      }),
    },
    children: [
      ...allChildren,
      ...checklist.map(item => new Paragraph({
        numbering: { reference: "checklist", level: 0 },
        spacing: { after: 100 },
        children: [new TextRun({ text: item, size: 21, font: "Arial" })],
      })),
      new Paragraph({ spacing: { before: 600 }, children: [] }),
      new Paragraph({
        spacing: { before: 200 },
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: accentColor, space: 1 } },
        children: []
      }),
      new Paragraph({ spacing: { before: 200, after: 100 }, children: [
        new TextRun({ text: "Please return completed responses to: ", size: 21, font: "Arial" }),
        new TextRun({ text: "joelyadav.work@gmail.com", size: 21, font: "Arial", bold: true }),
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Deadline for response: ", size: 21, font: "Arial" }),
        new TextRun({ text: "[INSERT DATE]", size: 21, font: "Arial", bold: true, color: "CC0000" }),
      ]}),
      new Paragraph({ children: [
        new TextRun({ text: "All information will be treated as strictly confidential.", size: 20, font: "Arial", italics: true, color: "888888" }),
      ]}),
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/sessions/loving-funny-bardeen/dd_questionnaire.docx", buffer);
  console.log("Done - written to /sessions/loving-funny-bardeen/dd_questionnaire.docx");
});
