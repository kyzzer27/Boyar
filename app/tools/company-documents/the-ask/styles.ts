export const ASK_STYLES = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
.ask-page{
  --bg:#FDFBEE;--surface:#F7F5E8;--surface2:#F0EDDF;
  --border:#E0DDD0;--text:#1a1a1a;--muted:#4a4a4a;--dim:#7a7a7a;
  --red:#FF0000;--black:#000;
  --gold:#C9A84C;--gold-dark:#8B6914;
  --font:'DM Sans',sans-serif;
}
.ask-page{font-family:var(--font);font-size:15px;line-height:1.7;color:var(--text);background:var(--bg);font-weight:500;-webkit-font-smoothing:antialiased;min-height:100vh}
.ask-page .red{color:var(--red)}.ask-page .gold{color:var(--gold)}
.ask-page .hdr{position:sticky;top:0;z-index:100;background:rgba(253,251,238,.93);backdrop-filter:blur(20px);border-bottom:1px solid var(--border)}
.ask-page .hdr-inner{max-width:1400px;margin:0 auto;padding:0 48px;display:flex;align-items:center;justify-content:space-between;height:56px}
.ask-page .logo{font-weight:800;font-size:13px;letter-spacing:4px;text-transform:uppercase;color:var(--black)}
.ask-page .hdr-sub{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--dim);font-weight:500}
.ask-page .hero{padding:80px 48px 60px;max-width:1400px;margin:0 auto}
.ask-page .hero-lbl{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--dim);margin-bottom:20px;font-weight:800}
.ask-page .hero h1{font-size:clamp(28px,3.5vw,48px);font-weight:800;line-height:1.1;color:var(--black);margin-bottom:20px;max-width:700px}
.ask-page .hero p{font-size:16px;color:var(--muted);max-width:560px;line-height:1.8;margin-bottom:36px}
.ask-page .hero-meta{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1px;background:var(--border);border:1px solid var(--border);max-width:900px}
.ask-page .hero-meta-item{background:var(--surface);padding:20px 18px}
.ask-page .hm-lbl{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--dim);margin-bottom:6px;font-weight:800}
.ask-page .hm-val{font-size:18px;font-weight:800;color:var(--black)}
.ask-page .hm-val.r{color:var(--red)}
.ask-page .tabs-wrap{position:sticky;top:56px;z-index:90;background:rgba(253,251,238,.95);backdrop-filter:blur(20px);border-bottom:1px solid var(--border)}
.ask-page .tabs{max-width:1400px;margin:0 auto;padding:0 48px;display:flex;overflow-x:auto;scrollbar-width:none}
.ask-page .tabs::-webkit-scrollbar{display:none}
.ask-page .tab{padding:18px 28px;font-size:14px;font-weight:800;letter-spacing:.5px;color:var(--dim);cursor:pointer;border-bottom:2px solid transparent;transition:all .25s;white-space:nowrap;flex-shrink:0}
.ask-page .tab:hover{color:var(--muted)}
.ask-page .tab.on{color:var(--red);border-bottom-color:var(--red)}
.ask-page .stabs-wrap{position:sticky;top:112px;z-index:80;background:rgba(247,245,232,.97);backdrop-filter:blur(16px);border-bottom:1px solid var(--border)}
.ask-page .stabs{max-width:1400px;margin:0 auto;padding:0 48px;display:flex;overflow-x:auto;scrollbar-width:none}
.ask-page .stabs::-webkit-scrollbar{display:none}
.ask-page .stab{padding:12px 18px;font-size:10.5px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:var(--dim);cursor:pointer;border-bottom:1px solid transparent;transition:all .2s;white-space:nowrap;flex-shrink:0}
.ask-page .stab:hover{color:var(--muted)}
.ask-page .stab.on{color:var(--black);border-bottom-color:var(--black)}
.ask-page .content{max-width:1400px;margin:0 auto;padding:0 48px}
.ask-page .panel{animation:askFadeUp .3s ease;padding-top:48px;padding-bottom:60px}
@keyframes askFadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.ask-page .yhdr{padding:40px 0 36px;border-bottom:1px solid var(--border);margin-bottom:40px;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:end}
.ask-page .yhdr h2{font-size:clamp(22px,2.8vw,36px);font-weight:800;color:var(--black);line-height:1.15}
.ask-page .yhdr-obj{font-size:15px;color:var(--muted);line-height:1.7;border-left:2px solid var(--red);padding-left:24px}
.ask-page .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1px;background:var(--border);border:1px solid var(--border);margin-bottom:40px}
.ask-page .stat{background:var(--surface);padding:22px 18px}
.ask-page .stat-lbl{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--dim);margin-bottom:6px;font-weight:800}
.ask-page .stat-val{font-size:18px;font-weight:800;color:var(--black)}
.ask-page .stat-val.r{color:var(--red)}
.ask-page .block{margin-bottom:36px}
.ask-page .block-t{font-size:10.5px;letter-spacing:3px;text-transform:uppercase;color:var(--red);margin-bottom:16px;font-weight:800;display:flex;align-items:center;gap:12px}
.ask-page .block-t::after{content:'';flex:1;height:1px;background:var(--border)}
.ask-page .block p{color:var(--text);line-height:1.85;margin-bottom:14px;font-size:14.5px;font-weight:500}
.ask-page .mc{background:var(--surface);border:1px solid var(--border);padding:32px;margin-bottom:24px;position:relative;overflow:hidden}
.ask-page .mc::before{content:'';position:absolute;top:0;left:0;width:3px;height:100%;background:var(--red)}
.ask-page .mc.gold-acc::before{background:var(--gold)}
.ask-page .mc h4{font-size:17px;font-weight:800;color:var(--black);margin-bottom:14px;line-height:1.3}
.ask-page .mc p{color:var(--muted);line-height:1.85;font-size:14px;margin-bottom:10px;font-weight:500}
.ask-page .mc p:last-child{margin-bottom:0}
.ask-page .term-table{width:100%;border-collapse:collapse;margin-bottom:0}
.ask-page .term-table tr{border-bottom:.5px solid var(--border)}
.ask-page .term-table tr:last-child{border-bottom:none}
.ask-page .term-table td{padding:10px 0;font-size:13px;font-weight:500;vertical-align:top}
.ask-page .term-table td:first-child{color:var(--dim);font-size:11px;letter-spacing:.5px;text-transform:uppercase;font-weight:800;width:150px;padding-right:16px}
.ask-page .term-table td:last-child{color:var(--black);font-weight:800}
.ask-page .term-table td .sub{font-size:11px;color:var(--dim);font-weight:500;margin-top:2px}
.ask-page .trigger-box{background:#fff;border:1px solid var(--border);padding:28px;margin:20px 0}
.ask-page .tri{display:flex;gap:16px;margin-bottom:14px;align-items:flex-start}
.ask-page .tri:last-child{margin-bottom:0}
.ask-page .tri-n{width:22px;height:22px;border-radius:50%;background:var(--black);color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.ask-page .tri-t{font-size:13px;color:var(--muted);line-height:1.7;font-weight:500}
.ask-page .tri-t strong{color:var(--black);font-weight:800}
.ask-page .scen-split{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);border:1px solid var(--border);margin-bottom:36px}
.ask-page .scen-col{background:var(--surface);padding:32px;position:relative;overflow:hidden}
.ask-page .scen-col.gold-bg{background:var(--bg)}
.ask-page .scen-col::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--dim)}
.ask-page .scen-col.gold-bg::before{background:var(--gold)}
.ask-page .scen-tag{font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:800;margin-bottom:14px;display:inline-block;padding:3px 10px;border:1px solid currentColor;color:var(--dim)}
.ask-page .scen-col.gold-bg .scen-tag{color:var(--gold-dark)}
.ask-page .scen-col h3{font-size:20px;font-weight:800;color:var(--black);margin-bottom:6px}
.ask-page .scen-col .desc{font-size:13px;color:var(--muted);margin-bottom:24px;line-height:1.6;font-weight:500}
.ask-page .kpis{display:grid;grid-template-columns:repeat(auto-fill,minmax(165px,1fr));gap:12px;margin-bottom:36px}
.ask-page .kpi{border:1px solid var(--border);padding:18px;background:var(--surface)}
.ask-page .kpi-l{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--dim);margin-bottom:6px;font-weight:800}
.ask-page .kpi-v{font-size:15px;font-weight:800;color:var(--black)}
.ask-page .kpi-v.r{color:var(--red)}
.ask-page .chart-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);margin-bottom:36px}
.ask-page .chart-cell{background:var(--surface);padding:28px;display:flex;flex-direction:column;align-items:center;gap:16px}
.ask-page .chart-title{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--dim);font-weight:800;text-align:center;margin-bottom:4px}
.ask-page .chart-wrap{width:160px;height:160px;position:relative}
.ask-page .chart-note{font-size:11px;color:var(--dim);font-weight:500;font-style:italic;text-align:center;line-height:1.5;max-width:200px}
.ask-page .legend{display:flex;flex-direction:column;gap:6px;width:100%}
.ask-page .legend-item{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--text);font-weight:500}
.ask-page .legend-dot{width:8px;height:8px;border-radius:2px;flex-shrink:0}
.ask-page .legend-pct{margin-left:auto;font-weight:800;color:var(--black);font-size:11px}
.ask-page .ret-table{width:100%;border-collapse:collapse;margin-bottom:36px;font-size:13.5px}
.ask-page .ret-table th{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--dim);font-weight:800;padding:12px 16px;text-align:left;border-bottom:1px solid var(--border);background:var(--surface)}
.ask-page .ret-table td{padding:13px 16px;border-bottom:1px solid var(--border);color:var(--text);font-weight:500}
.ask-page .ret-table tr:last-child td{border-bottom:none;background:var(--surface)}
.ask-page .ret-table td:first-child{font-weight:800;color:var(--black)}
.ask-page .ret-table td.r{font-weight:800;color:var(--red)}
.ask-page .tranche-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);margin-bottom:36px}
.ask-page .t-card{background:var(--surface);padding:28px;position:relative}
.ask-page .t-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px}
.ask-page .t-card.t1::before{background:var(--black)}
.ask-page .t-card.t2::before{background:var(--gold)}
.ask-page .t-card.t3::before{background:var(--red)}
.ask-page .t-tag{font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:800;color:var(--dim);margin-bottom:12px}
.ask-page .t-amt{font-size:28px;font-weight:800;color:var(--black);margin-bottom:4px}
.ask-page .t-when{font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:800;color:var(--muted);margin-bottom:4px}
.ask-page .t-note{font-size:12px;color:var(--dim);font-weight:500;line-height:1.5;margin-bottom:16px}
.ask-page .t-items{list-style:none}
.ask-page .t-item{display:flex;justify-content:space-between;padding:6px 0;border-bottom:.5px solid var(--border);font-size:12px;color:var(--muted);font-weight:500;gap:8px}
.ask-page .t-item:last-child{border-bottom:none}
.ask-page .t-item-v{font-weight:800;color:var(--black);flex-shrink:0}
.ask-page .benefit-split{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);border:1px solid var(--border);margin-bottom:36px}
.ask-page .b-col{background:var(--surface);padding:28px}
.ask-page .b-col.gold-bg{background:var(--bg)}
.ask-page .b-col h4{font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:800;margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid var(--border);color:var(--black)}
.ask-page .b-col.gold-bg h4{color:var(--gold-dark)}
.ask-page .b-item{display:flex;gap:10px;margin-bottom:10px;font-size:13px;color:var(--muted);line-height:1.6;font-weight:500}
.ask-page .b-item strong{color:var(--black);font-weight:800}
.ask-page .b-dot{width:4px;height:4px;border-radius:50%;flex-shrink:0;margin-top:8px;background:var(--red)}
.ask-page .b-col.gold-bg .b-dot{background:var(--gold)}
.ask-page .closing-note{margin-top:36px;padding:36px;background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--gold)}
.ask-page .closing-note p{font-size:15px;color:var(--text);line-height:1.8;font-weight:500;font-style:italic}
.ask-page .closing-note .attr{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--dim);font-weight:800;margin-top:12px}
.ask-page footer{padding:48px;text-align:center;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--dim);font-weight:800;opacity:.5}
@media(max-width:900px){
  .ask-page .hdr-inner,.ask-page .tabs,.ask-page .stabs,.ask-page .content,.ask-page .hero{padding-left:20px;padding-right:20px}
  .ask-page .hero{padding-top:52px;padding-bottom:40px}
  .ask-page .yhdr,.ask-page .scen-split,.ask-page .benefit-split,.ask-page .chart-grid,.ask-page .tranche-grid{grid-template-columns:1fr}
  .ask-page .stabs-wrap{top:104px}
}
`;
