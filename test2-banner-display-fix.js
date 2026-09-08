(()=>{'use strict';
const STYLE_ID='t2BannerDisplayFixCss';
function css(){if(document.getElementById(STYLE_ID))return;const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
.scenic-banner.t2-ad-full{position:relative!important;background-color:#e9eef5!important;background-image:var(--t2-last-good-banner,none)!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}
.scenic-banner.t2-ad-full::before{content:""!important;display:block!important;position:absolute!important;inset:-12px!important;background-image:var(--t2-current-banner,var(--t2-last-good-banner,none))!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important;filter:blur(14px) brightness(.82)!important;transform:scale(1.06)!important;opacity:.7!important;z-index:18!important;pointer-events:none!important}
.scenic-banner.t2-ad-full::after{content:""!important;display:block!important;position:absolute!important;inset:0!important;background:rgba(255,255,255,.08)!important;z-index:19!important;pointer-events:none!important}
.scenic-banner .t2-scenic-ad-overlay{z-index:20!important;background-size:contain!important;background-position:center center!important;background-repeat:no-repeat!important;background-color:transparent!important;opacity:1!important;transition:none!important;filter:none!important}
.scenic-banner .t2-scenic-ad-overlay.t2-image-ready{opacity:1!important}
@media(max-width:650px){.scenic-banner .t2-scenic-ad-overlay{background-size:contain!important;background-position:center center!important}}
`;document.head.append(s)}
function urlFromBackground(bg){const m=String(bg||'').match(/^url\(["']?(.*?)["']?\)$/);return m?m[1]:''}
let lastGood='';
function prepareOverlay(el){if(!el)return;const host=el.closest('.scenic-banner');if(!host)return;const src=urlFromBackground(el.style.backgroundImage||getComputedStyle(el).backgroundImage);if(!src){el.classList.add('t2-image-ready');return}const cssUrl=`url("${src.replace(/"/g,'')}")`;lastGood=cssUrl;host.style.setProperty('--t2-current-banner',cssUrl);host.style.setProperty('--t2-last-good-banner',cssUrl);el.classList.add('t2-image-ready')}
function scan(){css();document.querySelectorAll('.scenic-banner .t2-scenic-ad-overlay').forEach(prepareOverlay)}
function boot(){scan();new MutationObserver(m=>{for(const x of m){for(const n of x.addedNodes||[]){if(n.nodeType===1&&(n.matches?.('.t2-scenic-ad-overlay')||n.querySelector?.('.t2-scenic-ad-overlay'))){scan();return}}}}).observe(document.body,{childList:true,subtree:true});window.addEventListener('t2-banners-updated',scan);window.addEventListener('stay:unified-navigation',scan)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();