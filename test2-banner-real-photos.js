(()=>{'use strict';
const SPRITE='https://res.cloudinary.com/nva576pg/image/upload/v1788923834/banner-sprite-27.jpg';
const COZEE='./assets/banners/cozee-haus-comfort-details.svg?v=20260909-cozee-keep';
const ROTATE=6000;
const GROUPS=[
 {id:1,title:'CIDADES E PRÉDIOS',color:'#0f3d73',items:[0,1,2,3,4,5]},
 {id:2,title:'PRAIAS',color:'#137a54',items:[6,7,8,9,10]},
 {id:3,title:'CURITIBA E NATUREZA',color:'#9a4f10',items:[11,12,13,14,15,16]},
 {id:4,title:'FAZENDA E CAMPO',color:'#5e2a84',items:[17,18,19,20,21]},
 {id:5,title:'PRÉDIOS E ARQUITETURA',color:'#08738b',items:[22,23,24,25,26]}
];
let idx=-1,timer=null;
const pct=i=>`${(i/26)*100}%`;
function css(){if(document.getElementById('t2DeepBanner27Css'))return;const s=document.createElement('style');s.id='t2DeepBanner27Css';s.textContent=`
#t2Banners .t2-bm-shell{background:#f8fbff;border:1px solid #dce7f3;border-radius:18px;padding:18px}
#t2Banners .t2-bm-head{display:flex;align-items:center;gap:14px;margin-bottom:16px}
#t2Banners .t2-bm-title{margin:0;font-size:25px;color:#102a4a}
#t2Banners .t2-bm-sub{margin:3px 0 0;color:#52657b}
#t2Banners .t2-bm-row{display:grid;grid-template-columns:110px repeat(6,minmax(0,1fr));gap:10px;margin-bottom:12px;overflow-x:auto}
#t2Banners .t2-bm-block{border-radius:12px;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:12px 8px;min-height:138px}
#t2Banners .t2-bm-block b{font-size:16px}#t2Banners .t2-bm-block strong{font-size:42px;line-height:1;margin:6px 0}#t2Banners .t2-bm-block span{font-size:12px;font-weight:800}
#t2Banners .t2-banner-choice{position:relative;border:2px solid #d5dee9;border-radius:10px;overflow:hidden;background:#eef2f7;height:138px;min-width:160px}
#t2Banners .t2-banner-choice .t2-sprite-frame{position:absolute;inset:0;background-image:url('${SPRITE}');background-repeat:no-repeat;background-size:100% 2700%;background-position-x:center}
#t2Banners .t2-banner-choice small{position:absolute;left:7px;bottom:6px;background:rgba(0,0,0,.58);color:#fff;border-radius:999px;padding:3px 7px;font-size:10px;font-weight:800;z-index:2}
.scenic-banner #t2DeepBanner27Overlay{position:absolute;inset:0;z-index:80;background-repeat:no-repeat;background-position:center;background-color:#eef2f7}
@media(max-width:650px){#t2Banners .t2-bm-shell{padding:12px}#t2Banners .t2-bm-row{grid-template-columns:82px repeat(6,160px)}#t2Banners .t2-banner-choice,#t2Banners .t2-bm-block{height:120px;min-height:120px}}
`;document.head.append(s)}
function frame(i){const f=document.createElement('div');f.className='t2-sprite-frame';f.style.backgroundPositionY=pct(i);return f}
function renderLibrary(){const root=document.getElementById('t2Banners');if(!root)return;root.replaceChildren();const shell=document.createElement('section');shell.className='t2-bm-shell';const head=document.createElement('div');head.className='t2-bm-head';head.innerHTML='<div style="font-size:25px">🖼️</div><div><h2 class="t2-bm-title">Biblioteca de imagens</h2><p class="t2-bm-sub">Cozee Haus + 27 novas imagens no carrossel principal.</p></div>';shell.append(head);GROUPS.forEach(g=>{const row=document.createElement('div');row.className='t2-bm-row';const label=document.createElement('div');label.className='t2-bm-block';label.style.background=g.color;label.innerHTML=`<b>BLOCO</b><strong>${g.id}</strong><span>${g.title}</span>`;row.append(label);g.items.forEach(i=>{const card=document.createElement('div');card.className='t2-banner-choice';card.append(frame(i));const n=document.createElement('small');n.textContent=`Imagem ${String(i+1).padStart(2,'0')}`;card.append(n);row.append(card)});shell.append(row)});root.append(shell);window.dispatchEvent(new Event('t2-banners-updated'))}
function overlay(){const h=document.querySelector('.scenic-banner');if(!h)return null;h.style.position='relative';let el=document.getElementById('t2DeepBanner27Overlay');if(!el){el=document.createElement('div');el.id='t2DeepBanner27Overlay';h.append(el)}return el}
function show(n){const el=overlay();if(!el)return;if(n===0){el.style.backgroundImage=`url("${COZEE}")`;el.style.backgroundSize='contain';el.style.backgroundPosition='center';}else{const i=n-1;el.style.backgroundImage=`url("${SPRITE}")`;el.style.backgroundSize='100% 2700%';el.style.backgroundPosition=`center ${pct(i)}`;}}
function tick(){idx=(idx+1)%28;show(idx)}
function start(){if(timer)clearInterval(timer);idx=-1;tick();timer=setInterval(tick,ROTATE)}
function refreshPublicity(){requestAnimationFrame(()=>requestAnimationFrame(renderLibrary))}
function boot(){css();renderLibrary();start();window.addEventListener('stay:unified-navigation',e=>{if(e.detail?.route==='publicity')refreshPublicity()});window.addEventListener('stay:language-change',refreshPublicity);document.addEventListener('change',e=>{if(['t2AppLanguage','t2V2Language'].includes(e.target?.id))refreshPublicity()});window.addEventListener('t2-banners-updated',()=>{const o=document.getElementById('t2DeepBanner27Overlay');if(o&&!o.isConnected)start()})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();