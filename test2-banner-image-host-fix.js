(()=>{'use strict';
const K='system-control-test2-suite-v1',PICKS='system-control-test2-banner-picks-v1';
const file=n=>'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(n);
const LIB=[
 [
  ['Dubai',file('Dubai skyline in the evening.jpg')],
  ['Miami',file('Miami, Florida skyline.jpg')],
  ['Nova York',file('NewYorkSkyline.jpg')],
  ['Londres',file("London Skyline seen from the Queen's Walk.jpg")],
  ['Paris',file('Paris Eiffel tower.jpg')]
 ],
 [
  ['Miami Beach',file('Miami beach.jpg')],
  ['Ipanema',file('Ipanema and Leblon as seen from Morro Dois Irmãos, with Lagoa and Cantagalo in the background, Rio de Janeiro, Brazil.jpg')],
  ['Balneário Camboriú',file('Balneario Camboriu Skyline from the Sea 2019.jpg')],
  ['Cancún',file('Cancun Beach (10512978533).jpg')],
  ['Punta Cana',file('Punta Cana (Dominican Republic) banner Beach.jpg')]
 ],
 [
  ['Curitiba',file('Curitiba jardim botanico.jpg')],
  ['Foz do Iguaçu',file('Foz do Iguaçu.jpg')],
  ['Jardim Botânico',file('Jardim Botânico, Curitiba (20240301 185956).jpg')],
  ['Chapada Diamantina',file('Chapada Diamantina, Morro do Chapéu, Cachoeira do Ferro Doido.JPG')],
  ['Fernando de Noronha',file('Fernando de Noronha Conceicao Beach.jpg')]
 ],
 [
  ['Fazenda',file('Horse farm in Kentucky.jpg')],
  ['Campos',file('Horses on Farm at Islington(GN05962).jpg')],
  ['Vinícola',file('Vineyard, Marienthal.jpg')],
  ['Interior',file('German Countryside Farm (9812917116).jpg')],
  ['Lago no Campo',file('Landscape of lake and clouds.jpg')]
 ],
 [
  ['São Paulo',file('Avenue and the downtown skyline of Sao Paulo.jpg')],
  ['Rio de Janeiro',file('High-rise skyline of Rio de Janeiro, Brazil.jpg')],
  ['Brasília',file('Brasilia Skyline.jpg')],
  ['Miami',file('Miami Skyline 09.jpg')],
  ['Dubai',file('Dubai-Skyline-2019.jpg')]
 ]
];
const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k)||'null')||f}catch{return f}},write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function picks(){const p=read(PICKS,{1:0,2:0,3:0,4:0,5:0});for(let i=1;i<=5;i++){if(!Number.isInteger(p[i])||p[i]<0||p[i]>4)p[i]=0}return p}
function syncState(){const s=read(K,{});if(!Array.isArray(s.banners))return;const p=picks();let changed=false;for(let b=1;b<=5;b++){const x=s.banners.find(v=>v?.id===`t2-block-${b}`),item=LIB[b-1][p[b]];if(!x||!item)continue;if(x.title!==item[0]){x.title=item[0];changed=true}if(x.imageUrl!==item[1]){x.imageUrl=item[1];changed=true}if(x.active===false){x.active=true;changed=true}if(x.placement!=='top'){x.placement='top';changed=true}}if(changed)write(K,s)}
function patch(){syncState();const root=document.getElementById('t2Banners');if(!root)return;const blocks=[...root.querySelectorAll('.t2-banner-block')];blocks.forEach((block,bi)=>{const choices=[...block.querySelectorAll('.t2-banner-choice')];choices.forEach((choice,ii)=>{const item=LIB[bi]?.[ii];if(!item)return;const img=choice.querySelector('img'),label=choice.querySelector('span');if(img&&img.src!==item[1]){img.src=item[1];img.alt=item[0]}if(label)label.textContent=item[0];choice.dataset.t2Block=String(bi+1);choice.dataset.t2Index=String(ii)})})}
function choose(block,index){const p=picks();p[block]=index;write(PICKS,p);const s=read(K,{});if(Array.isArray(s.banners)){const x=s.banners.find(v=>v?.id===`t2-block-${block}`),item=LIB[block-1]?.[index];if(x&&item){x.title=item[0];x.imageUrl=item[1];x.active=true;x.placement='top';write(K,s)}}window.dispatchEvent(new Event('t2-banners-updated'))}
document.addEventListener('click',e=>{const choice=e.target.closest?.('.t2-banner-choice[data-t2-block]');if(!choice)return;e.preventDefault();e.stopImmediatePropagation();choose(Number(choice.dataset.t2Block),Number(choice.dataset.t2Index))},true);
window.addEventListener('t2-banners-updated',patch);window.addEventListener('stay:unified-navigation',e=>{if(e.detail?.route==='publicity')patch()});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',patch,{once:true});else patch();
})();