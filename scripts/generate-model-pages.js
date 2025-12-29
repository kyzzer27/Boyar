#!/usr/bin/env node

/**
 * Model Page Generator
 * Generates "What is it" and "Execution Playbook" pages from structured data
 * 
 * Usage: node scripts/generate-model-pages.js <model-data.json>
 */

const fs = require('fs');
const path = require('path');

// Template for "What is it" page
function generateWhatIsItPage(model) {
  const { id, name, groupName, whatIsIt } = model;
  const modelIdVar = `is${id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}Model`;
  
  return `  // ${name} Model — professional layout
  if (${modelIdVar}) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(\`/client-acquisition/models/\${groupId}/\${modelId}\`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">${name}</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                ${name}
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

${generateWhatIsItContent(whatIsIt)}
          </main>
        </div>
      </ProtectedRoute>
    );
  }`;
}

// Template for "Execution Playbook" page
function generateExecutionPlaybookPage(model) {
  const { id, name, executionPlaybook } = model;
  const modelIdVar = `is${id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}Model`;
  
  return `  // ${name} — Execution Playbook
  if (${modelIdVar}) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(\`/client-acquisition/models/\${groupId}/\${modelId}\`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">${name}</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                ${name} — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

${generateExecutionPlaybookContent(executionPlaybook)}
          </main>
        </div>
      </ProtectedRoute>
    );
  }`;
}

// Generate content sections from structured data
function generateWhatIsItContent(content) {
  let output = '';
  
  if (content.modelDefinition) {
    output += `            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
${formatParagraphs(content.modelDefinition)}
              </div>
            </section>\n\n`;
  }
  
  if (content.whyItWorks) {
    output += `            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why This Model Works
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
${formatWhyItWorks(content.whyItWorks)}
              </div>
            </section>\n\n`;
  }
  
  if (content.criticalSection) {
    output += `            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. CRITICAL MIDDLE SECTION: ${content.criticalSection.title}
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
${formatCriticalSection(content.criticalSection.points)}
              </div>
            </section>\n\n`;
  }
  
  if (content.successFormula) {
    output += `            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  ${content.successFormula}
                </p>
              </div>
            </section>\n\n`;
  }
  
  return output;
}

function generateExecutionPlaybookContent(content) {
  let output = '';
  let sectionNum = 1;
  
  if (content.toolsRequired) {
    output += generateToolsTable(content.toolsRequired, sectionNum++);
  }
  
  if (content.sections) {
    content.sections.forEach(section => {
      output += generateSection(section, sectionNum++);
    });
  }
  
  return output;
}

function formatParagraphs(text) {
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  return paragraphs.map(p => {
    if (p.trim().startsWith('-') || p.trim().startsWith('•')) {
      // It's a list
      const items = p.split('\n').filter(i => i.trim().startsWith('-') || i.trim().startsWith('•'));
      const listItems = items.map(item => {
        const cleanItem = item.replace(/^[-•]\s*/, '').trim();
        return `                  <li className="text-justify">${cleanItem}</li>`;
      }).join('\n');
      return `                <ul className={listClass} style={{ listStylePosition: "outside" }}>
${listItems}
                </ul>`;
    } else {
      return `                <p className="text-justify">${p.trim()}</p>`;
    }
  }).join('\n');
}

function formatWhyItWorks(points) {
  const colors = ['green', 'blue', 'purple', 'slate', 'slate', 'slate'];
  return points.map((point, index) => {
    const color = colors[index % colors.length];
    const borderClass = color === 'slate' 
      ? 'border border-slate-200 rounded-lg shadow-sm'
      : `border-l-4 border-${color}-400 rounded-r-lg`;
    const bgClass = `bg-${color}-50`;
    
    return `                <div className="p-4 ${bgClass} ${borderClass}">
                  <p className="font-semibold text-gray-900">${point.label}</p>
                  <p className="text-justify">${point.description}</p>
                </div>`;
  }).join('\n');
}

function formatCriticalSection(points) {
  return points.map(point => {
    return `                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">${point.label}</p>
                  <p className="text-justify">${point.description}</p>
                </div>`;
  }).join('\n');
}

function generateToolsTable(tools, sectionNum) {
  const rows = tools.map(tool => 
    `                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">${tool.function}</td>
                        <td className="px-3 py-2 border-b border-gray-200">${tool.tool}</td>
                      </tr>`
  ).join('\n');
  
  return `            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                ${sectionNum}. Tools Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Function</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
${rows}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>\n\n`;
}

function generateSection(section, sectionNum) {
  let output = `            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                ${sectionNum}. ${section.title}
              </h2>
              <div className="space-y-${section.type === 'list' ? '3' : '4'} text-gray-800 leading-relaxed text-left">
`;
  
  if (section.type === 'table') {
    output += generateTable(section.data);
  } else if (section.type === 'list') {
    output += generateList(section.items);
  } else if (section.type === 'points') {
    output += formatWhyItWorks(section.points);
  } else if (section.type === 'text') {
    output += formatParagraphs(section.content);
  }
  
  output += `              </div>
            </section>\n\n`;
  
  return output;
}

function generateTable(data) {
  // Similar to tools table
  return '                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">\n                  <table className="w-full text-sm text-left text-gray-800">\n                    ...\n                  </table>\n                </div>';
}

function generateList(items) {
  const listItems = items.map(item => 
    `                <li className="text-justify">${item}</li>`
  ).join('\n');
  
  return `                <ul className={listClass} style={{ listStylePosition: "outside" }}>
${listItems}
                </ul>`;
}

// Main execution
if (require.main === module) {
  const modelDataFile = process.argv[2];
  
  if (!modelDataFile) {
    console.error('Usage: node scripts/generate-model-pages.js <model-data.json>');
    process.exit(1);
  }
  
  const modelData = JSON.parse(fs.readFileSync(modelDataFile, 'utf8'));
  
  console.log('Generating model pages...');
  console.log('Model:', modelData.name);
  
  // This script generates the code snippets that need to be inserted
  // The actual file insertion would be done manually or with another script
  const whatIsItCode = generateWhatIsItPage(modelData);
  const playbookCode = generateExecutionPlaybookPage(modelData);
  
  console.log('\n=== WHAT IS IT CODE ===');
  console.log(whatIsItCode);
  console.log('\n=== EXECUTION PLAYBOOK CODE ===');
  console.log(playbookCode);
}

module.exports = { generateWhatIsItPage, generateExecutionPlaybookPage };







