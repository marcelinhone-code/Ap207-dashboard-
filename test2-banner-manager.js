(()=>{'use strict';
const K='system-control-test2-suite-v1',AUTH='ap207-auth-profile-v1';
const SPRITE='https://res.cloudinary.com/nva576pg/image/upload/v1788923834/banner-sprite-27.jpg';
const COZEE='./assets/banners/cozee-haus-curitiba-hq.svg?v=20260909-cozee';
const ROTATE_MS=6000,SELECT_KEY='system-control-test2-banner25-selection-v1';
const GROUPS=[
 {id:1,title:'CIDADES E PRÉDIOS',color:'#0f3d73',items:[0,1,2,3,4]},
 {id:2,title:'PRAIAS',color:'#137a54',items:[5,6,7,8,9]},
 {id:3,title:'CURITIBA E NATUREZA',color:'#9a4f10',items:[10,11,12,13,14]},
 {id:4,title:'FAZENDA E CAMPO',color:'#5e2a84',items:[15,16,17,18,19]},
 {id:5,title:'PRÉDIOS E ARQUITETURA',color:'#08738b',items:[20,21,22,23,24]}
];
let current=0,timer=null,spriteReady=false;
const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k)||'null')||f}catch{return f}};
const write=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
const profile=()=>read(AUTH,null)?.profile||null;
const isSuper=()=>profile()?.active!==false&&profile()?.role==='super_admin';
function pct(i){return (i/26*100).toFixed(5)+'%'}
function applySlice(el,i){el.style.backgroundImage=`url("${SPRITE}")`;el.style.backgroundSize='auto 2700%';el.style.backgroundRepeat='no-repeat';el.style.backgroundPosition=`center ${pct(i)}`;el.style.backgroundColor='#dfe7ef'}
function applyCozee(el){el.style.backgroundImage=`url("${COZEE}")`;el.style.backgroundSize='contain';el.style.backgroundPosition='center center';el.style.backgroundRepeat='no-repeat';el.style.backgroundColor='#dfe7ef';el.setAttribute('aria-label','Cozee Haus')}
function css(){if(document.getElementById('t2Banner25Css'))return;const s=document.createElement('style');s.id='t2Banner25Css';s.textContent=`
#t2New25Overlay{position:absolute!important;inset:0!important;z-index:999!important;border-radius:inherit!important;overflow:hidden!important;background-color:#dfe7ef!important;background-repeat:no-repeat!important;background-position:center center!important}
#t2Banners .t2-b25-shell{background:#fff;border:1px solid #dce4ef;border-radius:18px;padding:16px;margin-top:12px;overflow:hidden}
#t2Banners .t2-b25-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:14px}
#t2Banners .t2-b25-head h2{margin:0;font-size:24px}.t2-b25-head p{margin:4px 0 0;color:#64748b}
#t2Banners .t2-b25-save{border:0;border-radius:10px;background:#16a34a;color:#fff;font-weight:800;padding:11px 18px;cursor:pointer;white-space:nowrap}
#t2Banners .t2-b25-row{display:grid;grid-template-columns:105px 1fr;gap:10px;margin:12px 0;align-items:stretch}
#t2Banners .t2-b25-label{border-radius:12px;color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:10px;min-height:112px}
#t2Banners .t2-b25-label b{font-size:13px;letter-spacing:.04em}#t2Banners .t2-b25-label strong{font-size:34px;line-height:1;margin:5px 0}#t2Banners .t2-b25-label span{font-size:11px;font-weight:800}
#t2Banners .t2-b25-strip{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
#t2Banners .t2-b25-choice{position:relative;height:112px;border:2px solid #d5dee9;border-radius:10px;overflow:hidden;background:#e8eef5;padding:0;cursor:pointer}
#t2Banners .t2-b25-choice.selected{border-color:#2563eb;box-shadow:0 0 0 2px rgba(37,99,235,.14)}#t2Banners .t2-b25-choice.selected:after{content:'✓';position:absolute;right:7px;top:7px;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:#2563eb;color:white;font-weight:900}
#t2Banners .t2-b25-thumb{position:absolute;inset:0;background-color:#dfe7ef;background-repeat:no-repeat}
#t2Banners .t2-b25-name{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(transparent,rgba(0,0,0,.72));color:#fff;padding:22px 8px 7px;font-size:11px;font-weight:800;text-shadow:0 1px 2px #000}
#t2Banners .t2-b25-ok{margin-top:12px;border-radius:12px;background:#eef8f4;color:#166534;padding:12px 14px;font-weight:700}
@media(max-width:900px){#t2Banners .t2-b25-strip{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:650px){#t2Banners .t2-b25-shell{padding:10px}#t2Banners .t2-b25-row{grid-template-columns:88px 1fr}#t2Banners .t2-b25-label{min-height:100px;padding:7px}#t2Banners .t2-b25-choice{height:100px}#t2Banners .t2-b25-label strong{font-size:30px}#t2Banners .t2-b25-head{flex-direction:column}#t2Banners .t2-b25-head h2{font-size:21px}}
`;document.head.append(s)}
function selection(){const raw=read(SELECT_KEY,{});const out={};GROUPS.forEach(g=>{const v=Number(raw[g.id]);out[g.id]=g.items.includes(v)?v:g.items[0]});return out}
function saveSelection(v){write(SELECT_KEY,v)}
function renderManager(){const root=document.getElementById('t2Banners');if(!root)return;root.replaceChildren();if(!isSuper())return;const sel=selection();const shell=document.createElement('section');shell.className='t2-b25-shell';const head=document.createElement('div');head.className='t2-b25-head';const copy=document.createElement('div');copy.innerHTML='<h2>Gerenciar Banners</h2><p>Escolha uma imagem de cada bloco para a rotação do banner principal.</p>';const save=document.createElement('button');save.type='button';save.className='t2-b25-save';save.textContent='✓ Salvar Seleção';save.onclick=()=>{saveSelection(sel);restart();const ok=shell.querySelector('.t2-b25-ok');if(ok)ok.textContent='✓ Seleção salva. Cozee Haus + 5 imagens estão na rotação.'};head.append(copy,save);shell.append(head);
 GROUPS.forEach(g=>{const row=document.createElement('div');row.className='t2-b25-row';const lab=document.createElement('div');lab.className='t2-b25-label';lab.style.background=g.color;lab.innerHTML=`<b>BLOCO</b><strong>${g.id}</strong><span>${g.title}</span>`;row.append(lab);const strip=document.createElement('div');strip.className='t2-b25-strip';g.items.forEach((i,pos)=>{const b=document.createElement('button');b.type='button';b.className='t2-b25-choice'+(Number(sel[g.id])===i?' selected':'');b.setAttribute('aria-label',`Bloco ${g.id}, imagem ${pos+1}`);const th=document.createElement('div');th.className='t2-b25-thumb';applySlice(th,i);const nm=document.createElement('span');nm.className='t2-b25-name';nm.textContent=`Imagem ${pos+1}`;b.append(th,nm);b.onclick=()=>{sel[g.id]=i;saveSelection(sel);renderManager();restart()};strip.append(b)});row.append(strip);shell.append(row)});
 const ok=document.createElement('div');ok.className='t2-b25-ok';ok.textContent='✓ 25 fotos reais disponíveis. A rotação usa 1 de cada bloco + Cozee Haus.';shell.append(ok);root.append(shell)}
