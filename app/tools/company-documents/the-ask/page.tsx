"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import { DATA } from "./data";
import { ASK_STYLES } from "./styles";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/protected-route";

const CHARCOAL = '#2A2A2A';
const MID_GOLD = '#C9A84C';
const DARK_GOLD = '#8B6914';
const ASH = '#A0A0A0';

export default function TheAskPage() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("ask");
  const [currentSubIdx, setCurrentSubIdx] = useState(0);
  const [isRestricted, setIsRestricted] = useState<boolean | null>(null);

  useEffect(() => {
    const restricted = sessionStorage.getItem("restrictAsk") === "true";
    setIsRestricted(restricted);
  }, []);

  // Re-build charts after the HTML panel renders
  useEffect(() => {
    if (typeof window === "undefined" || !(window as any).Chart) return;
    
    // We only have charts on the 'ownership' tab
    if (currentTab !== "ownership") return;

    const charts: any = (window as any)._askCharts || {};

    const buildPie = (id: string, data: any[]) => {
      if (charts[id]) {
        charts[id].destroy();
      }
      const el = document.getElementById(id) as HTMLCanvasElement;
      if (!el) return;
      charts[id] = new (window as any).Chart(el.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: data.map(d => d.n),
          datasets: [{
            data: data.map(d => d.v),
            backgroundColor: data.map(d => d.c),
            borderColor: '#FDFBEE',
            borderWidth: 3,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '60%',
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx: any) => ` ${ctx.label}: ${ctx.parsed}%` } }
          }
        }
      });
    };

    // Use setTimeout to ensure the DOM has updated from dangerouslySetInnerHTML
    const timer = setTimeout(() => {
      if (document.getElementById('c1')) buildPie('c1', [{ n: 'Founder', v: 80, c: CHARCOAL }, { n: 'Investor', v: 20, c: MID_GOLD }]);
      if (document.getElementById('c2')) buildPie('c2', [{ n: 'Founder', v: 55.7, c: CHARCOAL }, { n: 'Investor R1', v: 13.9, c: MID_GOLD }, { n: 'Investor Follow-on', v: 5.7, c: DARK_GOLD }, { n: 'Round 2 3rd parties', v: 24.7, c: ASH }]);
      if (document.getElementById('c3')) buildPie('c3', [{ n: 'Founder', v: 64.2, c: CHARCOAL }, { n: 'Investor', v: 15.7, c: MID_GOLD }, { n: 'Round 2 3rd parties', v: 20.1, c: ASH }]);
    }, 50);

    (window as any)._askCharts = charts;
    
    return () => clearTimeout(timer);
  }, [currentTab, currentSubIdx]);

  const tabs = [
    { id: "ask", label: "The Ask" },
    { id: "tranches", label: "Capital Deployment" },
    { id: "scenarios", label: "Participation" },
    { id: "ownership", label: "Ownership" },
    { id: "returns", label: "Returns" }
  ];

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    setCurrentSubIdx(0);
  };

  const handleSubtabClick = (idx: number) => {
    setCurrentSubIdx(idx);
  };

  const currentData = DATA[currentTab];
  const currentPanelHtml = currentData ? currentData.panels[currentSubIdx] : "";

  if (isRestricted === null) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (isRestricted) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
          <div className="max-w-md w-full bg-black/85 border border-white/10 rounded-xl p-6">
            <h2
              className="text-lg font-semibold mb-2"
              style={{ fontFamily: "var(--font-benzin)" }}
            >
              Access Restricted
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Your account does not have permission to view this document.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => router.back()}
                className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-semibold hover:bg-white/20"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Head>
        <title>Boyar Partners — The Ask</title>
      </Head>
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js" 
        strategy="lazyOnload"
        onLoad={() => {
          // Force a re-render of current state to build charts if needed
          setCurrentSubIdx(prev => prev);
        }}
      />
      <style>{ASK_STYLES}</style>
      
      <div className="ask-page">
        <div className="hdr">
          <div className="hdr-inner">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="text-xs uppercase font-bold tracking-widest text-[#7a7a7a] hover:text-[#1a1a1a] transition"
              >
                ← Back
              </button>
              <div className="logo">BOYAR <span className="red">PARTNERS</span></div>
            </div>
            <div className="hdr-sub hidden sm:block">Pre-Seed — Investor Document</div>
          </div>
        </div>

        <div className="hero">
          <div className="hero-lbl">The Ask — Confidential</div>
          <h1>₹1.30 Crore.<br/><span className="red">20% Equity. Three Tranches.</span></h1>
          <p>A bottom-up capital deployment plan built on verified expenditure data — with the costs that most advisory firms omit from their pitch and cannot afford to ignore in practice.</p>
          <div className="hero-meta">
            <div className="hero-meta-item"><div className="hm-lbl">Total Raise</div><div className="hm-val">₹1.30 Crore</div></div>
            <div className="hero-meta-item"><div className="hm-lbl">Equity Offered</div><div className="hm-val">20% <span style={{fontSize:'12px',color:'#2a2a2a',fontWeight:500}}>(Slightly negotiable)</span></div></div>
            <div className="hero-meta-item"><div className="hm-lbl">Pre-Money</div><div className="hm-val">₹5.11 Cr</div></div>
            <div className="hero-meta-item"><div className="hm-lbl">Post-Money</div><div className="hm-val r">₹6.39 Cr</div></div>
            <div className="hero-meta-item"><div className="hm-lbl">Y1 Revenue Target</div><div className="hm-val">₹1.03 Cr</div></div>
            <div className="hero-meta-item"><div className="hm-lbl">Y2 Revenue Target</div><div className="hm-val r">₹1.98 Cr</div></div>
          </div>
        </div>

        {/* MAIN TABS */}
        <div className="tabs-wrap z-10 hidden sm:block">
          <div className="tabs">
            {tabs.map((tab) => (
              <div 
                key={tab.id}
                className={`tab ${currentTab === tab.id ? 'on' : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </div>
        
        {/* MOBILE TABS */}
        <div className="sm:hidden px-5 py-4 border-b border-[#E0DDD0] sticky top-[56px] z-10 bg-[#FDFBEE]">
           <select 
             className="w-full bg-[#F7F5E8] border border-[#E0DDD0] rounded-none p-3 font-bold text-sm text-[#1a1a1a] uppercase tracking-wider focus:outline-none"
             value={currentTab}
             onChange={(e) => handleTabClick(e.target.value)}
           >
             {tabs.map((tab) => (
               <option key={tab.id} value={tab.id}>{tab.label}</option>
             ))}
           </select>
        </div>

        {/* SUBTABS */}
        <div className="stabs-wrap z-[5]">
          <div className="stabs">
            {currentData.subtabs.map((stabName: string, i: number) => (
              <div 
                key={i}
                className={`stab ${currentSubIdx === i ? 'on' : ''}`}
                onClick={() => handleSubtabClick(i)}
              >
                {stabName}
              </div>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">
          <div 
             className="panel on" 
             dangerouslySetInnerHTML={{ __html: currentPanelHtml }}
          />
        </div>

        <footer>
          <p>Boyar Partners — Confidential Pre-Seed Investor Document — 2025 — Not for Distribution</p>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
