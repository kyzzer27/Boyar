"use client";

import React, { useState, useCallback } from 'react';
import { landscapeData, boyarData, competitorsData, moatsData, risksData } from '@/lib/competitive-data';

const TABS = [
  { id: 'landscape', label: 'The Market', data: landscapeData },
  { id: 'boyar', label: 'Where Boyar Sits', data: boyarData },
  { id: 'competitors', label: 'Direct Competitors', data: competitorsData },
  { id: 'moats', label: 'Seven Moats', data: moatsData },
  { id: 'risks', label: 'Risks & Mitigants', data: risksData },
];

export default function CompetitiveLandscape() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubtab, setActiveSubtab] = useState(0);

  const currentData = TABS[activeTab].data;

  const handleTabClick = useCallback((idx: number) => {
    setActiveTab(idx);
    setActiveSubtab(0);
  }, []);

  return (
    <div className="cl-root">
      {/* HEADER */}
      <div className="cl-hdr">
        <div className="cl-hdr-inner">
          <div className="cl-logo">BOYAR <span className="cl-red">PARTNERS</span></div>
          <div className="cl-hdr-sub">Strategic Trajectory — Part III</div>
        </div>
      </div>

      {/* HERO */}
      <div className="cl-hero">
        <div className="cl-hero-lbl">Part III — Investor Document</div>
        <h1>The Competitive Landscape<br/><span className="cl-red">&amp; How Boyar Will Be Different</span></h1>
        <p>Three tiers. Five direct competitors. Seven compounding moats. Six risks with mitigants. A positioning that becomes more defensible over time as expertise compounds, the network deepens, and the referral engine reaches self-sustaining velocity.</p>
      </div>

      {/* MAIN TABS */}
      <div className="cl-tabs-wrap">
        <div className="cl-tabs">
          {TABS.map((tab, i) => (
            <div
              key={tab.id}
              className={`cl-tab${i === activeTab ? ' cl-on' : ''}`}
              onClick={() => handleTabClick(i)}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>

      {/* SUBTABS */}
      <div className="cl-stabs-wrap">
        <div className="cl-stabs">
          {currentData.subtabs.map((label: string, i: number) => (
            <div
              key={`${activeTab}-${i}`}
              className={`cl-stab${i === activeSubtab ? ' cl-on' : ''}`}
              onClick={() => setActiveSubtab(i)}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="cl-content">
        <div
          className="cl-panel cl-on"
          style={{ paddingTop: 48, paddingBottom: 60 }}
          dangerouslySetInnerHTML={{ __html: currentData.panels[activeSubtab] }}
        />
      </div>

      {/* FOOTER */}
      <footer className="cl-footer">
        <p>Boyar Partners — Confidential Investor Document — 2025</p>
      </footer>

      <style jsx>{`
        .cl-root {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          line-height: 1.7;
          color: #1a1a1a;
          -webkit-font-smoothing: antialiased;
          font-weight: 500;
        }
        .cl-root *, .cl-root *::before, .cl-root *::after { box-sizing: border-box; }
      `}</style>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');

        .cl-red { color: #FF0000; }

        /* HEADER */
        .cl-hdr { position: sticky; top: 0; z-index: 100; background: rgba(253,251,238,.93); backdrop-filter: blur(20px); border-bottom: 1px solid #E0DDD0; }
        .cl-hdr-inner { max-width: 1400px; margin: 0 auto; padding: 0 48px; display: flex; align-items: center; justify-content: space-between; height: 56px; }
        .cl-logo { font-weight: 800; font-size: 13px; letter-spacing: 4px; text-transform: uppercase; color: #000; }
        .cl-hdr-sub { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #7a7a7a; font-weight: 500; }

        /* HERO */
        .cl-hero { padding: 80px 48px 60px; max-width: 1400px; margin: 0 auto; }
        .cl-hero-lbl { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #7a7a7a; margin-bottom: 20px; font-weight: 800; }
        .cl-hero h1 { font-size: clamp(28px,3.5vw,48px); font-weight: 800; line-height: 1.1; color: #000; margin-bottom: 20px; max-width: 700px; }
        .cl-hero p { font-size: 16px; color: #4a4a4a; max-width: 560px; line-height: 1.8; }

        /* TABS */
        .cl-tabs-wrap { position: sticky; top: 56px; z-index: 90; background: rgba(253,251,238,.95); backdrop-filter: blur(20px); border-bottom: 1px solid #E0DDD0; }
        .cl-tabs { max-width: 1400px; margin: 0 auto; padding: 0 48px; display: flex; overflow-x: auto; scrollbar-width: none; }
        .cl-tabs::-webkit-scrollbar { display: none; }
        .cl-tab { padding: 18px 28px; font-size: 14px; font-weight: 800; letter-spacing: .5px; color: #7a7a7a; cursor: pointer; border-bottom: 2px solid transparent; transition: all .25s; white-space: nowrap; flex-shrink: 0; }
        .cl-tab:hover { color: #4a4a4a; }
        .cl-tab.cl-on { color: #FF0000; border-bottom-color: #FF0000; }

        /* SUBTABS */
        .cl-stabs-wrap { position: sticky; top: 112px; z-index: 80; background: rgba(247,245,232,.97); backdrop-filter: blur(16px); border-bottom: 1px solid #E0DDD0; }
        .cl-stabs { max-width: 1400px; margin: 0 auto; padding: 0 48px; display: flex; overflow-x: auto; scrollbar-width: none; }
        .cl-stabs::-webkit-scrollbar { display: none; }
        .cl-stab { padding: 12px 18px; font-size: 10.5px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #7a7a7a; cursor: pointer; border-bottom: 1px solid transparent; transition: all .2s; white-space: nowrap; flex-shrink: 0; }
        .cl-stab:hover { color: #4a4a4a; }
        .cl-stab.cl-on { color: #000; border-bottom-color: #000; }

        /* CONTENT */
        .cl-content { max-width: 1400px; margin: 0 auto; padding: 0 48px; }
        .cl-panel { animation: cl-fadeUp .3s ease; }
        @keyframes cl-fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

        /* YEAR HEADER */
        .cl-yhdr { padding: 48px 0 40px; border-bottom: 1px solid #E0DDD0; margin-bottom: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: end; }
        .cl-yhdr h2 { font-size: clamp(22px,2.8vw,36px); font-weight: 800; color: #000; line-height: 1.15; }
        .cl-yhdr-obj { font-size: 15px; color: #4a4a4a; line-height: 1.7; border-left: 2px solid #FF0000; padding-left: 24px; }

        /* STAT ROW */
        .cl-stats { display: grid; grid-template-columns: repeat(auto-fit,minmax(160px,1fr)); gap: 1px; background: #E0DDD0; border: 1px solid #E0DDD0; margin-bottom: 40px; }
        .cl-stat { background: #F7F5E8; padding: 22px 18px; }
        .cl-stat-lbl { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #7a7a7a; margin-bottom: 6px; font-weight: 800; }
        .cl-stat-val { font-size: 18px; font-weight: 800; color: #000; }
        .cl-stat-val.cl-r, .cl-r { color: #FF0000; }

        /* BLOCK */
        .cl-block { margin-bottom: 36px; }
        .cl-block-t { font-size: 10.5px; letter-spacing: 3px; text-transform: uppercase; color: #FF0000; margin-bottom: 16px; font-weight: 800; display: flex; align-items: center; gap: 12px; }
        .cl-block-t::after { content: ''; flex: 1; height: 1px; background: #E0DDD0; }
        .cl-block p { color: #1a1a1a; line-height: 1.85; margin-bottom: 14px; font-size: 14.5px; font-weight: 500; }

        /* MOAT CARD */
        .cl-mc { background: #F7F5E8; border: 1px solid #E0DDD0; padding: 32px; margin-bottom: 24px; position: relative; overflow: hidden; }
        .cl-mc::before { content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: #FF0000; }
        .cl-mc h4 { font-size: 17px; font-weight: 800; color: #000; margin-bottom: 14px; line-height: 1.3; }
        .cl-mc p { color: #4a4a4a; line-height: 1.85; font-size: 14px; margin-bottom: 10px; font-weight: 500; }

        /* KPI GRID */
        .cl-kpis { display: grid; grid-template-columns: repeat(auto-fill,minmax(165px,1fr)); gap: 12px; margin-bottom: 36px; }
        .cl-kpi { border: 1px solid #E0DDD0; padding: 18px; background: #F7F5E8; }
        .cl-kpi-l { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #7a7a7a; margin-bottom: 6px; font-weight: 800; }
        .cl-kpi-v { font-size: 15px; font-weight: 800; color: #000; }
        .cl-kpi-v.cl-r { color: #FF0000; }

        /* CLOSING */
        .cl-closing { padding: 36px 0 60px; border-top: 1px solid #E0DDD0; margin-top: 36px; }
        .cl-closing h3 { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #7a7a7a; margin-bottom: 14px; font-weight: 800; }
        .cl-closing p { font-size: 16px; color: #1a1a1a; line-height: 1.8; max-width: 700px; font-weight: 500; }

        /* SEVERITY */
        .cl-sev-h { color: #FF0000; }
        .cl-sev-m { color: #f59e0b; }
        .cl-sev-l { color: #16a34a; }

        /* FOOTER */
        .cl-footer { padding: 48px; text-align: center; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #7a7a7a; font-weight: 800; opacity: .5; }

        @media(max-width:900px){
          .cl-hdr-inner, .cl-tabs, .cl-stabs, .cl-content, .cl-hero { padding-left: 20px; padding-right: 20px; }
          .cl-hero { padding-top: 52px; padding-bottom: 48px; }
          .cl-yhdr { grid-template-columns: 1fr; gap: 20px; }
          .cl-stabs-wrap { top: 104px; }
        }
      `}</style>
    </div>
  );
}
