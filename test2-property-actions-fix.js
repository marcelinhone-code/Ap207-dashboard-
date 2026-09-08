(()=>{'use strict';
const $=id=>document.getElementById(id);
function css(){if($('t2PropertyActionsFixCss'))return;const s=document.createElement('style');s.id='t2PropertyActionsFixCss';s.textContent=`
#t2ProfessionalProperties>.t2pm-toolbar{display:none!important}
#t2ProfessionalOwners>.t2pm-toolbar{display:none!important}
.property-manager-actions #newPropertyButton{display:none!important}
#t2ucPropertiesHead .t2uc-actions{display:flex!important}
`;document.head.append(s)}
function showProperties(){window.Test2Unified?.show?.('properties',false)}
function openProperty(){
  showProperties();
  try{window.SystemControlPropertyManager?.install?.()}catch{}
  const native=$('newPropertyButton');
  if(native)native.click();
  showProperties();
  const sec=$('propertySettings'),form=$('newPropertyForm');
  if(sec){sec.hidden=false;sec.style.removeProperty('display')}
  if(form){form.hidden=false;form.style.removeProperty('display');form.scrollIntoView({behavior:'auto',block:'start'});requestAnimationFrame(()=>$('newPropertyOwnerName')?.focus())}
}
function openOwner(){
  showProperties();
  const native=document.querySelector('#t2ProfessionalOwners>.t2pm-toolbar button');
  if(native)native.click();
  const box=$('t2OwnerCreateBox');
  if(box){box.hidden=false;box.style.removeProperty('display');box.scrollIntoView({behavior:'auto',block:'start'});requestAnimationFrame(()=>box.querySelector('#t2OwnerName')?.focus())}
}
function intercept(e){const b=e.target.closest?.('#t2ucPropertiesHead [data-t2uc-action]');if(!b)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();if(b.dataset.t2ucAction==='new-property')openProperty();else if(b.dataset.t2ucAction==='new-owner')openOwner()}
function boot(){css();document.addEventListener('click',intercept,true);window.Test2PropertyActions={openProperty,openOwner}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();