function ensureOverlay(){const h=document.querySelector('.scenic-banner');if(!h)return null;h.style.position='relative';h.style.overflow='hidden';let o=document.getElementById('t2New25Overlay');if(!o){document.querySelectorAll('#t2New27Overlay').forEach(n=>n.remove());o=document.createElement('div');o.id='t2New25Overlay';h.append(o);applyCozee(o)}return o}
function slides(){const sel=selection();return [{type:'cozee'},...GROUPS.map(g=>({type:'sprite',i:sel[g.id]}))]}
function showSlide(){const o=ensureOverlay();if(!o)return;const all=slides();const s=all[current%all.length];current=(current+1)%all.length;if(s.type==='sprite'&&spriteReady){applySlice(o,s.i);o.setAttribute('aria-label',`Imagem selecionada ${s.i+1}`)}else applyCozee(o)}
function start(){if(timer)clearInterval(timer);current=0;const o=ensureOverlay();if(o)applyCozee(o);timer=setInterval(showSlide,ROTATE_MS)}
function preload(){const o=ensureOverlay();if(o)applyCozee(o);const p=new Image();p.onload=()=>{spriteReady=true};p.onerror=()=>{spriteReady=false;if(o)applyCozee(o)};p.src=SPRITE}
function restart(){start();showSlide()}
function refresh(){css();renderManager();ensureOverlay();preload();start()}
function boot(){refresh();window.addEventListener('stay:unified-navigation',e=>{if(e.detail?.route==='publicity')renderManager()});const mo=new MutationObserver(()=>{if(document.querySelector('.scenic-banner')&&!document.getElementById('t2New25Overlay'))ensureOverlay()});mo.observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();