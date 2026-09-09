(()=>{'use strict';
const K='system-control-test2-suite-v1',P='system-control-test2-banner-picks-v1',ROTATE=6000;
const C='https://commons.wikimedia.org/wiki/Special:FilePath/';
const F=[
['Dubai skyline (4175218115).jpg','Dubai Skyline, Dubai.jpg','A view of Dubai%27s skyline.jpg','Dubai World Trade Centre and skyline.jpg','Dubai Skyline.JPG'],
['Miami skyline (1).jpg','Skyline over Miami beach.jpg','Skyline over Miami beach USA.jpg','Miami skyline from Miami Beach 2006 by Averette101.jpg','Miami skyline.jpg'],
['Curitiba jardim botanico.jpg','JardimBotanicoCuritiba.jpg','Jardim Botânico de Curitiba (1).jpg','Jardim Botânico de Curitiba (4).jpg','JBotanicoCuritiba.JPG'],
['Fazenda Serra da Natureza.jpg','Fazenda Serra da Natureza 2.jpg','Agriculture in Brazil.jpg','Cupinzeiro ao fundo na área rural de Itaúna, MG, Brasil..jpg','Coffee farmer in Brazil.jpg'],
['São Paulo Skyline.jpg','São-Paulo Skyline.jpg','São Paulo skyline city.jpg','Skyline of Sao Paulo.jpg','Parque Ibirapuera with the skyline of São Paulo in the background.jpg']
];
const N=[['Dubai','Dubai','Dubai','Dubai','Dubai'],['Miami Beach','Miami Beach','Miami Beach','Miami Beach','Miami'],['Curitiba','Curitiba','Curitiba','Curitiba','Curitiba'],['Fazenda','Fazenda','Agricultura','Campo','Fazenda'],['São Paulo','São Paulo','São Paulo','São Paulo','São Paulo']];
const enc=s=>s.split('/').map(encodeURIComponent).join('/');
const photo=(b,i)=>C+enc(decodeURIComponent(F[b-1][i]))+'?width=1600';
const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k)||'null')||f}catch{return f}},write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function picks(){const p=read(P,{1:0,2:0,3:0,4:0,5:0});for(let b=1;b<=5;b++)if(!Number.isInteger(p[b])||p[b]<0||p[b]>4)p[b]=0;return p}
function syncStore(){const s=read(K,{}),p=picks();if(!Array.isArray(s.banners))s.banners=[];s.banners=s.banners.filter(x=>!/^t2-real-[1-5]$/.test(String(x?.id||'')));for(let b=1;b<=5;b++){const i=p[b];s.banners.push({id:`t2-real-${b}`,title:N[b-1][i],subtitle:'',imageUrl:photo(b,i),active:true,placement:'top',fullArtwork:true,intervalSeconds:6})}write(K,s)}
function patchCards(){const root=document.getElementById('t2Banners');if(!root)return;const rows=[...root.querySelectorAll('.t2-bm-row')];rows.slice(0,5).forEach((row,bi)=>{[...row.querySelectorAll('.t2-banner-choice')].slice(0,5).forEach((btn,i)=>{let im=btn.querySelector('img');if(!im){im=document.createElement('img');btn.prepend(im)}im.src=photo(bi+1,i);im.alt=N[bi][i];im.loading='eager';im.referrerPolicy='no-referrer';im.onerror=()=>{im.removeAttribute('src');im.alt='Imagem indisponível'};})})}
let idx=-1,timer=null,overlay=null;
function selected(){const p=picks();return [1,2,3,4,5].map(b=>({id:`t2-real-${b}`,url:photo(b,p[b])}))}
function show(){const h=document.querySelector('.scenic-banner');if(!h)return;const a=selected();idx=(idx+1)%a.length;let el=document.getElementById('t2RealBannerOverlay');if(!el){el=document.createElement('div');el.id='t2RealBannerOverlay';el.style.cssText='position:absolute;inset:0;z-index:35;background-position:center;background-size:cover;background-repeat:no-repeat;background-color:#eef2f7;';h.style.position='relative';h.append(el)}el.style.backgroundImage=`url("${a[idx].url}")`;overlay=el}
function start(){clearInterval(timer);show();timer=setInterval(show,ROTATE)}
function afterRender(){queueMicrotask(()=>{patchCards();syncStore()})}
function boot(){syncStore();patchCards();start();document.addEventListener('click',e=>{if(e.target.closest('#t2Banners .t2-banner-choice,#t2Banners .t2-bm-save'))afterRender()},true);window.addEventListener('stay:unified-navigation',e=>{if(e.detail?.route==='publicity')afterRender()});window.addEventListener('stay:language-change',afterRender);document.addEventListener('change',e=>{if(['t2AppLanguage','t2V2Language'].includes(e.target?.id))afterRender()})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();