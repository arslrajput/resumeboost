// ResumeBoost AI — Gemini Version
// Replace the 4 constants below, then deploy to Vercel

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js"

// 🔧 REPLACE THESE 4 VALUES
const GEMINI_KEY   = "AIzaSyBZWUzhuZFIOdbMVRDL_TTzQ-dUncdrWcw";
const SUPABASE_URL = "https://osicfepiihctdbjpqqos.supabase.co";
const SUPABASE_KEY = "YeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zaWNmZXBpaWhjdGRianBxcW9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMDkwMzUsImV4cCI6MjA5Mjg4NTAzNX0.ARdQYItDYqmn1a22Jz26GcsE9AdS_0fUPNfmhb66rCs";
const LS_CHECKOUT  = "https://YOUR_STORE.lemonsqueezy.com/checkout/buy/YOUR_VARIANT_ID";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;
const supabase   = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const FREE_LIMIT = 3;
const mkKey      = () => { const d = new Date(); return `${d.getFullYear()}-${d.getMonth()}`; };

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#09090e;--bd:rgba(255,255,255,.07);--tx:#e8e3da;--mu:#6b6760;--a:#f26419;--a2:#4ecdc4;--er:#ff5555;--wa:#f5c842;--fh:'Syne',sans-serif;--fb:'DM Sans',sans-serif}
body{font-family:var(--fb);background:var(--bg);color:var(--tx);min-height:100vh;-webkit-font-smoothing:antialiased}
.app{min-height:100vh;display:flex;flex-direction:column;position:relative;overflow-x:hidden}
.orb{position:fixed;border-radius:50%;filter:blur(140px);pointer-events:none;z-index:0}
.o1{width:700px;height:700px;background:var(--a);opacity:.045;top:-250px;right:-200px}
.o2{width:500px;height:500px;background:var(--a2);opacity:.035;bottom:-100px;left:-200px}
.wrap{max-width:860px;margin:0 auto;padding:0 20px;position:relative;z-index:1;width:100%}
nav{padding:20px 0;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--bd)}
.logo{font-family:var(--fh);font-weight:800;font-size:19px;letter-spacing:-.5px;cursor:pointer}
.logo em{color:var(--a);font-style:normal}
.nr{display:flex;align-items:center;gap:10px}
.pill{font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:3px 9px;border-radius:20px;border:1px solid}
.pf{color:var(--mu);border-color:rgba(255,255,255,.1)}
.pp{color:var(--a);border-color:rgba(242,100,25,.35);background:rgba(242,100,25,.1)}
.nem{font-size:12px;color:var(--mu);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.nbtn{font-family:var(--fb);font-size:12px;padding:6px 14px;border-radius:8px;cursor:pointer;border:1px solid var(--bd);background:transparent;color:var(--mu);transition:all .2s}
.nbtn:hover{color:var(--tx);border-color:rgba(255,255,255,.18)}
.toasts{position:fixed;top:16px;right:16px;z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none}
.toast{padding:11px 16px;border-radius:10px;font-size:13px;font-weight:500;max-width:280px;border:1px solid;animation:tin .25s ease}
@keyframes tin{from{transform:translateX(32px);opacity:0}to{transform:none;opacity:1}}
.ts{background:rgba(78,205,196,.1);border-color:rgba(78,205,196,.22);color:#80d8d4}
.te{background:rgba(255,85,85,.1);border-color:rgba(255,85,85,.22);color:#ff9090}
.ti{background:rgba(242,100,25,.08);border-color:rgba(242,100,25,.18);color:#f0a878}
.card{background:rgba(255,255,255,.025);border:1px solid var(--bd);border-radius:14px;padding:26px;backdrop-filter:blur(6px)}
.aw{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.abox{width:100%;max-width:400px}
.alogo{font-family:var(--fh);font-size:23px;font-weight:800;text-align:center;margin-bottom:5px}
.alogo em{color:var(--a);font-style:normal}
.asub{text-align:center;font-size:14px;color:var(--mu);margin-bottom:26px}
.atabs{display:grid;grid-template-columns:1fr 1fr;gap:2px;background:rgba(255,255,255,.04);border-radius:10px;padding:3px;margin-bottom:22px}
.atab{padding:9px;border-radius:8px;border:none;background:transparent;color:var(--mu);font-family:var(--fb);font-size:14px;cursor:pointer;transition:all .2s}
.atab.on{background:rgba(255,255,255,.08);color:var(--tx)}
.field{margin-bottom:13px}
.lbl{display:block;font-size:11px;font-weight:600;letter-spacing:.9px;text-transform:uppercase;color:var(--mu);margin-bottom:5px}
input[type=text],input[type=email],input[type=password]{width:100%;background:rgba(255,255,255,.04);border:1px solid var(--bd);border-radius:10px;color:var(--tx);font-family:var(--fb);font-size:14px;padding:11px 13px;outline:none;transition:all .2s}
input:focus{border-color:rgba(242,100,25,.4);background:rgba(242,100,25,.03)}
input.ie{border-color:rgba(255,85,85,.45)}
.fe{font-size:11px;color:var(--er);margin-top:4px}
.fh{font-size:11px;color:var(--mu);margin-top:4px}
.fgt{display:block;text-align:right;font-size:12px;color:var(--mu);cursor:pointer;margin-top:-6px;margin-bottom:12px}
.fgt:hover{color:var(--a)}
.asw{text-align:center;font-size:13px;color:var(--mu);margin-top:14px}
.asw button{background:none;border:none;color:var(--a);cursor:pointer;font-size:13px;font-family:var(--fb)}
.btn{font-family:var(--fb);border:none;border-radius:10px;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;justify-content:center;gap:7px}
.btn:disabled{opacity:.3;cursor:not-allowed;transform:none!important}
.bp{background:var(--a);color:#0a0a0f;font-family:var(--fh);font-size:15px;font-weight:700;padding:14px 24px;width:100%;letter-spacing:.3px}
.bp:hover:not(:disabled){background:#f47e40;transform:translateY(-1px)}
.bo{background:transparent;border:1px solid var(--bd);color:var(--mu);font-size:13px;padding:9px 18px}
.bo:hover:not(:disabled){border-color:rgba(255,255,255,.18);color:var(--tx)}
.bg{background:none;border:1px solid var(--bd);color:var(--mu);font-size:13px;padding:8px 14px}
.bg:hover:not(:disabled){color:var(--tx)}
.bdr{background:rgba(255,85,85,.08);border:1px solid rgba(255,85,85,.18);color:#ff9090;font-size:12px;padding:7px 13px}
.sp{display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,.2);border-top-color:currentColor;border-radius:50%;animation:rot .7s linear infinite;flex-shrink:0}
@keyframes rot{to{transform:rotate(360deg)}}
.hero{padding:50px 0 34px}
.htag{font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--a);margin-bottom:13px}
.hero h1{font-family:var(--fh);font-size:clamp(30px,5vw,52px);font-weight:800;line-height:1.06;letter-spacing:-2px;margin-bottom:13px}
.hero h1 em{font-style:normal;color:var(--a)}
.hero p{font-size:16px;color:var(--mu);max-width:460px;line-height:1.65;font-weight:300}
.stats{display:flex;gap:22px;margin-top:30px;flex-wrap:wrap}
.stat{display:flex;flex-direction:column;gap:2px}
.sn{font-family:var(--fh);font-size:23px;font-weight:700}
.sl{font-size:11px;color:var(--mu)}
.tbar{display:flex;gap:3px;background:rgba(255,255,255,.03);border:1px solid var(--bd);border-radius:12px;padding:4px;margin-bottom:18px}
.tit{flex:1;padding:9px;border-radius:8px;border:none;background:transparent;color:var(--mu);font-family:var(--fb);font-size:13px;cursor:pointer;transition:all .2s;text-align:center}
.tit.on{background:rgba(255,255,255,.07);color:var(--tx)}
.usg{display:flex;align-items:center;gap:11px;padding:11px 15px;background:rgba(255,255,255,.025);border:1px solid var(--bd);border-radius:10px;margin-bottom:14px}
.utx{font-size:12px;color:var(--mu);flex:1}
.utx strong{color:var(--tx)}
.utr{width:80px;height:3px;background:rgba(255,255,255,.07);border-radius:2px;overflow:hidden}
.ufi{height:100%;border-radius:2px;transition:width .5s;background:var(--a)}
.ufi.mx{background:var(--er)}
.upb{font-size:11px;font-weight:700;color:var(--a);background:rgba(242,100,25,.1);border:1px solid rgba(242,100,25,.22);padding:5px 10px;border-radius:6px;cursor:pointer;white-space:nowrap;transition:all .2s}
.upb:hover{background:rgba(242,100,25,.18)}
.flb{display:block;font-size:11px;font-weight:600;letter-spacing:.9px;text-transform:uppercase;color:var(--mu);margin-bottom:6px}
.fhn{font-size:11px;color:var(--mu);margin-top:3px}
.fhn.wn{color:var(--wa)}
textarea{width:100%;background:rgba(255,255,255,.03);border:1px solid var(--bd);border-radius:11px;color:var(--tx);font-family:var(--fb);font-size:14px;line-height:1.6;padding:13px 15px;resize:vertical;outline:none;transition:all .2s}
textarea:focus{border-color:rgba(242,100,25,.35);background:rgba(242,100,25,.025)}
textarea.ie{border-color:rgba(255,85,85,.4)}
.txi{width:100%;background:rgba(255,255,255,.03);border:1px solid var(--bd);border-radius:10px;color:var(--tx);font-family:var(--fb);font-size:14px;padding:11px 13px;outline:none;transition:all .2s}
.txi:focus{border-color:rgba(242,100,25,.35)}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin-bottom:15px}
@media(max-width:560px){.g2{grid-template-columns:1fr}}
.ier{font-size:12px;color:var(--er);margin-top:4px;display:flex;align-items:center;gap:4px}
.slb{font-family:var(--fh);font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:var(--mu);margin-bottom:11px}
.lding{display:flex;flex-direction:column;align-items:center;gap:17px;padding:50px 0}
.lsp{width:36px;height:36px;border:2px solid rgba(242,100,25,.15);border-top-color:var(--a);border-radius:50%;animation:rot .7s linear infinite}
.lsts{display:flex;flex-direction:column;align-items:center;gap:5px}
.lst{font-size:13px;color:var(--mu);transition:color .3s}
.lst.cur{color:var(--tx)}
.lst.dn{color:var(--a2)}
.sbn{display:flex;align-items:center;gap:17px;padding:20px;background:rgba(242,100,25,.06);border:1px solid rgba(242,100,25,.12);border-radius:12px;margin-bottom:18px}
.srg{position:relative;width:66px;height:66px;flex-shrink:0}
.srg svg{transform:rotate(-90deg)}
.snm{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-size:18px;font-weight:800}
.sin h3{font-family:var(--fh);font-size:16px;font-weight:700;margin-bottom:3px}
.sin p{font-size:13px;color:var(--mu);line-height:1.5}
.rg{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:11px}
@media(max-width:540px){.rg{grid-template-columns:1fr}}
.rs{background:rgba(255,255,255,.02);border:1px solid var(--bd);border-radius:11px;padding:13px}
.rh{font-size:11px;font-weight:700;letter-spacing:.9px;text-transform:uppercase;margin-bottom:8px;display:flex;align-items:center;gap:5px}
.dot{width:5px;height:5px;border-radius:50%;flex-shrink:0}
.dr{background:var(--er)}.dy{background:var(--wa)}.dg{background:var(--a2)}
.ri{font-size:13px;line-height:1.5;padding:7px 9px;border-radius:7px;margin-bottom:4px}
.rb{background:rgba(255,85,85,.07);border:1px solid rgba(255,85,85,.12);color:#e8a0a0}
.rw{background:rgba(245,200,66,.06);border:1px solid rgba(245,200,66,.12);color:#d4b860}
.rgo{background:rgba(78,205,196,.06);border:1px solid rgba(78,205,196,.12);color:#80d8d4}
.kww{display:flex;flex-wrap:wrap;gap:5px}
.kw{padding:3px 9px;border-radius:20px;font-size:11px;font-weight:600}
.kwm{background:rgba(255,85,85,.07);border:1px solid rgba(255,85,85,.14);color:#ff9090}
.kwf{background:rgba(78,205,196,.07);border:1px solid rgba(78,205,196,.14);color:var(--a2)}
.ob{background:rgba(78,205,196,.04);border:1px solid rgba(78,205,196,.12);border-radius:11px;padding:13px;font-size:13px;line-height:1.7;color:#a0d8d4;white-space:pre-wrap;max-height:180px;overflow-y:auto;position:relative}
.cpb{position:absolute;top:8px;right:8px;font-size:11px;padding:4px 9px;border-radius:6px;background:rgba(78,205,196,.1);border:1px solid rgba(78,205,196,.2);color:var(--a2);cursor:pointer;font-family:var(--fb);transition:all .2s}
.cpb:hover{background:rgba(78,205,196,.18)}
.ebx{background:rgba(255,85,85,.07);border:1px solid rgba(255,85,85,.18);border-radius:11px;padding:17px;text-align:center;margin-top:13px}
.ebx p{font-size:14px;color:#ff9090;margin-bottom:10px}
.hl{display:flex;flex-direction:column;gap:8px}
.hi{display:flex;align-items:center;gap:12px;padding:12px 15px;background:rgba(255,255,255,.02);border:1px solid var(--bd);border-radius:11px;cursor:pointer;transition:all .2s}
.hi:hover{border-color:rgba(255,255,255,.12);background:rgba(255,255,255,.04)}
.hsc{font-family:var(--fh);font-size:19px;font-weight:800;width:38px;text-align:center;flex-shrink:0}
.hin{flex:1;min-width:0}
.htl{font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hdt{font-size:11px;color:var(--mu);margin-top:2px}
.emp{text-align:center;padding:34px 0;color:var(--mu);font-size:14px}
.eic{font-size:32px;margin-bottom:10px;opacity:.35}
.mbg{position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(5px)}
.modal{background:#13131b;border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:30px;max-width:390px;width:100%;position:relative;animation:min .25s ease}
@keyframes min{from{transform:scale(.95);opacity:0}to{transform:none;opacity:1}}
.modal h2{font-family:var(--fh);font-size:21px;font-weight:800;margin-bottom:5px}
.mcl{position:absolute;top:13px;right:13px;background:rgba(255,255,255,.06);border:none;border-radius:7px;color:var(--mu);cursor:pointer;padding:5px 9px;font-size:15px}
.mcl:hover{color:var(--tx)}
.mpr{text-align:center;margin:16px 0}
.mpb{font-family:var(--fh);font-size:42px;font-weight:800;color:var(--a)}
.mpp{font-size:13px;color:var(--mu)}
.mfl{list-style:none;margin-bottom:18px}
.mfl li{font-size:13px;padding:5px 0;display:flex;align-items:center;gap:7px;color:var(--mu);border-bottom:1px solid rgba(255,255,255,.04)}
.mfl li:last-child{border:none}
.mfl li::before{content:'✓';color:var(--a2);font-weight:700;flex-shrink:0}
.mn{text-align:center;margin-top:9px;font-size:11px;color:var(--mu)}
.lw{text-align:center;padding:34px 16px}
.li{font-size:42px;margin-bottom:11px}
.lw h3{font-family:var(--fh);font-size:18px;font-weight:700;margin-bottom:6px}
.lw p{font-size:14px;color:var(--mu);margin-bottom:20px;line-height:1.55}
footer{margin-top:auto;padding:26px 0 18px;border-top:1px solid var(--bd);text-align:center;font-size:12px;color:var(--mu)}
@media(max-width:580px){.card{padding:17px}.hero{padding:34px 0 22px}.sbn{flex-direction:column;text-align:center}.nem{display:none}}
`;

const vc = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const vp = p => {
  if(p.length<8) return "Min 8 characters";
  if(!/[A-Z]/.test(p)) return "Need 1 uppercase";
  if(!/[0-9]/.test(p)) return "Need 1 number";
  return null;
};
const sc = s => s>=70?"#4ecdc4":s>=40?"#f5c842":"#ff5555";
const fd = iso => new Date(iso).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});

function useToast(){
  const [list,setList]=useState([]);
  const show=useCallback((msg,type="info")=>{
    const id=Date.now();
    setList(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setList(p=>p.filter(t=>t.id!==id)),3500);
  },[]);
  return{list,show};
}

async function gemini(jobTitle,jobDesc,resume){
  const prompt=`You are a professional resume optimizer and ATS expert.
Analyze the resume against the job description.
Return ONLY valid JSON — no markdown, no backticks, no extra text.

Job Title: ${jobTitle||"Not specified"}
Job Description: ${jobDesc.slice(0,3000)}
Resume: ${resume.slice(0,3000)}

Return exactly:
{"ats_score":<0-100>,"score_label":"<Poor|Fair|Good|Excellent>","score_summary":"<1 sentence>","missing_keywords":[<up to 8>],"found_keywords":[<up to 8>],"critical_missing":[<3 issues>],"improvements":[<3 tips>],"strengths":[<2 strengths>],"optimized_summary":"<3-4 sentence rewrite for this role>"}`;

  const ctrl=new AbortController();
  const t=setTimeout(()=>ctrl.abort(),30000);
  const r=await fetch(GEMINI_URL,{
    method:"POST",signal:ctrl.signal,
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0.3,maxOutputTokens:1024}})
  });
  clearTimeout(t);
  if(!r.ok){
    const b=await r.json().catch(()=>({}));
    if(r.status===400) throw new Error("Invalid API key — check your Gemini key");
    if(r.status===429) throw new Error("Rate limit hit — wait a moment and retry");
    throw new Error(b?.error?.message||`Gemini error ${r.status}`);
  }
  const data=await r.json();
  const text=data?.candidates?.[0]?.content?.parts?.[0]?.text||"";
  if(!text) throw new Error("Empty response. Try again.");
  const clean=text.replace(/^```(?:json)?\n?/i,"").replace(/\n?```$/i,"").trim();
  let p;
  try{p=JSON.parse(clean);}
  catch{const m=clean.match(/\{[\s\S]*\}/);if(m)p=JSON.parse(m[0]);else throw new Error("Unexpected format. Try again.");}
  if(typeof p.ats_score!=="number") throw new Error("Invalid response.");
  p.ats_score=Math.min(100,Math.max(0,Math.round(p.ats_score)));
  return p;
}

function Ring({score}){
  const r=25,c=2*Math.PI*r,col=sc(score);
  return(
    <div className="srg">
      <svg width="66" height="66" viewBox="0 0 66 66">
        <circle cx="33" cy="33" r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="5"/>
        <circle cx="33" cy="33" r={r} fill="none" stroke={col} strokeWidth="5"
          strokeDasharray={c} strokeDashoffset={c*(1-score/100)} strokeLinecap="round"
          style={{transition:"stroke-dashoffset 1.2s ease"}}/>
      </svg>
      <div className="snm" style={{color:col}}>{score}</div>
    </div>
  );
}

function UpModal({onClose,email}){
  const url=`${LS_CHECKOUT}?checkout[email]=${encodeURIComponent(email||"")}`;
  return(
    <div className="mbg" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <button className="mcl" onClick={onClose}>✕</button>
        <div style={{fontSize:28,marginBottom:7}}>⚡</div>
        <h2>Upgrade to Pro</h2>
        <p style={{fontSize:13,color:"var(--mu)",lineHeight:1.55}}>
          You've used all {FREE_LIMIT} free checks this month.
        </p>
        <div className="mpr"><div className="mpb">$15</div><div className="mpp">per month · cancel anytime</div></div>
        <ul className="mfl">
          <li>Unlimited resume checks</li>
          <li>Full analysis history</li>
          <li>AI cover letter generator</li>
          <li>LinkedIn optimizer</li>
          <li>Priority support</li>
        </ul>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
          <button className="btn bp">Upgrade Now — $15/mo →</button>
        </a>
        <div className="mn">Lemon Squeezy · Secure · No hidden fees</div>
      </div>
    </div>
  );
}

function ResultView({result,onReset,toast}){
  const [cp,setCp]=useState(false);
  const lbl=result.ats_score>=70?"Strong Match":result.ats_score>=40?"Needs Work":"Poor Match";
  function copy(){
    navigator.clipboard.writeText(result.optimized_summary||"")
      .then(()=>{setCp(true);toast("Copied!","success");setTimeout(()=>setCp(false),2000);})
      .catch(()=>toast("Select and copy manually","error"));
  }
  return(
    <div>
      <div className="sbn">
        <Ring score={result.ats_score}/>
        <div className="sin">
          <h3>ATS Score: {result.ats_score}/100 — {lbl}</h3>
          <p>{result.score_summary}</p>
        </div>
      </div>
      <div className="rg">
        {result.critical_missing?.length>0&&(
          <div className="rs"><div className="rh"><div className="dot dr"/>Critical Issues</div>
            {result.critical_missing.map((x,i)=><div key={i} className="ri rb">⚠ {x}</div>)}</div>
        )}
        {result.improvements?.length>0&&(
          <div className="rs"><div className="rh"><div className="dot dy"/>Improvements</div>
            {result.improvements.map((x,i)=><div key={i} className="ri rw">→ {x}</div>)}</div>
        )}
        {result.strengths?.length>0&&(
          <div className="rs"><div className="rh"><div className="dot dg"/>Strengths</div>
            {result.strengths.map((x,i)=><div key={i} className="ri rgo">✓ {x}</div>)}</div>
        )}
        <div className="rs"><div className="rh"><div className="dot dr"/>Missing Keywords</div>
          {result.missing_keywords?.length>0
            ?<div className="kww">{result.missing_keywords.map((k,i)=><span key={i} className="kw kwm">{k}</span>)}</div>
            :<div style={{fontSize:13,color:"var(--mu)"}}>None missing ✓</div>}
        </div>
        <div className="rs"><div className="rh"><div className="dot dg"/>Found Keywords</div>
          {result.found_keywords?.length>0
            ?<div className="kww">{result.found_keywords.map((k,i)=><span key={i} className="kw kwf">{k}</span>)}</div>
            :<div style={{fontSize:13,color:"var(--mu)"}}>No matches yet</div>}
        </div>
      </div>
      {result.optimized_summary&&(
        <div className="rs" style={{marginBottom:13}}>
          <div className="rh"><div className="dot dg"/>Optimized Summary — Copy This</div>
          <div style={{position:"relative"}}>
            <div className="ob">{result.optimized_summary}</div>
            <button className="cpb" onClick={copy}>{cp?"Copied ✓":"Copy"}</button>
          </div>
        </div>
      )}
      <button className="btn bo" style={{width:"100%",marginTop:4}} onClick={onReset}>↩ Analyze Another</button>
    </div>
  );
}

function HistView({list,loading,onSelect,onClear,toast}){
  if(loading) return <div className="emp"><div className="eic">⏳</div>Loading...</div>;
  if(!list.length) return <div className="emp"><div className="eic">📋</div>No analyses yet!</div>;
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:13}}>
        <div style={{fontSize:12,color:"var(--mu)"}}>{list.length} saved</div>
        <button className="btn bdr" onClick={()=>{onClear();toast("History cleared","info");}}>Clear All</button>
      </div>
      <div className="hl">
        {list.map(a=>(
          <div key={a.id} className="hi" onClick={()=>onSelect(a)}>
            <div className="hsc" style={{color:sc(a.ats_score)}}>{a.ats_score}</div>
            <div className="hin">
              <div className="htl">{a.job_title||"Resume Analysis"}</div>
              <div className="hdt">{fd(a.created_at)}</div>
            </div>
            <div style={{color:"var(--mu)"}}>›</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuthPage({toast,onAuth}){
  const [mode,setMode]=useState("login");
  const [email,setEmail]=useState(""),[ pw,setPw]=useState(""), [name,setName]=useState("");
  const [errs,setErrs]=useState({}), [busy,setBusy]=useState(false), [sent,setSent]=useState(false);

  function validate(){
    const e={};
    if(mode==="signup"&&!name.trim()) e.name="Name required";
    if(!vc(email)) e.email="Valid email required";
    if(mode!=="reset"){const pe=vp(pw);if(pe) e.pw=pe;}
    setErrs(e); return !Object.keys(e).length;
  }

  async function submit(){
    if(!validate()) return;
    setBusy(true); setErrs({});
    try{
      if(mode==="reset"){
        const{error}=await supabase.auth.resetPasswordForEmail(email);
        if(error) throw error;
        setSent(true); toast("Reset email sent!","success");
      } else if(mode==="signup"){
        const{data,error}=await supabase.auth.signUp({email,password:pw,options:{data:{full_name:name}}});
        if(error) throw error;
        if(data.user&&!data.session) toast("Check your email to confirm!","info");
        else{toast("Welcome! 🎉","success"); onAuth(data.user);}
      } else {
        const{data,error}=await supabase.auth.signInWithPassword({email,password:pw});
        if(error){if(error.message.includes("Invalid")) throw new Error("Wrong email or password"); throw error;}
        toast("Welcome back!","success"); onAuth(data.user);
      }
    } catch(err){
      const msg=err.message||"Something went wrong";
      if(msg.toLowerCase().includes("email")) setErrs({email:msg});
      else if(msg.toLowerCase().includes("password")) setErrs({pw:msg});
      else setErrs({g:msg});
    }
    setBusy(false);
  }

  function sw(m){setMode(m);setErrs({});setEmail("");setPw("");setName("");setSent(false);}

  if(mode==="reset") return(
    <div className="aw"><div className="abox card">
      <div className="alogo">Resume<em>Boost</em> AI</div>
      <div className="asub">Reset your password</div>
      {sent?(
        <>
          <p style={{fontSize:14,color:"var(--mu)",textAlign:"center",marginBottom:18}}>✉ Check your inbox.</p>
          <button className="btn bo" style={{width:"100%"}} onClick={()=>sw("login")}>Back to Sign In</button>
        </>
      ):(
        <>
          <div className="field">
            <label className="lbl">Email</label>
            <input type="email" className={errs.email?"ie":""} placeholder="you@example.com"
              value={email} onChange={e=>setEmail(e.target.value.trim())} onKeyDown={e=>e.key==="Enter"&&submit()}/>
            {errs.email&&<div className="fe">{errs.email}</div>}
          </div>
          {errs.g&&<div style={{fontSize:12,color:"var(--er)",marginBottom:9}}>{errs.g}</div>}
          <button className="btn bp" onClick={submit} disabled={busy}>
            {busy?<><span className="sp"/>Sending...</>:"Send Reset Link"}
          </button>
          <div className="asw"><button onClick={()=>sw("login")}>← Back</button></div>
        </>
      )}
    </div></div>
  );

  return(
    <div className="aw"><div className="abox card">
      <div className="alogo">Resume<em>Boost</em> AI</div>
      <div className="asub">Get past ATS. Land more interviews.</div>
      <div className="atabs">
        <button className={`atab ${mode==="login"?"on":""}`} onClick={()=>sw("login")}>Sign In</button>
        <button className={`atab ${mode==="signup"?"on":""}`} onClick={()=>sw("signup")}>Sign Up Free</button>
      </div>
      {mode==="signup"&&(
        <div className="field">
          <label className="lbl">Full Name</label>
          <input type="text" className={errs.name?"ie":""} placeholder="Your name"
            value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/>
          {errs.name&&<div className="fe">{errs.name}</div>}
        </div>
      )}
      <div className="field">
        <label className="lbl">Email</label>
        <input type="email" className={errs.email?"ie":""} placeholder="you@example.com"
          value={email} onChange={e=>setEmail(e.target.value.trim())} onKeyDown={e=>e.key==="Enter"&&submit()}/>
        {errs.email&&<div className="fe">{errs.email}</div>}
      </div>
      <div className="field">
        <label className="lbl">Password</label>
        <input type="password" className={errs.pw?"ie":""}
          placeholder={mode==="signup"?"Min 8 chars, 1 uppercase, 1 number":"Your password"}
          value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/>
        {errs.pw&&<div className="fe">{errs.pw}</div>}
        {mode==="signup"&&!errs.pw&&<div className="fh">8+ chars · 1 uppercase · 1 number</div>}
      </div>
      {mode==="login"&&<div className="fgt" onClick={()=>sw("reset")}>Forgot password?</div>}
      {errs.g&&<div style={{fontSize:12,color:"var(--er)",marginBottom:9}}>{errs.g}</div>}
      <button className="btn bp" onClick={submit} disabled={busy}>
        {busy?<><span className="sp"/>Please wait...</>:mode==="signup"?"Create Free Account":"Sign In"}
      </button>
      <div className="asw">
        {mode==="login"
          ?<>No account? <button onClick={()=>sw("signup")}>Sign up free</button></>
          :<>Have an account? <button onClick={()=>sw("login")}>Sign in</button></>}
      </div>
    </div></div>
  );
}

export default function App(){
  const{list:toasts,show:toast}=useToast();
  const[user,setUser]=useState(null);
  const[profile,setProfile]=useState(null);
  const[anas,setAnas]=useState([]);
  const[ready,setReady]=useState(false);
  const[tab,setTab]=useState("analyze");
  const[showUp,setShowUp]=useState(false);
  const[jt,setJT]=useState(""), [jd,setJD]=useState(""), [rv,setRv]=useState("");
  const[fErrs,setFErrs]=useState({});
  const[busy,setBusy]=useState(false), [lstep,setLstep]=useState(0);
  const[result,setResult]=useState(null), [apiErr,setApiErr]=useState("");
  const[selH,setSelH]=useState(null), [hb,setHb]=useState(false);
  const sub=useRef(false);

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{
      if(session?.user){setUser(session.user);loadProf(session.user);}
      setReady(true);
    });
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{
      if(session?.user){setUser(session.user);loadProf(session.user);}
      else{setUser(null);setProfile(null);setAnas([]);}
    });
    return()=>subscription.unsubscribe();
  },[]);

  async function loadProf(u){
    let{data:p}=await supabase.from("profiles").select("*").eq("id",u.id).single();
    if(!p){
      const{data:np}=await supabase.from("profiles")
        .insert({id:u.id,email:u.email,plan:"free",checks_this_month:0,month_key:mkKey()})
        .select().single();
      p=np;
    } else if(p.month_key!==mkKey()){
      const{data:up}=await supabase.from("profiles")
        .update({checks_this_month:0,month_key:mkKey()}).eq("id",u.id).select().single();
      p=up;
    }
    setProfile(p);
  }

  async function loadAnas(){
    if(!user) return;
    setHb(true);
    const{data}=await supabase.from("analyses").select("id,job_title,ats_score,result,created_at")
      .eq("user_id",user.id).order("created_at",{ascending:false}).limit(50);
    setAnas(data||[]); setHb(false);
  }

  useEffect(()=>{if(tab==="history"&&user) loadAnas();},[tab]);

  async function logout(){await supabase.auth.signOut();toast("Signed out","info");reset();}

  function reset(){setResult(null);setApiErr("");setJT("");setJD("");setRv("");setFErrs({});setSelH(null);}

  function validateForm(){
    const e={};
    if(!jd.trim()) e.jd="Job description is required";
    else if(jd.trim().length<50) e.jd="Add more detail (min 50 chars)";
    if(!rv.trim()) e.rv="Resume text is required";
    else if(rv.trim().length<100) e.rv="Resume seems too short";
    setFErrs(e); return !Object.keys(e).length;
  }

  async function analyze(){
    if(sub.current||busy) return;
    if(!validateForm()) return;
    const used=profile?.checks_this_month||0;
    if(profile?.plan==="free"&&used>=FREE_LIMIT){setShowUp(true);return;}
    sub.current=true;
    setBusy(true);setResult(null);setApiErr("");setLstep(0);
    const ts=[
      setTimeout(()=>setLstep(1),500),
      setTimeout(()=>setLstep(2),1400),
      setTimeout(()=>setLstep(3),2500),
    ];
    try{
      const parsed=await gemini(jt,jd,rv);
      setResult(parsed);
      await supabase.from("analyses").insert({user_id:user.id,job_title:jt||"Resume Analysis",ats_score:parsed.ats_score,result:parsed});
      const{data:up}=await supabase.from("profiles").update({checks_this_month:used+1}).eq("id",user.id).select().single();
      setProfile(up);
      toast(`Done! Score: ${parsed.ats_score}/100`,"success");
    } catch(err){
      const msg=err.name==="AbortError"?"Timed out. Check connection and retry.":err.message||"Analysis failed.";
      setApiErr(msg);toast("Analysis failed","error");
    } finally{
      ts.forEach(clearTimeout);setBusy(false);setLstep(0);sub.current=false;
    }
  }

  async function clearH(){
    await supabase.from("analyses").delete().eq("user_id",user.id);
    setAnas([]);setSelH(null);
  }

  if(!ready) return(
    <><style>{CSS}</style>
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div className="lsp"/>
      </div>
    </>
  );

  if(!user) return(
    <><style>{CSS}</style>
      <div className="orb o1"/><div className="orb o2"/>
      <div className="toasts">{toasts.map(t=><div key={t.id} className={`toast t${t.type[0]}`}>{t.msg}</div>)}</div>
      <AuthPage toast={toast} onAuth={u=>setUser(u)}/>
    </>
  );

  const left=Math.max(0,FREE_LIMIT-(profile?.checks_this_month||0));
  const isPro=profile?.plan==="pro";
  const pct=((profile?.checks_this_month||0)/FREE_LIMIT)*100;

  return(
    <><style>{CSS}</style>
      <div className="orb o1"/><div className="orb o2"/>
      <div className="toasts">{toasts.map(t=><div key={t.id} className={`toast t${t.type[0]}`}>{t.msg}</div>)}</div>
      {showUp&&<UpModal onClose={()=>setShowUp(false)} email={user.email}/>}
      <div className="app">
        <div className="wrap">
          <nav>
            <div className="logo" onClick={reset}>Resume<em>Boost</em> AI</div>
            <div className="nr">
              <span className="nem">{user.email}</span>
              <span className={`pill ${isPro?"pp":"pf"}`}>{isPro?"PRO":"FREE"}</span>
              <button className="nbtn" onClick={logout}>Sign Out</button>
            </div>
          </nav>
          <div className="hero">
            <div className="htag">✦ AI-Powered ATS Optimizer</div>
            <h1>Get your resume<br/><em>past the bots.</em></h1>
            <p>Paste your resume + job description. AI scores your ATS match, finds missing keywords, and rewrites your summary.</p>
            <div className="stats">
              <div className="stat"><span className="sn">70%</span><span className="sl">Resumes auto-rejected</span></div>
              <div className="stat"><span className="sn">3×</span><span className="sl">More interviews</span></div>
              <div className="stat"><span className="sn">&lt;30s</span><span className="sl">Analysis time</span></div>
            </div>
          </div>
          <div className="tbar">
            <button className={`tit ${tab==="analyze"?"on":""}`} onClick={()=>{setTab("analyze");setSelH(null);}}>Analyze</button>
            <button className={`tit ${tab==="history"?"on":""}`} onClick={()=>setTab("history")}>
              History {anas.length>0?`(${anas.length})`:""}
            </button>
          </div>
          {tab==="analyze"&&(
            <>
              {!isPro&&(
                <div className="usg">
                  <div className="utx"><strong>{left}</strong> free {left===1?"check":"checks"} left this month</div>
                  <div className="utr"><div className={`ufi ${left===0?"mx":""}`} style={{width:`${Math.min(pct,100)}%`}}/></div>
                  <div className="upb" onClick={()=>setShowUp(true)}>Go Pro</div>
                </div>
              )}
              {!isPro&&left===0&&!result?(
                <div className="card">
                  <div className="lw">
                    <div className="li">🚫</div>
                    <h3>Monthly limit reached</h3>
                    <p>You've used all {FREE_LIMIT} free checks.<br/>Upgrade for unlimited analyses.</p>
                    <button className="btn bp" style={{width:"auto",padding:"13px 30px"}} onClick={()=>setShowUp(true)}>
                      Upgrade to Pro — $15/mo
                    </button>
                  </div>
                </div>
              ):result?(
                <div className="card">
                  <div className="slb">Your ATS Report</div>
                  <ResultView result={result} onReset={reset} toast={toast}/>
                </div>
              ):(
                <div className="card">
                  <div className="slb">Paste Your Info</div>
                  <div className="g2">
                    <div>
                      <label className="flb">Job Title (optional)</label>
                      <input className="txi" type="text" placeholder="e.g. Product Manager"
                        value={jt} onChange={e=>setJT(e.target.value)} disabled={busy}/>
                    </div>
                    <div style={{display:"flex",alignItems:"flex-end"}}>
                      <p style={{fontSize:12,color:"var(--mu)",lineHeight:1.5}}>💡 Improves keyword accuracy.</p>
                    </div>
                  </div>
                  <label className="flb">Job Description *</label>
                  <textarea rows={5} className={fErrs.jd?"ie":""}
                    placeholder="Paste the full job description here..."
                    value={jd} onChange={e=>{setJD(e.target.value);if(fErrs.jd)setFErrs(p=>({...p,jd:""}));}}
                    disabled={busy} style={{marginBottom:3}}/>
                  <div className={`fhn ${jd.length>2800?"wn":""}`}>{jd.length}/3000</div>
                  {fErrs.jd&&<div className="ier">⚠ {fErrs.jd}</div>}
                  <label className="flb" style={{marginTop:15}}>Your Resume *</label>
                  <textarea rows={8} className={fErrs.rv?"ie":""}
                    placeholder="Paste your full resume text (from Word, PDF, or type)..."
                    value={rv} onChange={e=>{setRv(e.target.value);if(fErrs.rv)setFErrs(p=>({...p,rv:""}));}}
                    disabled={busy} style={{marginBottom:3}}/>
                  <div className={`fhn ${rv.length>2800?"wn":""}`}>{rv.length}/3000</div>
                  {fErrs.rv&&<div className="ier">⚠ {fErrs.rv}</div>}
                  {apiErr&&(
                    <div className="ebx">
                      <p>⚠ {apiErr}</p>
                      <button className="btn bg" onClick={()=>setApiErr("")}>Dismiss</button>
                    </div>
                  )}
                  {busy?(
                    <div className="lding">
                      <div className="lsp"/>
                      <div className="lsts">
                        {["Reading job description...","Scanning your resume...","Calculating ATS score...","Generating report..."].map((s,i)=>(
                          <div key={i} className={`lst ${i<lstep?"dn":i===lstep?"cur":""}`}>
                            {i<lstep?"✓":i===lstep?"→":"·"} {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  ):(
                    <button className="btn bp" disabled={!jd.trim()||!rv.trim()} onClick={analyze} style={{marginTop:15}}>
                      Analyze My Resume →
                    </button>
                  )}
                </div>
              )}
            </>
          )}
          {tab==="history"&&(
            <div className="card">
              <div className="slb">Past Analyses</div>
              {selH?(
                <>
                  <button className="btn bg" style={{marginBottom:15}} onClick={()=>setSelH(null)}>← Back</button>
                  <ResultView result={selH.result} onReset={()=>setSelH(null)} toast={toast}/>
                </>
              ):(
                <HistView list={anas} loading={hb} onSelect={a=>setSelH(a)} onClear={clearH} toast={toast}/>
              )}
            </div>
          )}
        </div>
        <footer>
          <div className="wrap">
            ResumeBoost AI · Powered by Google Gemini · Free: {FREE_LIMIT} checks/month · Pro: $15/month
          </div>
        </footer>
      </div>
    </>
  );
}
