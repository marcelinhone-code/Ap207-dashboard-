(()=>{'use strict';
const SPRITE='https://res.cloudinary.com/nva576pg/image/upload/v1788923834/banner-sprite-27.jpg';
const COZEE='./assets/banners/cozee-haus-curitiba-hq.svg?v=20260909-cozee';
const ROTATE_MS=6000;
const GROUPS=[
 {id:1,title:'CURITIBA E CENTRO',color:'#0f3d73',items:[0,1,2,3,4,5,6,7]},
 {id:2,title:'ILHA DO MEL E PRAIAS',color:'#137a54',items:[8,9,10,11,12,13]},
 {id:3,title:'MORRETES E NATUREZA',color:'#9a4f10',items:[14,15,16,17]},
 {id:4,title:'JARDIM BOTÂNICO E CURITIBA',color:'#5e2a84',items:[18,19,20,21]},
 {id:5,title:'MIAMI',color:'#08738b',items:[22,23,24,25,26]}
];
const SELECT_KEY='system-control-test2-banner27-selection-v1';
let current=0,timer=null;
function pct(i){return (i/26*100).toFixed(5)+'%'}
function applySlice(el,i){el.style.backgroundImage=`url("${SPRITE}")`;el.style.backgroundSize='auto 2700%';el.style.backgroundRepeat='no-repeat';el.style.backgroundPosition=`center ${pct(i)}`;el.style.backgroundColor='#dfe7ef'}
function css(){if(document.getElementById('t2Banner27Css'))return;const s=document.createElement('style');s.id='t2Banner27Css';s.textContent=`
#t2New27Overlay{position:absolute!important;inset:0!important;z-index:999!important;border-radius:inherit!important;overflow:hidden!important;background-color:#dfe7ef!important;background-repeat:no-repeat!important}
#t2Banners .t2-b27-shell{background:#fff;border:1px solid #dce4ef;border-radius:18px;padding:16px;margin-top:12px;overflow:hidden}
#t2Banners .t2-b27-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
#t2Banners .t2-b27-head h2{margin:0;font-size:24px}.t2-b27-head p{margin:4px 0 0;color:#64748b}
#t2Banners .t2-b27-row{display:grid;grid-template-columns:105px 1fr;gap:10px;margin:12px 0;align-items:stretch}
#t2Banners .t2-b27-label{border-radius:12px;color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:10px;min-height:112px}
#t2Banners .t2-b27-label b{font-size:13px;letter-spacing:.04em}#t2Banners .t2-b27-label strong{font-size:34px;line-height:1;margin:5px 0}#t2Banners .t2-b27-label span{font-size:11px;font-weight:800}
#t2Banners .t2-b27-strip{display:flex;gap:10px;overflow-x:auto;padding:1px 2px 8px;scrollbar-width:thin}
#t2Banners .t2-b27-choice{position:relative;flex:0 0 178px;height:112px;border:2px solid #d5dee9;border-radius:10px;overflow:hidden;background:#e8eef5;padding:0;cursor:pointer}
#t2Banners .t2-b27-choice.selected{border-color:#2563eb;box-shadow:0 0 0 2px rgba(37,99,235,.14)}#t2Banners .t2-b27-choice.selected:after{content:'✓';position:absolute;right:7px;top:7px;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:#2563eb;color:white;font-weight:900}
#t2Banners .t2-b27-thumb{position:absolute;inset:0;background-color:#dfe7ef;background-repeat:no-repeat}
#t2Banners .t2-b27-name{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(transparent,rgba(0,0,0,.72));color:#fff;padding:22px 8px 7px;font-size:11px;font-weight:800;text-shadow:0 1px 2px #000}
#t2Banners .t2-b27-ok{margin-top:12px;border-radius:12px;background:#eef8f4;color:#166534;padding:12px 14px;font-weight:700}
@media(max-width:650px){#t2Banners .t2-b27-shell{padding:10px}#t2Banners .t2-b27-row{grid-template-columns:88px 1fr}#t2Banners .t2-b27-label{min-height:100px;padding:7px}#t2Banners .t2-b27-choice{flex-basis:152px;height:100px}#t2Banners .t2-b27-label strong{font-size:30px}#t2Banners .t2-b27-head h2{font-size:21px}}
`;document.head.append(s)}
function selection(){try{return JSON.parse(localStorage.getItem(SELECT_KEY)||'{}')}catch{return{}}}
function saveSelection(v){try{localStorage.setItem(SELECT_KEY,JSON.stringify(v))}catch{}}
function renderManager(){const root=document.getElementById('t2Banners');if(!root)return;const sel=selection();root.replaceChildren();const shell=document.createElement('section');shell.className='t2-b27-shell';const head=document.createElement('div');head.className='t2-b27-head';head.innerHTML='<div><h2>Imagens do carrossel</h2><p>27 imagens novas carregadas. Toque em uma imagem para marcar sua preferida.</p></div>';shell.append(head);
 GROUPS.forEach(g=>{const row=document.createElement('div');row.className='t2-b27-row';const lab=document.createElement('div');lab.className='t2-b27-label';lab.style.background=g.color;lab.innerHTML=`<b>BLOCO</b><strong>${g.id}</strong><span>${g.title}</span>`;row.append(lab);const strip=document.createElement('div');strip.className='t2-b27-strip';g.items.forEach(i=>{const b=document.createElement('button');b.type='button';b.className='t2-b27-choice'+(Number(sel[g.id])===i?' selected':'');b.setAttribute('aria-label',`Imagem ${i+1}`);const th=document.createElement('div');th.className='t2-b27-thumb';applySlice(th,i);const nm=document.createElement('span');nm.className='t2-b27-name';nm.textContent=`Imagem ${String(i+1).padStart(2,'0')}`;b.append(th,nm);b.onclick=()=>{sel[g.id]=i;saveSelection(sel);renderManager()};strip.append(b)});row.append(strip);shell.append(row)});
 const ok=document.createElement('div');ok.className='t2-b27-ok';ok.textContent='✓ As 27 imagens novas estão nesta biblioteca e no carrossel principal.';shell.append(ok);root.append(shell)}
function ensureOverlay(){const h=document.querySelector('.scenic-banner');if(!h)return null;h.style.position='relative';h.style.overflow='hidden';let o=document.getElementById('t2New27Overlay');if(!o){o=document.createElement('div');o.id='t2New27Overlay';h.append(o)}return o}
function showSlide(){const o=ensureOverlay();if(!o)return;const slides=[...Array.from({length:27},(_,i)=>({type:'sprite',i})),{type:'cozee'}];const s=slides[current%slides.length];current=(current+1)%slides.length;if(s.type==='sprite'){applySlice(o,s.i);o.setAttribute('aria-label',`Imagem nova ${s.i+1} de 27`)}else{o.style.backgroundImage=`url("${COZEE}")`;o.style.backgroundSize='cover';o.style.backgroundPosition='center';o.style.backgroundRepeat='no-repeat';o.setAttribute('aria-label','Cozee Haus')}}
function start(){if(timer)clearInterval(timer);showSlide();timer=setInterval(showSlide,ROTATE_MS)}
function refresh(){css();renderManager();ensureOverlay();start()}
function boot(){refresh();window.addEventListener('stay:unified-navigation',e=>{if(e.detail?.route==='publicity')setTimeout(renderManager,20)});window.addEventListener('t2-banners-updated',()=>{setTimeout(()=>{renderManager();ensureOverlay()},20)});const mo=new MutationObserver(()=>{if(document.querySelector('.scenic-banner')&&!document.getElementById('t2New27Overlay'))ensureOverlay()});mo.observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();