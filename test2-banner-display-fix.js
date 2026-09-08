(()=>{'use strict';
const STYLE_ID='t2BannerDisplayFixCss';
function css(){if(document.getElementById(STYLE_ID))return;const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
.scenic-banner.t2-ad-full{position:relative!important;background:#e9eef5!important;overflow:hidden!important}
.scenic-banner.t2-ad-full::before,.scenic-banner.t2-ad-full::after{display:none!important;content:none!important}
.scenic-banner .t2-scenic-ad-overlay{z-index:20!important;background-size:contain!important;background-position:center center!important;background-repeat:no-repeat!important;background-color:#e9eef5!important;opacity:1!important;transition:none!important;filter:none!important}
@media(max-width:650px){.scenic-banner .t2-scenic-ad-overlay{background-size:contain!important;background-position:center center!important}}
`;document.head.append(s)}
function boot(){css()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();