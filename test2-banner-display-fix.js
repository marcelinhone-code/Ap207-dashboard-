(()=>{'use strict';
const STYLE_ID='t2BannerDisplayFixCss';
function css(){if(document.getElementById(STYLE_ID))return;const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
.scenic-banner.t2-ad-full{position:relative!important;background:#e9eef5!important;overflow:hidden!important}
.scenic-banner.t2-ad-full::before,.scenic-banner.t2-ad-full::after{display:none!important;content:none!important}
.scenic-banner .t2-scenic-ad-overlay{z-index:20!important;background-size:cover!important;background-position:center center!important;background-repeat:no-repeat!important;background-color:#e9eef5!important;opacity:1!important;transition:none!important;filter:none!important}
#t2RealBannerOverlay{z-index:35!important;background-size:cover!important;background-position:center center!important;background-repeat:no-repeat!important}
#t2DeepBanner27Overlay{z-index:80!important}
@media(max-width:650px){.scenic-banner .t2-scenic-ad-overlay,#t2RealBannerOverlay,#t2DeepBanner27Overlay{background-position:center center!important}}
`;document.head.append(s)}
function realPhotos(){document.querySelectorAll('script[data-t2-real-banner-photos]').forEach(x=>x.remove());const s=document.createElement('script');s.src='./test2-banner-real-photos.js?v=20260909-deep27-v2';s.async=false;s.dataset.t2RealBannerPhotos='1';document.body.append(s)}
function boot(){css();realPhotos()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();