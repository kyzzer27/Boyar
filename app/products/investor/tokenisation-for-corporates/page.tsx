"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useRouter } from "next/navigation";

export default function TokenisationForCorporatesPage() {
	const router = useRouter();

	return (
		<ProtectedRoute>
			<div className="tokenisation-page">
				<style dangerouslySetInnerHTML={{ __html: `
          .tokenisation-page *, .tokenisation-page *::before, .tokenisation-page *::after { box-sizing: border-box; margin: 0; padding: 0 }
          
          .tokenisation-page {
            --body: 'DM Sans', sans-serif; --mono: 'DM Mono', monospace;
            --s900: #0f172a; --s700: #334155; --s600: #475569; --s500: #64748b;
            --s400: #94a3b8; --s300: #cbd5e1; --s200: #e2e8f0; --s100: #f1f5f9; --s50: #f8fafc;
            --b600: #2563eb; --b100: #dbeafe; --b50: #eff6ff; --white: #fff;
            
            font-family: var(--body); font-size: 15px; line-height: 1.65; color: var(--s900); background: var(--white);
            scroll-behavior: smooth;
          }
          
          .tokenisation-page header { position: sticky; top: 0; z-index: 40; background: rgba(255,255,255,.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--s200) }
          .tokenisation-page .hdr { max-width: 1200px; margin: 0 auto; padding: 16px 32px; display: flex; align-items: center; justify-content: space-between }
          .tokenisation-page .back { font-size: 13px; font-weight: 500; color: var(--s600); background: none; border: none; cursor: pointer; font-family: var(--body) }
          .tokenisation-page .back:hover { color: var(--s900) }
          .tokenisation-page .hdr-tag { font-size: 10px; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; color: var(--s400) }
          .tokenisation-page .hero { max-width: 1200px; margin: 0 auto; padding: 80px 32px 68px; border-bottom: 1px solid var(--s200) }
          .tokenisation-page .eyebrow { font-size: 11px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: var(--b600); margin-bottom: 20px }
          .tokenisation-page .hero-h1 { font-size: clamp(32px,4.4vw,54px); font-weight: 700; line-height: 1.07; color: var(--s900); max-width: 760px; margin-bottom: 24px; letter-spacing: -.015em }
          .tokenisation-page .hero-lead { font-size: 15.5px; color: var(--s600); max-width: 640px; line-height: 1.82; margin-bottom: 48px }
          .tokenisation-page .stats { display: grid; grid-template-columns: repeat(4,1fr); border: 1px solid var(--s200); border-radius: 10px; overflow: hidden; max-width: 840px }
          .tokenisation-page .stat { padding: 18px 20px; border-right: 1px solid var(--s200) }
          .tokenisation-page .stat:last-child { border-right: none }
          .tokenisation-page .slbl { font-size: 10px; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; color: var(--s500); margin-bottom: 7px }
          .tokenisation-page .sval { font-family: var(--mono); font-size: 20px; font-weight: 500; color: var(--s900); line-height: 1 }
          .tokenisation-page .ssrc { font-size: 10px; color: var(--s400); margin-top: 4px }
          .tokenisation-page .sec { border-bottom: 1px solid var(--s200) }
          .tokenisation-page .si { max-width: 1200px; margin: 0 auto; padding: 68px 32px }
          .tokenisation-page .sa { background: var(--s50) }
          .tokenisation-page .slb { font-size: 10px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: var(--b600); margin-bottom: 10px }
          .tokenisation-page .sh2 { font-size: clamp(21px,2.4vw,28px); font-weight: 700; color: var(--s900); margin-bottom: 13px; letter-spacing: -.01em }
          .tokenisation-page .slead { font-size: 14px; color: var(--s600); max-width: 700px; line-height: 1.82; margin-bottom: 40px }
          
          .tokenisation-page .tg { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--s200); border: 1px solid var(--s200); border-radius: 10px; overflow: hidden }
          .tokenisation-page .tc { background: var(--white); padding: 24px }
          .tokenisation-page .tclbl { font-size: 10px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--s500); margin-bottom: 9px }
          .tokenisation-page .tct { font-size: 13px; font-weight: 700; color: var(--s900); margin-bottom: 9px; line-height: 1.4 }
          .tokenisation-page .tcb { font-size: 12.5px; color: var(--s600); line-height: 1.72 }
          .tokenisation-page .tcs { margin-top: 11px; font-size: 10px; color: var(--s400); font-family: var(--mono) }
          .tokenisation-page .flow { display: flex; border: 1px solid var(--s200); border-radius: 10px; overflow: hidden; margin: 26px 0 18px }
          .tokenisation-page .fp { flex: 1; padding: 17px 15px; background: var(--white); border-right: 1px solid var(--s200) }
          .tokenisation-page .fp:last-child { border-right: none }
          .tokenisation-page .fp.on { background: var(--s900) }
          .tokenisation-page .fpt { font-size: 11.5px; font-weight: 700; color: var(--s900); margin-bottom: 3px }
          .tokenisation-page .fp.on .fpt { color: var(--white) }
          .tokenisation-page .fps { font-size: 10.5px; color: var(--s500); line-height: 1.4 }
          .tokenisation-page .fp.on .fps { color: rgba(255,255,255,.48) }
          .tokenisation-page .svcs { border: 1px solid var(--s200); border-radius: 10px; overflow: hidden }
          .tokenisation-page .svc { background: var(--white); padding: 24px 24px 24px 20px; display: flex; gap: 18px; align-items: flex-start; border-bottom: 1px solid var(--s200); transition: background .12s }
          .tokenisation-page .svc:last-child { border-bottom: none }
          .tokenisation-page .svc:hover { background: var(--s50) }
          .tokenisation-page .svcn { flex-shrink: 0; width: 32px; height: 32px; background: var(--s900); border-radius: 7px; display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 11px; font-weight: 500; color: var(--white); margin-top: 2px }
          .tokenisation-page .svcb { flex: 1; min-width: 0 }
          .tokenisation-page .svct { font-size: 14px; font-weight: 700; color: var(--s900); margin-bottom: 4px }
          .tokenisation-page .svcs2 { font-size: 11.5px; color: var(--b600); font-weight: 600; margin-bottom: 8px }
          .tokenisation-page .svcs2 span { color: var(--s500); font-weight: 400 }
          .tokenisation-page .svcd { font-size: 13px; color: var(--s700); line-height: 1.72 }
          .tokenisation-page .svcd strong { color: var(--s900) }
          .tokenisation-page .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--s200); border: 1px solid var(--s200); border-radius: 10px; overflow: hidden }
          .tokenisation-page .g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--s200); border: 1px solid var(--s200); border-radius: 10px; overflow: hidden }
          .tokenisation-page .gc { background: var(--white); padding: 22px }
          .tokenisation-page .gct { font-size: 13px; font-weight: 700; color: var(--s900); margin-bottom: 13px }
          .tokenisation-page .dl { list-style: none; display: flex; flex-direction: column; gap: 9px }
          .tokenisation-page .dl li { font-size: 13px; color: var(--s700); line-height: 1.62; display: flex; gap: 9px; align-items: flex-start }
          .tokenisation-page .dl li::before { content: ""; flex-shrink: 0; width: 4px; height: 4px; border-radius: 50%; background: var(--s300); margin-top: 8px }
          .tokenisation-page .note { padding: 18px 20px; border-radius: 9px; font-size: 13px; line-height: 1.72 }
          .tokenisation-page .nb { background: var(--b50); border: 1px solid var(--b100); color: var(--s700) }
          .tokenisation-page .nb strong { color: var(--s900) }
          .tokenisation-page .ns { background: var(--s50); border: 1px solid var(--s200); color: var(--s700) }
          .tokenisation-page .ns strong { color: var(--s900) }
          .tokenisation-page .na { background: #fffbeb; border: 1px solid #fde68a; color: #78350f }
          .tokenisation-page .na strong { color: #451a03 }
          .tokenisation-page .tbl { overflow-x: auto; border: 1px solid var(--s200); border-radius: 10px }
          .tokenisation-page table { width: 100%; border-collapse: collapse; font-size: 13px }
          .tokenisation-page thead tr { background: var(--s50); border-bottom: 1px solid var(--s200) }
          .tokenisation-page th { padding: 12px 15px; text-align: left; font-weight: 700; color: var(--s900); font-size: 11px; letter-spacing: .03em }
          .tokenisation-page td { padding: 12px 15px; color: var(--s700); border-bottom: 1px solid var(--s100); line-height: 1.55; vertical-align: top }
          .tokenisation-page tr:last-child td { border-bottom: none }
          .tokenisation-page tr:hover td { background: var(--s50) }
          .tokenisation-page .bd { display: inline-block; padding: 2px 8px; border-radius: 5px; font-size: 11px; font-weight: 600 }
          .tokenisation-page .bb { background: var(--b50); color: #1e40af }
          .tokenisation-page .bg { background: #f0fdf4; color: #166534 }
          .tokenisation-page .ba { background: #fffbeb; color: #92400e }
          .tokenisation-page .scope { display: grid; grid-template-columns: 1fr 1fr; gap: 16px }
          .tokenisation-page .sc { padding: 22px; border-radius: 10px }
          .tokenisation-page .scin { background: #f0fdf4; border: 1px solid #bbf7d0 }
          .tokenisation-page .scout { background: var(--s50); border: 1px solid var(--s200) }
          .tokenisation-page .sclbl { font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; margin-bottom: 13px }
          .tokenisation-page .scin .sclbl { color: #166534 }
          .tokenisation-page .scout .sclbl { color: var(--s500) }
          .tokenisation-page .scl { list-style: none; display: flex; flex-direction: column; gap: 9px }
          .tokenisation-page .scl li { font-size: 13px; line-height: 1.55; display: flex; gap: 8px }
          .tokenisation-page .scin .scl li { color: #14532d }
          .tokenisation-page .scout .scl li { color: var(--s600) }
          .tokenisation-page .chips { display: flex; flex-wrap: wrap; gap: 8px }
          .tokenisation-page .chip { background: var(--white); border: 1px solid var(--s200); border-radius: 7px; padding: 5px 12px; font-size: 12px; font-weight: 500; color: var(--s700) }
          .tokenisation-page .clbl { font-size: 10px; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; color: var(--s500); margin-bottom: 10px }
          .tokenisation-page .cta { background: var(--s900); border-radius: 12px; padding: 48px 40px; text-align: center }
          .tokenisation-page .cta p { font-size: clamp(14px,1.6vw,17px); color: rgba(255,255,255,.68); line-height: 1.8; max-width: 780px; margin: 0 auto }
          .tokenisation-page .cta p strong { color: var(--white) }
          
          @media(max-width:900px) {
            .tokenisation-page .tg, .tokenisation-page .g3 { grid-template-columns: 1fr 1fr }
            .tokenisation-page .stats { grid-template-columns: 1fr 1fr }
            .tokenisation-page .scope { grid-template-columns: 1fr }
          }
          
          @media(max-width:620px) {
            .tokenisation-page .tg, .tokenisation-page .g2, .tokenisation-page .g3, .tokenisation-page .stats { grid-template-columns: 1fr }
            .tokenisation-page .hdr, .tokenisation-page .hero, .tokenisation-page .si { padding-left: 20px; padding-right: 20px }
            .tokenisation-page .hero { padding-top: 48px; padding-bottom: 48px }
            .tokenisation-page .si { padding-top: 48px; padding-bottom: 48px }
            .tokenisation-page .cta { padding: 30px 18px }
            .tokenisation-page .flow { flex-direction: column }
            .tokenisation-page .fp { border-right: none; border-bottom: 1px solid var(--s200) }
            .tokenisation-page .fp:last-child { border-bottom: none }
          }
        ` }} />

				{/* Google Fonts loaded carefully in next/head or just standard link tags */}
				<style dangerouslySetInnerHTML={{ __html: "@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap');" }} />

				<header>
				  <div className="hdr">
				    <button className="back" onClick={() => router.back()}>&#8592; Back</button>
				    <span className="hdr-tag">Boyar Vertical</span>
				  </div>
				</header>
				 
				<div className="hero">
				  <div className="eyebrow">Tokenisation &amp; Digital Asset Structuring</div>
				  <h1 className="hero-h1">A New Infrastructure Layer Beneath Traditional Capital Markets</h1>
				  <p className="hero-lead">Tokenisation converts ownership rights in real-world assets into programmable digital tokens on a distributed ledger. It is not a new asset class &mdash; it is new settlement, issuance, and collateral infrastructure sitting beneath existing asset classes. Boyar Partners provides the legal structuring, SPV formation, and compliance architecture that makes tokenised instruments legally enforceable.</p>
				  <div className="stats">
				    <div className="stat"><div className="slbl">On-Chain RWA Market</div><div className="sval">$10B+</div><div className="ssrc">Q3 2025 &mdash; 10x since 2022</div></div>
				    <div className="stat"><div className="slbl">McKinsey 2030 Forecast</div><div className="sval">$2&ndash;4T</div><div className="ssrc">Conservative &mdash; excl. stablecoins</div></div>
				    <div className="stat"><div className="slbl">Tokenised Private Credit</div><div className="sval">$5.7B</div><div className="ssrc">Largest non-stablecoin segment</div></div>
				    <div className="stat"><div className="slbl">Institutional Exposure</div><div className="sval">86%</div><div className="ssrc">Invested or planning to &mdash; 2025</div></div>
				  </div>
				</div>
				 
				<div className="sec sa">
				  <div className="si">
				    <div className="slb">Market Thesis</div>
				    <h2 className="sh2">Three Converging Forces &mdash; Not a Single Trend</h2>
				    <p className="slead">Institutional capital is moving on-chain. Regulatory frameworks have reached operational maturity across key jurisdictions. The settlement infrastructure of traditional markets has begun adopting distributed ledger technology. Each of these is independently significant. Together they create a structuring and compliance demand environment that did not exist five years ago.</p>
				    <div className="tg">
				      <div className="tc"><div className="tclbl">Institutional Adoption</div><div className="tct">Major institutions are no longer piloting. They are operating at scale.</div><div className="tcb">BlackRock&rsquo;s BUIDL fund crossed multi-billion AUM in 2025. Goldman Sachs and BNY Mellon tokenised money-market funds. Apollo deployed tokenised private credit. Siemens issued a &euro;300M corporate bond on-chain &mdash; dual-listed on SDX and SIX Swiss Exchange with central bank digital money settlement. These are live issuances with compliance, distribution, and investor servicing built in &mdash; not proof-of-concept pilots.</div><div className="tcs">BlackRock, Goldman Sachs, Siemens AG, 2024&ndash;2025</div></div>
				      <div className="tc"><div className="tclbl">Regulatory Maturity</div><div className="tct">Regulators have issued operational guidance &mdash; not consultation papers.</div><div className="tcb">The CFTC issued December 2025 guidance permitting tokenised Treasuries and money-market funds as derivatives collateral. The DTCC received a no-action letter from the SEC to tokenise DTC-custodied US Treasury securities on the Canton Network. MiCA provides a comprehensive EU framework for digital asset service providers. Singapore MAS and Hong Kong SFC have authorised multiple token service providers under live regulatory frameworks.</div><div className="tcs">CFTC Dec 2025, DTCC Dec 2025, EU MiCA 2024&ndash;2025</div></div>
				      <div className="tc"><div className="tclbl">Settlement Infrastructure</div><div className="tct">The back-office of traditional markets is being rebuilt on distributed ledgers.</div><div className="tcb">Traditional post-trade infrastructure was built for T+1 and T+2 settlement. Atomic settlement on distributed ledgers collapses this to near-zero &mdash; simultaneously, with finality, outside business hours. Swift conducted live 2025 trials integrating tokenised assets with existing banking rails via ISO 20022 adapters. The DTCC selected the Canton Network to tokenise DTC-custodied securities &mdash; the first step in making existing custodied assets available on-chain within the existing regulatory perimeter.</div><div className="tcs">IOSCO Nov 2025, Swift 2025, DTCC Canton Dec 2025</div></div>
				      <div className="tc"><div className="tclbl">Legal Architecture</div><div className="tct">The legal wrapper is the product &mdash; not the token itself.</div><div className="tcb">In most tokenisation programmes, the token does not equal legal ownership. It is a contractual claim on an SPV or custodian. Unless statute explicitly recognises the ledger as the title register, courts treat the token as evidence of beneficial ownership &mdash; not definitive proof of title. Legal wrappers, contractual documentation, and SPV architecture are more critical to enforceability than the smart contract or blockchain selection. This is precisely what Boyar provides.</div><div class="tcs">Growth Turbine RWA Legal Analysis 2025, IOSCO 2025</div></div>
				      <div className="tc"><div className="tclbl">Private Credit Dominance</div><div className="tct">The largest tokenised asset category is also the most structuring-intensive.</div><div className="tcb">Tokenised private credit represents approximately $5.7B &mdash; 57% of the on-chain RWA market as of Q3 2025. Tokenisation allows private credit instruments to reach investor bases that previously could not access them: structured tranches at lower minimums, programmatic yield distribution, and secondary liquidity via licensed trading platforms. Each instrument requires an SPV, investor documentation, a compliance architecture, and ongoing administration &mdash; a full Boyar mandate.</div><div className="tcs">RWA.xyz, InvestaX Q3 2025 Report</div></div>
				      <div className="tc"><div className="tclbl">MENA Opportunity</div><div className="tct">The UAE is one of the most active tokenisation jurisdictions globally &mdash; and it is in Boyar&rsquo;s coverage.</div><div className="tcb">Dubai&rsquo;s Land Department projects the real estate tokenisation market at $16.3B by 2033, representing 7% of total Dubai real estate transactions. ADGM issued its Digital Securities Regime in 2023 &mdash; one of the most comprehensive statutory frameworks for tokenised securities issuance globally. VARA operates one of the most active VASP licensing regimes globally. The UAE is both where Boyar is activated and where tokenisation demand is accelerating fastest outside the US.</div><div className="tcs">Dubai Land Department, VARA 2025, ADGM Digital Securities Regime</div></div>
				    </div>
				  </div>
				</div>
				 
				<div className="sec">
				  <div className="si">
				    <div className="slb">Boyar&rsquo;s Role</div>
				    <h2 className="sh2">Where Boyar Sits in the Tokenisation Stack</h2>
				    <p className="slead">Tokenisation requires two distinct sets of expertise: technology infrastructure (blockchain, smart contracts, token standards) and legal-corporate infrastructure (SPV formation, compliance architecture, jurisdictional structuring, investor documentation). Boyar builds the legal and corporate layer beneath every compliant tokenisation &mdash; the layer without which no token is enforceable.</p>
				    <div className="flow">
				      <div className="fp"><div className="fpt">Asset Owner / Issuer</div><div className="fps">Client seeking to tokenise a real-world asset</div></div>
				      <div className="fp on"><div className="fpt">Boyar Partners</div><div className="fps">SPV formation &middot; legal wrapper &middot; compliance &middot; jurisdiction &middot; investor documents</div></div>
				      <div className="fp"><div className="fpt">Technology Platform</div><div className="fps">Blockchain &middot; smart contract &middot; token minting</div></div>
				      <div className="fp"><div className="fpt">Qualified Custodian</div><div className="fps">Holds underlying asset &middot; proof of reserve</div></div>
				      <div className="fp"><div className="fpt">Investors</div><div className="fps">Accredited or institutional token holders</div></div>
				    </div>
				    <div className="note ns" style={{ maxWidth: '800px' }}><strong>Boyar&rsquo;s competitive position in tokenisation is as a cross-border structuring advisor &mdash; not a technology firm.</strong> The value is in knowing which SPV jurisdiction is appropriate for a given asset class and investor base, which regulatory pathway avoids securities law misclassification, how to structure investor documentation that survives institutional due diligence, and how to integrate the resulting structure with existing trust, banking, and compliance frameworks. This is precisely what legacy TCSPs cannot provide and what technology platforms cannot provide.</div>
				  </div>
				</div>
				 
				<div className="sec sa">
				  <div className="si">
				    <div className="slb">Scope of Services</div>
				    <h2 className="sh2">Tokenisation &amp; Digital Asset Structuring Services</h2>
				    <p className="slead">Services span the full mandate lifecycle &mdash; from pre-tokenisation feasibility and structure design through SPV formation, regulatory compliance, investor documentation, and ongoing corporate administration of the issuing entity.</p>
				    <div className="svcs">
				      <div className="svc"><div className="svcn">01</div><div className="svcb"><div className="svct">Tokenisation Feasibility &amp; Structure Assessment</div><div className="svcs2">Pre-mandate analysis: <span>legal viability, structure selection, regulatory mapping.</span></div><div className="svcd">Assess whether the target asset is legally suitable for tokenisation &mdash; including title clarity, regulatory classification, and whether the jurisdiction recognises the ledger or requires an off-chain legal wrapper. Determine the correct legal vehicle: SPV, trust, foundation, fund, or hybrid. Identify the token type and the rights it carries &mdash; economic rights only, governance rights, or full legal title where statute permits. Map securities law classification risk across the jurisdictions where tokens will be distributed. Deliver a structuring memorandum before any capital is committed to technology infrastructure. Without this step, issuers routinely build on legally unenforceable foundations.</div></div></div>
				      <div className="svc"><div className="svcn">02</div><div className="svcb"><div className="svct">SPV Formation &amp; Legal Wrapper Architecture</div><div className="svcs2">Formation of: <span>the special purpose vehicle that holds the underlying asset and issues tokens.</span></div><div className="svcd">Form a bankruptcy-remote SPV in the appropriate jurisdiction &mdash; BVI, Cayman, Luxembourg, Singapore, ADGM, or Jersey &mdash; selected by asset type, investor base, and regulatory pathway. Draft constitutional documents, shareholder agreements, and any trust deed or foundation statute required. Establish the contractual chain between the SPV and the token &mdash; this is what courts will examine in any enforcement scenario. Structure segregated portfolios where multiple asset classes are tokenised through the same issuing entity. Provide ongoing registered agent, corporate secretary, and registered office services for the issuing vehicle throughout the token&rsquo;s life.</div></div></div>
				      <div className="svc"><div className="svcn">03</div><div className="svcb"><div className="svct">Regulatory Classification &amp; Compliance Architecture</div><div className="svcs2">Scope: <span>securities law classification, AML/KYC framework, FATCA/CRS, ongoing obligations.</span></div><div className="svcd">Classify the token under applicable securities law &mdash; the Howey test in the US, MiCA in the EU, and equivalent frameworks in MENA and APAC. Determine whether the offering requires registration or qualifies for an exemption: Regulation D, Regulation S, or EU/UK equivalent private placement frameworks. Structure investor eligibility: accredited investor only, professional investor, or retail where permitted. Build the AML/KYC framework specific to the digital asset offering. Map ongoing regulatory obligations: beneficial ownership disclosure, FATCA/CRS classification of the SPV, economic substance notifications, and annual compliance filings across each active jurisdiction.</div></div></div>
				      <div className="svc"><div className="svcn">04</div><div className="svcb"><div className="svct">Investor Documentation &amp; Private Placement Memorandum</div><div className="svcs2">Scope: <span>PPM, subscription agreements, token purchase agreements, side letters.</span></div><div className="svcd">Coordinate preparation of the Private Placement Memorandum or Information Memorandum, subscription agreements, token purchase agreements, and side letters for anchor investors. Ensure disclosure standards meet the expectations of institutional due diligence &mdash; this documentation determines whether a sophisticated investor will commit capital. Define token holder rights precisely: what economic entitlement the token represents, what information rights exist, what redemption or exit mechanisms are available, and how the off-chain legal title relates to the on-chain token representation. Institutional investors require legal certainty at this layer before any allocation decision is made.</div></div></div>
				      <div className="svc"><div className="svcn">05</div><div className="svcb"><div className="svct">Ongoing Corporate Administration of the Issuing Entity</div><div className="svcs2">Scope: <span>statutory registers, annual filings, KYC refresh, economic substance, accounting coordination.</span></div><div className="svcd">Maintain statutory registers, prepare board resolutions, manage annual filings, and maintain good standing of the issuing entity throughout the token&rsquo;s life. Coordinate ongoing KYC refresh for all beneficial owners, directors, and key counterparties. Manage economic substance notifications and filings where the SPV jurisdiction requires them. Issue compliance certificates and certificates of incumbency as required by banking counterparties and token platform operators. The issuing entity must remain in continuous good standing for the token to retain investor confidence and platform access.</div></div></div>
				      <div className="svc"><div className="svcn">06</div><div className="svcb"><div className="svct">Banking Introductions &amp; Custody Coordination</div><div className="svcs2">Scope: <span>qualified custodian introductions, SPV banking, fiat on/off ramp, legal segregation verification.</span></div><div className="svcd">Introduce the SPV to qualified custodians that can hold the underlying real-world asset while tokens circulate on-chain. Coordinate banking for the issuing entity &mdash; including fiat accounts for token subscription and redemption flows. Facilitate introductions to private banks that accept tokenised asset structures as part of broader client wealth management relationships. Ensure custody arrangements are legally segregated so the underlying asset is not exposed to the custodian&rsquo;s creditors in a failure scenario. Banking and custody access is one of the most material execution risks in tokenisation mandates &mdash; Boyar&rsquo;s existing banking relationship network is a direct differentiator.</div></div></div>
				      <div className="svc"><div className="svcn">07</div><div className="svcb"><div className="svct">VASP &amp; CASP Licensing Advisory</div><div className="svcs2">Scope: <span>secondary trading platform licensing across UAE, EU, Cayman, Singapore, BVI, Bermuda.</span></div><div className="svcd">Where the client intends to operate a platform for secondary token trading, provide VASP/CASP licensing advisory across relevant jurisdictions: VARA in UAE, MiCA in Lithuania, Malta, or Ireland, BVI VASP Act, Bermuda DABA, Cayman VASP regime, or Singapore MPI licence. Ensure the trading platform&rsquo;s compliance framework &mdash; AML monitoring, investor eligibility gating, and regulatory reporting &mdash; meets the requirements of the applicable licence. Secondary market liquidity is the primary barrier to institutional tokenisation adoption. Licensing the infrastructure that enables secondary markets directly extends the commercial lifecycle of every tokenisation mandate and links Boyar&rsquo;s existing VASP licensing capability directly into this vertical.</div></div></div>
				      <div className="svc"><div className="svcn">08</div><div className="svcb"><div className="svct">Multi-Jurisdiction Programme Management</div><div className="svcs2">Scope: <span>cross-border investor eligibility mapping, parallel SPV networks, single point of coordination.</span></div><div className="svcd">Where a client distributes tokens to investors across multiple jurisdictions simultaneously &mdash; EU, UK, UAE, Singapore, and US in parallel &mdash; coordinate the legal analysis, investor eligibility mapping, and compliance architecture across each regime. Manage the SPV network where multiple entities in different jurisdictions are required to achieve the correct regulatory treatment in each investor&rsquo;s home market. Provide a single point of contact for the entire programme. This is where Boyar&rsquo;s 53-jurisdiction coverage and Boyar Network most directly translate into tokenisation mandate value.</div></div></div>
				    </div>
				  </div>
				</div>
				 
				<div className="sec">
				  <div className="si">
				    <div className="slb">For Corporate Clients</div>
				    <h2 className="sh2">What Tokenisation Means for Corporate Balance Sheets</h2>
				    <p className="slead">For operating companies and family-owned enterprises, tokenisation is not a crypto play. It is a discrete set of corporate finance tools that change how assets can be financed, how capital can be raised, and how treasury is managed. The applications below are near-term, operational, and backed by institutional precedent.</p>
				    <div className="g2" style={{ marginBottom: '18px' }}>
				      <div className="gc"><div className="gct">On-Chain Treasury Management</div><ul className="dl"><li>Tokenised US Treasuries and money-market funds ($2.4B market, up 80% in 2025) allow corporations to earn yield on cash reserves while maintaining 24/7 redemption access &mdash; without T+1 settlement delay or banking-hours restrictions.</li><li>DBS Bank integrated tokenised MMFs as collateral in 2025. Binance adopted tokenised Treasuries in off-exchange settlement. The CFTC&rsquo;s December 2025 guidance explicitly permits tokenised Treasuries and MMFs as derivatives collateral &mdash; confirming these instruments integrate into existing financial workflows.</li><li>A corporate with $50M in short-term reserves can redeploy collateral continuously rather than waiting two business days per transaction &mdash; a material improvement in capital efficiency across active treasury management.</li><li>Boyar&rsquo;s role: structure the legal entity through which the corporate accesses tokenised treasury products, ensure FATCA/CRS classification is correctly applied to on-chain positions, and maintain compliance documentation for auditors.</li></ul></div>
				      <div className="gc"><div className="gct">On-Chain Debt Issuance</div><ul className="dl"><li>Siemens issued a &euro;300M corporate bond on-chain in 2024 &mdash; dual-listed on SDX and SIX Swiss Exchange, settled using central bank digital money. This is the institutional reference point for on-chain corporate debt.</li><li>For mid-market corporates in Boyar&rsquo;s client base, tokenised debt issuance offers access to a global investor base at lower minimum subscription sizes than traditional private placement &mdash; potentially unlocking capital from investors who would not participate in a standard private debt deal at $250K+ minimums.</li><li>Programmatic yield distribution via smart contracts eliminates manual coupon payment processes, reducing operational cost and counterparty error risk in the payment chain.</li><li>The issuing SPV is the legal foundation. Boyar forms, maintains, and administers that SPV across the bond&rsquo;s lifetime &mdash; statutory records, KYC maintenance, compliance filings, and banking coordination throughout.</li></ul></div>
				      <div className="gc"><div className="gct">Asset-Backed Financing via Tokenised SPVs</div><ul className="dl"><li>A corporate holding real estate, receivables, or equipment can tokenise those assets through an SPV and raise debt or equity against them &mdash; without selling the assets outright or routing through a traditional bank loan process.</li><li>Private credit is the largest tokenised RWA category ($5.7B) precisely because this mechanism works: asset originators tokenise loan portfolios, investors buy fractional exposure, and the underlying credit remains off-chain while distribution and settlement run on-chain.</li><li>Bergen County, New Jersey tokenised $40B in property deeds on Avalanche in 2025, cutting deed-processing time by 90%. The operational case is no longer theoretical.</li><li>For an HNWI-owned business with a real estate portfolio, this opens a financing channel &mdash; tokenised property-backed notes &mdash; that previously required institutional-scale balance sheets to access.</li></ul></div>
				      <div className="gc"><div className="gct">Equity Token Structures for Capital Events</div><ul className="dl"><li>For companies preparing for institutional capital or secondary liquidity events, a tokenised equity structure via an SPV allows a clean, auditable on-chain cap table that mirrors the legal share register.</li><li>The SPV wrapper model is the current institutional standard: investors hold an interest in the SPV&rsquo;s shares; the SPV holds the operating company equity. This approach works within existing legal systems without requiring statutory recognition of the blockchain as the title register.</li><li>Republic tokenised economic rights in pre-IPO SpaceX shares in 2024 using this structure, distributing to accredited investors globally via a regulated platform.</li><li>A founder seeking partial liquidity without a full exit, or a family business seeking minority institutional capital, can use a tokenised SPV without a traditional M&amp;A process.</li></ul></div>
				    </div>
				    <div className="note ns"><strong>The critical point for corporate clients:</strong> None of these applications require the corporation itself to interact with blockchain technology. The corporation sells or assigns an asset into an SPV &mdash; a standard corporate structuring transaction &mdash; and the SPV issues tokens. The blockchain layer is the SPV&rsquo;s operational domain, not the corporation&rsquo;s. The corporate&rsquo;s relationship with Boyar is a structuring and advisory relationship, not a technology relationship.</div>
				  </div>
				</div>
				 
				<div className="sec sa">
				  <div className="si">
				    <div className="slb">Treasury &amp; Audit Integration</div>
				    <h2 className="sh2">How Tokenisation Integrates into Treasury and Audit Functions</h2>
				    <p className="slead">The reason tokenisation is being adopted by treasury departments and audit functions has nothing to do with digital asset ideology. It has to do with three structural problems in traditional finance that tokenisation solves operationally: settlement delay, reconciliation overhead, and collateral immobility.</p>
				    <div className="note nb" style={{ maxWidth: '800px', marginBottom: '28px' }}><strong>The settlement problem:</strong> In the traditional system, a corporate Treasury buying a T-bill waits T+1 for settlement. The asset is frozen in the settlement pipeline for one business day &mdash; it cannot be redeployed, re-collateralised, or used as margin during that period. Tokenised Treasuries settle atomically on-chain &mdash; simultaneously and with finality, outside business hours. For a corporate with $50M in actively managed short-term reserves, this is not a marginal improvement. It is a continuous availability of capital that would otherwise be periodically locked in settlement overhead.</div>
				    <div className="g3" style={{ marginBottom: '18px' }}>
				      <div className="gc"><div className="gct">Audit: Continuous Proof of Reserve</div><ul className="dl"><li>Every tokenised asset can be verified on-chain 24/7. Auditors can confirm that tokens in circulation are backed 1:1 by off-chain assets held with a qualified custodian &mdash; without requesting bank confirmations or waiting for account statements.</li><li>Chainlink&rsquo;s Proof of Reserve infrastructure, already deployed in institutional programmes, provides automated, continuous attestation of collateral backing &mdash; moving audit from periodic, sampling-based methodology toward continuous verification.</li><li>For regulated entities subject to regular audit &mdash; investment funds, licensed corporates, banking counterparties &mdash; this reduces audit cost and increases the reliability of financial reporting. It is not a replacement for audit. It is an efficiency improvement that on-chain transparency directly enables.</li></ul></div>
				      <div className="gc"><div className="gct">Treasury: Collateral Mobility</div><ul className="dl"><li>In traditional markets, using a Treasury bill as collateral requires physical delivery &mdash; T+1 or T+2. The CFTC&rsquo;s December 2025 guidance explicitly permits tokenised Treasuries as derivatives collateral, recognising that instant on-chain settlement changes the risk profile of collateral delivery.</li><li>JPMorgan&rsquo;s Tokenised Collateral Network (TCN) demonstrated intraday transfer of tokenised money market fund shares as derivatives collateral in 2023 &mdash; previously impossible under T+2 settlement.</li><li>A corporate treasury managing collateral requirements across multiple trading counterparties gains a material operational advantage: assets can be moved, substituted, and pledged in real time rather than overnight batch processes.</li></ul></div>
				      <div className="gc"><div className="gct">Treasury: Programmable Cash Management</div><ul className="dl"><li>Smart contracts can be programmed to automatically sweep idle treasury balances into tokenised money-market products when they exceed a threshold, and redeem them when the balance falls below another. This is rule-based, automated cash management requiring no human intervention after initial setup.</li><li>For a corporate operating across multiple jurisdictions with multiple currency pools, programmatic cash management across tokenised instruments reduces FX conversion timing risk and manual fund movement overhead.</li><li>Boyar&rsquo;s advisory role: structure the legal entity allowing corporate access to tokenised treasury products, ensure FATCA/CRS treatment is correctly applied to on-chain positions, and maintain compliance documentation for auditors and banking counterparties.</li></ul></div>
				    </div>
				    <div className="note na"><strong>An honest boundary:</strong> Boyar does not build treasury management systems or smart contract infrastructure. Boyar structures the legal entities and compliance frameworks that allow corporate clients to access these capabilities through qualified technology platforms and custodians. The advisory value is in ensuring the underlying structure is legally sound, correctly classified for tax and regulatory purposes, and administered with the governance that institutional counterparties and auditors require.</div>
				  </div>
				</div>
				 
				<div className="sec">
				  <div className="si">
				    <div className="slb">New Capital Formation</div>
				    <h2 className="sh2">How Tokenisation Creates New Forms of Capital and Debt Markets</h2>
				    <p className="slead">Tokenisation changes the economics of capital formation in three ways: it reduces the minimum viable transaction size, removes geographic restrictions on investor access, and enables programmable economics not achievable with paper-based instruments.</p>
				    <div className="tbl" style={{ marginBottom: '24px' }}>
				      <table>
				        <thead><tr><th>Market Segment</th><th>Traditional Barrier</th><th>What Tokenisation Changes</th><th>Current Evidence</th></tr></thead>
				        <tbody>
				          <tr><td><strong>Private Credit</strong></td><td>Minimum tickets $250K&ndash;$1M. Accredited-only. Illiquid for fund life.</td><td>Fractional participation at lower minimums. Programmatic yield distribution. Secondary liquidity via licensed trading platforms.</td><td><span className="bd bb">$5.7B on-chain</span> Q3 2025 &mdash; Apollo, Maple Finance, Goldfinch</td></tr>
				          <tr><td><strong>Real Estate Debt</strong></td><td>Property-backed lending restricted to banks. Cross-border participation near-impossible.</td><td>Tokenised real estate notes distributed to accredited investors globally. SPV holds the property, tokens represent loan participation.</td><td><span className="bd bg">$16.3B forecast</span> Dubai Land Dept by 2033</td></tr>
				          <tr><td><strong>Corporate Bonds</strong></td><td>Minimum issuance $50M+. Lead arranger required. 5&ndash;10 day settlement.</td><td>On-chain issuance at smaller sizes. No lead arranger needed. T+0 settlement. Dual-listed on traditional and digital exchanges.</td><td><span className="bd bb">&euro;300M Siemens</span> on-chain bond, SIX/SDX 2024</td></tr>
				          <tr><td><strong>Trade Finance</strong></td><td>Invoice financing limited by bank relationships and geography. Paper-intensive.</td><td>Tokenised receivables with programmatic payment triggers. Cross-border settlement via stablecoins or tokenised deposits.</td><td><span className="bd ba">Early stage</span> Raze Finance, active pilots 2025</td></tr>
				          <tr><td><strong>Fund Interests</strong></td><td>LP interests illiquid for fund life. Transfer restrictions. No secondary market.</td><td>Tokenised LP interests tradeable on licensed secondary platforms. Fractional participation from lower minimums.</td><td><span className="bd bb">$2.4B tokenised MMFs</span> BlackRock BUIDL, Franklin BENJI</td></tr>
				          <tr><td><strong>Pre-IPO Equity</strong></td><td>Secondary liquidity near-zero for private company shares. High minimum per transaction.</td><td>Tokenised economic rights in pre-IPO equity distributed globally to accredited investors via regulated platforms.</td><td><span className="bd bg">Operating</span> Republic tokenised SpaceX rights 2024</td></tr>
				        </tbody>
				      </table>
				    </div>
				    <div className="note nb"><strong>For VC audiences:</strong> Each row in the table is a structuring mandate. Every tokenised bond, every tokenised credit fund, every tokenised real estate note requires a legal issuing entity formed in the correct jurisdiction, with the correct constitutional documents and compliance framework, administered over its life. The $5.7B private credit market, the $2.4B tokenised treasury market, and the growing real estate tokenisation market exist because structured finance advisors built SPV architecture beneath each instrument &mdash; not because technology platforms built it. Boyar enters this market from the structural layer, which is the only layer that gives tokens legal enforceability. The fragmentation of tokenisation across asset classes, jurisdictions, and regulatory regimes is the opportunity: each mandate requires bespoke legal structuring, and no single platform dominates. That is precisely where a cross-border TCSP with tokenisation literacy operates.</div>
				  </div>
				</div>
				 
				<div className="sec sa">
				  <div className="si">
				    <div className="slb">Jurisdiction Coverage</div>
				    <h2 className="sh2">Structuring Jurisdictions for Tokenisation Mandates</h2>
				    <p className="slead">The choice of SPV jurisdiction determines the legal framework governing the token, the regulatory classification of the offering, the substance requirements, and the banking accessibility for the issuing vehicle. Selection depends on asset type, investor base, and the regulatory perimeter the issuer intends to operate within.</p>
				    <div className="clbl">SPV Formation Jurisdictions</div>
				    <div className="chips" style={{ marginBottom: '24px' }}>
				      <div className="chip">Cayman Islands</div><div className="chip">British Virgin Islands</div><div className="chip">Luxembourg</div><div className="chip">Singapore</div><div className="chip">ADGM &mdash; Abu Dhabi</div><div className="chip">DIFC &mdash; Dubai</div><div className="chip">Jersey</div><div className="chip">Guernsey</div><div className="chip">Malta</div><div className="chip">Liechtenstein</div><div class="chip">Mauritius</div><div className="chip">Delaware</div>
				    </div>
				    <div className="clbl">VASP / Digital Asset Licensing Jurisdictions</div>
				    <div className="chips" style={{ marginBottom: '32px' }}>
				      <div className="chip">UAE &mdash; VARA</div><div className="chip">EU &mdash; MiCA (Lithuania, Malta, Ireland)</div><div className="chip">Cayman Islands</div><div className="chip">BVI &mdash; VASP Act</div><div className="chip">Bermuda &mdash; DABA</div><div className="chip">Bahamas &mdash; DARE Act</div><div className="chip">Singapore &mdash; MAS (MPI)</div>
				    </div>
				    <div className="g2">
				      <div className="gc"><div className="gct">Cayman Islands &mdash; Why It Remains the Institutional Standard</div><ul className="dl"><li>Cayman Exempted Companies and Segregated Portfolio Companies (SPCs) are the most widely used SPV vehicles for tokenised fund structures and private credit issuances globally.</li><li>No capital gains tax, no income tax on the SPV&rsquo;s income from foreign sources &mdash; the tax neutrality that institutional investors structurally require.</li><li>Bankruptcy remoteness is well established in Cayman case law &mdash; critical for ensuring token holders&rsquo; claims on the underlying asset survive an issuer default.</li><li>CIMA licensing pathway for funds distributing tokenised securities to institutional investors. Acceptable to most institutional investors globally for due diligence purposes.</li></ul></div>
				      <div className="gc"><div className="gct">ADGM &amp; DIFC &mdash; Why MENA Tokenisation Is Accelerating</div><ul className="dl"><li>ADGM issued its Digital Securities Regime in 2023 &mdash; one of the most comprehensive statutory frameworks globally for tokenised securities issuance, explicitly recognising digital securities as a distinct instrument class.</li><li>DIFC provides a common law framework (English law-based) with digital asset regulations permitting tokenised securities and investment tokens under existing financial services rules.</li><li>VARA in Dubai operates one of the most active VASP licensing regimes globally, with published guidance across categories of virtual assets and a structured licensing pathway.</li><li>UAE tax neutrality and banking infrastructure make it a natural hub for tokenised real estate and private credit distributed to MENA, Asian, and Indian investor bases &mdash; all within Boyar&rsquo;s existing corridor coverage.</li></ul></div>
				    </div>
				  </div>
				</div>
				 
				<div className="sec">
				  <div className="si">
				    <div className="slb">Honest Positioning</div>
				    <h2 className="sh2">What Is and Is Not Within Boyar&rsquo;s Mandate</h2>
				    <p className="slead">Precision about scope is more useful to institutional clients than inflated capability claims. The following delineation creates a clear picture of where Boyar&rsquo;s tokenisation advisory begins and where it passes execution to specialist technology and legal partners.</p>
				    <div className="scope">
				      <div className="sc scin">
				        <div className="sclbl">Within Boyar&rsquo;s mandate</div>
				        <ul className="scl">
				          <li><span style={{ fontWeight: 700 }}>&#8212;</span> SPV formation and legal wrapper structuring across 12+ tokenisation jurisdictions</li>
				          <li><span style={{ fontWeight: 700 }}>&#8212;</span> Regulatory classification and compliance architecture: AML/KYC, investor eligibility, FATCA/CRS</li>
				          <li><span style={{ fontWeight: 700 }}>&#8212;</span> Investor documentation: PPM, subscription agreements, token purchase agreements, side letters</li>
				          <li><span style={{ fontWeight: 700 }}>&#8212;</span> Ongoing corporate administration and governance of the issuing SPV</li>
				          <li><span style={{ fontWeight: 700 }}>&#8212;</span> Banking introductions and custody coordination for the issuing entity</li>
				          <li><span style={{ fontWeight: 700 }}>&#8212;</span> VASP/CASP licensing advisory for secondary trading platforms</li>
				          <li><span style={{ fontWeight: 700 }}>&#8212;</span> Multi-jurisdiction programme management for cross-border token distribution</li>
				          <li><span style={{ fontWeight: 700 }}>&#8212;</span> Economic substance analysis and notifications for SPV jurisdictions</li>
				        </ul>
				      </div>
				      <div className="sc scout">
				        <div className="sclbl">Partner-executed &mdash; outside Boyar&rsquo;s mandate</div>
				        <ul className="scl">
				          <li><span style={{ fontWeight: 700 }}>&#8212;</span> Smart contract development and blockchain deployment</li>
				          <li><span style={{ fontWeight: 700 }}>&#8212;</span> Token standard selection and technical token architecture</li>
				          <li><span style={{ fontWeight: 700 }}>&#8212;</span> Asset valuation and appraisal (licensed independent valuers)</li>
				          <li><span style={{ fontWeight: 700 }}>&#8212;</span> Legal opinions on securities law in each jurisdiction (local counsel)</li>
				          <li><span style={{ fontWeight: 700 }}>&#8212;</span> Audit of the issuing entity or underlying assets (licensed auditors)</li>
				          <li><span style={{ fontWeight: 700 }}>&#8212;</span> Tax advice on token economics for investors (qualified tax advisors)</li>
				          <li><span style={{ fontWeight: 700 }}>&#8212;</span> Digital asset custody (licensed custodians)</li>
				        </ul>
				      </div>
				    </div>
				    <div className="note ns" style={{ marginTop: '18px' }}><strong>Why this matters for VC audiences:</strong> Boyar&rsquo;s tokenisation capability is not a standalone product requiring technology infrastructure investment. It is an extension of existing TCSP capabilities &mdash; SPV formation, compliance administration, banking introductions &mdash; applied to a new category of issuing entity. The marginal cost of adding tokenisation structuring to Boyar&rsquo;s service mix is a function of jurisdictional knowledge and regulatory expertise, not infrastructure spend. The resulting mandate economics &mdash; structuring fees at initiation plus recurring corporate administration fees &mdash; follow the same model as any SPV-based engagement, with licensing advisory fees added where a VASP licence is required.</div>
				  </div>
				</div>
				 
				<div className="sec">
				  <div className="si">
				    <div className="cta">
				      <p><strong>Boyar Partners provides the legal structuring, SPV architecture, compliance frameworks, and jurisdictional coordination that gives tokenised instruments their legal foundation</strong> &mdash; across onshore, offshore, and international jurisdictions, from a single structured advisory relationship.</p>
				    </div>
				  </div>
				</div>

			</div>
		</ProtectedRoute>
	);
}
