import React from 'react';

export const libraryAssets = [
  { file: 'botsfired-primary-transparent.png', label: 'Existing primary cutout', format: 'PNG · true alpha', purpose: 'Existing platform derivative of the same primary original · not a vector master' },
  { file: 'botsfired-contrast.json', label: 'Calculated contrast matrix', format: 'JSON', purpose: 'Ten normal-text semantic pairs in light and dark reading schemes' },
  { file: 'botsfired-tokens-resolved.json', label: 'Resolved token values', format: 'JSON', purpose: 'Typed values for consumers; generated from DTCG aliases' },
  { file: 'botsfired-primary.png', label: 'Primary logo', format: 'PNG', purpose: 'Existing source asset · digital placements' },
  { file: 'botsfired-alternate.png', label: 'Alternate mark', format: 'PNG', purpose: 'Existing source asset · alternate placements' },
  { file: 'botsfired-tokens.css', label: 'CSS token library', format: 'CSS', purpose: 'Brand and semantic custom properties' },
  { file: 'botsfired-tokens.json', label: 'Machine-readable tokens', format: 'JSON', purpose: 'Source CSS variables; aliases retain var() expressions' },
  { file: 'botsfired-guidelines.md', label: 'Source guidelines', format: 'Markdown', purpose: 'Existing repository documentation; review alongside live specs' },
  { file: 'botsfired-deck-starter.html', label: 'Editable presentation', format: 'HTML · 16:9', purpose: 'Three editable slides · starter, production review required' },
  { file: 'botsfired-merchandise-starter.svg', label: 'Merchandise placement', format: 'SVG · 1200 × 800', purpose: 'Editable shirt placement · starter, production review required' },
  { file: 'botsfired-call-navy.svg', label: 'Navy call background', format: 'SVG · 1920 × 1080', purpose: 'Existing embedded logo · starter, production review required' },
  { file: 'botsfired-call-warm.svg', label: 'Warm call background', format: 'SVG · 1920 × 1080', purpose: 'Existing embedded logo · starter, production review required' },
];

export function AssetLibrary() {
  return <section aria-labelledby="asset-heading"><h2 id="asset-heading">Asset library</h2><p className="mt-3 mb-6 text-[#4B5563]">Choose by purpose and format. SVG logo variants are exported from the Logo System gallery. Application starters are new working files, not approved brand masters.</p><div className="space-y-3">{libraryAssets.map(asset => <div key={asset.file} className="bg-white border border-[#E8E6E0] rounded-2xl p-5 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between"><div className="min-w-0"><h3 className="text-xl">{asset.label}</h3><p className="text-sm text-[#4B5563]">{asset.format} · {asset.purpose}</p></div><a href={`/assets/${asset.file}`} download className="ds-download shrink-0" aria-label={`Download ${asset.label}`}>Download</a></div>)}</div></section>;
}

export function ApplicationsSection() {
  return <section aria-labelledby="applications-heading"><h2 id="applications-heading">Application starters</h2><p className="mt-3 text-[#4B5563]">Adapt the existing marks, palette and typography to a specific deliverable. These newly created starters need production review; they do not establish additional approved brand rules.</p><div className="mt-6 p-5 bg-[#EEF2F8] border border-[#D0DAE8] rounded-2xl"><h3 className="text-xl">Before sending to production</h3><p className="text-sm">Check content, logo fidelity, font licensing and embedding, contrast, dimensions and output format. Obtain printer or supplier requirements for bleed, colour conversion and minimum reproduction sizes. No print-ready or manufacturing-ready certification is implied.</p></div><div className="grid sm:grid-cols-2 gap-6 mt-6">{[
    {title:'Presentations', text:'Three 16:9 HTML slides with editable text. Download and open locally; save edits or print to PDF. Uses a system-font fallback, so review typography before presenting.', file:'botsfired-deck-starter.html'},
    {title:'Merchandise', text:'Editable SVG shirt-placement sketch with the existing primary asset embedded. Confirm vector requirements and physical sizing with your supplier.', file:'botsfired-merchandise-starter.svg'},
    {title:'Call backgrounds · navy', text:'1920 × 1080 SVG with the original logo embedded. Export to PNG if your meeting software requires it; test crop, mirroring and participant placement.', file:'botsfired-call-navy.svg'},
    {title:'Call backgrounds · warm', text:'A light alternative using Warm 50 and Navy 500. Review the camera crop before using it in a call.', file:'botsfired-call-warm.svg'},
  ].map(item=><article key={item.file} className="p-6 rounded-2xl border border-[#E8E6E0] bg-white">{item.file.endsWith('.svg')&&<img className="w-full rounded-xl mb-4" src={`/assets/${item.file}`} alt={`${item.title} starter preview`}/>}<h3 className="text-2xl">{item.title}</h3><p className="text-sm text-[#4B5563] my-4">{item.text}</p><a className="ds-download" href={`/assets/${item.file}`} download>Download {item.title} starter</a></article>)}</div><p className="mt-6 text-[#4B5563]">Print layouts and email signatures are illustrated in Logo System; editorial and social examples are in Templates. Review illustrative examples before production use.</p></section>;
}

export function GovernanceSection() {
  return <section aria-labelledby="governance-heading"><h2 id="governance-heading">Governance &amp; releases</h2><p className="mt-3 text-[#4B5563]">A practical review workflow for this repository. It is proposed contributor guidance, not a claim about an established approval committee or company policy.</p><ol className="space-y-5 mt-6 list-decimal pl-6">{[
    ['Propose the change','Describe the use case, affected tokens or components, and whether existing consumers need migration. Keep source assets intact.'],
    ['Review the evidence','Compare against current BotsFired assets and tokens. Identify new application starters explicitly. Obtain review from the repository owner or an appropriate reviewer before treating new material as approved.'],
    ['Verify the implementation','Build, inspect all affected viewport sizes, test keyboard navigation and downloads, check contrast, and review original and high-contrast modes. Avoid asserting that a passing spec checker proves complete accessibility.'],
    ['Publish an immutable release','Record the exact commit and asset manifest. Coordinate with the platform deployment owner so the design artifact remains pinned and other production sites stay untouched.'],
    ['Keep a migration and rollback note','Document changed token values, replacements and consumer actions. Retain the prior artifact; roll back through the platform workflow if verification fails.'],
  ].map(([title,text])=><li key={title} className="bg-white border border-[#E8E6E0] rounded-2xl p-5"><h3 className="text-xl">{title}</h3><p className="text-sm text-[#4B5563] mt-2">{text}</p></li>)}</ol><div className="mt-6 p-5 bg-white border border-[#E8E6E0] rounded-2xl"><h3 className="text-xl">Release checklist</h3><p className="text-sm mt-2">Source commit · changed files · token migration notes · asset formats and purpose · review status · build and viewport evidence · deployed artifact checksum · live URL · rollback target.</p><p className="text-sm mt-3">The design hub is unlinked and excluded from search indexing. Its URL remains publicly accessible; do not place confidential material here.</p></div></section>;
}
