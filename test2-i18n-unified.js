(()=>{'use strict';
const K='system-control-test2-suite-v1';
const LANGS=['pt-BR','en','es','fr','de','it','pt-PT','zh-CN','ja','ko'];
const P={
properties:['Propriedades / Proprietários','Properties / Owners','Propiedades / Propietarios','Propriétés / Propriétaires','Objekte / Eigentümer','Proprietà / Proprietari','Propriedades / Proprietários','房产 / 业主','物件 / オーナー','숙소 / 소유자'],
expenses:['Despesas / Receitas adicionais','Expenses / Additional income','Gastos / Ingresos adicionales','Dépenses / Revenus supplémentaires','Ausgaben / Zusätzliche Einnahmen','Spese / Entrate aggiuntive','Despesas / Receitas adicionais','支出 / 额外收入','経費 / 追加収入','지출 / 추가 수입'],
settings:['Configurações / Central de Atendimento','Settings / Support Center','Configuración / Centro de Atención','Paramètres / Centre d’assistance','Einstellungen / Support-Center','Impostazioni / Centro Assistenza','Configurações / Centro de Atendimento','设置 / 客服中心','設定 / サポートセンター','설정 / 고객 지원 센터'],
share:['Compartilhar página','Share page','Compartir página','Partager la page','Seite teilen','Condividi pagina','Partilhar página','分享页面','ページを共有','페이지 공유'],
plans:['Planos & Pagamentos','Plans & Payments','Planes y Pagos','Forfaits et Paiements','Pläne & Zahlungen','Piani e Pagamenti','Planos e Pagamentos','套餐与付款','プランと支払い','요금제 및 결제'],
publicity:['Publicidade','Advertising','Publicidad','Publicité','Werbung','Pubblicità','Publicidade','广告','広告','광고'],
logs:['Logs de Acessos','Access Logs','Registros de Acceso','Journaux d’accès','Zugriffsprotokolle','Registri Accessi','Registos de Acesso','访问日志','アクセスログ','접속 로그'],
admins:['Administradores','Administrators','Administradores','Administrateurs','Administratoren','Amministratori','Administradores','管理员','管理者','관리자'],
admin:['Administrador','Administrator','Administrador','Administrateur','Administrator','Amministratore','Administrador','管理员','管理者','관리자'],
owner:['Proprietário','Owner','Propietario','Propriétaire','Eigentümer','Proprietario','Proprietário','业主','オーナー','소유자'],
propertyUnit:['Propriedade / unidade','Property / unit','Propiedad / unidad','Propriété / unité','Objekt / Einheit','Proprietà / unità','Propriedade / unidade','房产 / 单元','物件 / ユニット','숙소 / 유닛'],
month:['Mês','Month','Mes','Mois','Monat','Mese','Mês','月份','月','월'],
year:['Ano','Year','Año','Année','Jahr','Anno','Ano','年份','年','연도'],
allAdmins:['Todos os administradores','All administrators','Todos los administradores','Tous les administrateurs','Alle Administratoren','Tutti gli amministratori','Todos os administradores','所有管理员','すべての管理者','모든 관리자'],
allOwners:['Todos os proprietários','All owners','Todos los propietarios','Tous les propriétaires','Alle Eigentümer','Tutti i proprietari','Todos os proprietários','所有业主','すべてのオーナー','모든 소유자'],
allProps:['Todas as propriedades/unidades','All properties/units','Todas las propiedades/unidades','Toutes les propriétés/unités','Alle Objekte/Einheiten','Tutte le proprietà/unità','Todas as propriedades/unidades','所有房产/单元','すべての物件/ユニット','모든 숙소/유닛'],
allMonths:['Todos os meses','All months','Todos los meses','Tous les mois','Alle Monate','Tutti i mesi','Todos os meses','所有月份','すべての月','모든 월'],
activeAdmins:['Administradores ativos','Active administrators','Administradores activos','Administrateurs actifs','Aktive Administratoren','Amministratori attivi','Administradores ativos','活跃管理员','有効な管理者','활성 관리자'],
activeOwners:['Proprietários ativos','Active owners','Propietarios activos','Propriétaires actifs','Aktive Eigentümer','Proprietari attivi','Proprietários ativos','活跃业主','有効なオーナー','활성 소유자'],
activeProps:['Propriedades ativas','Active properties','Propiedades activas','Propriétés actives','Aktive Objekte','Proprietà attive','Propriedades ativas','活跃房产','有効な物件','활성 숙소'],
gross:['Receita bruta','Gross revenue','Ingresos brutos','Revenu brut','Bruttoumsatz','Ricavi lordi','Receita bruta','总收入','総収益','총수익'],
expense:['Despesas','Expenses','Gastos','Dépenses','Ausgaben','Spese','Despesas','支出','経費','지출'],
commission:['Comissão','Commission','Comisión','Commission','Provision','Commissione','Comissão','佣金','手数料','수수료'],
net:['Repasse líquido','Net payout','Pago neto','Versement net','Nettoauszahlung','Pagamento netto','Repasse líquido','净结算','純支払額','순지급액'],
selectedPeriod:['período selecionado','selected period','período seleccionado','période sélectionnée','ausgewählter Zeitraum','periodo selezionato','período selecionado','所选期间','選択期間','선택 기간'],
revExp:['Receitas x Despesas','Revenue x Expenses','Ingresos x Gastos','Revenus x Dépenses','Einnahmen x Ausgaben','Ricavi x Spese','Receitas x Despesas','收入 x 支出','収益 x 経費','수익 x 지출'],
dist:['Distribuição das Despesas','Expense distribution','Distribución de gastos','Répartition des dépenses','Ausgabenverteilung','Distribuzione delle spese','Distribuição das Despesas','支出分布','経費分布','지출 분포'],
lang:['Idioma','Language','Idioma','Langue','Sprache','Lingua','Idioma','语言','言語','언어'],
superPanel:['Painel do Super Administrador','Super Administrator Dashboard','Panel del Superadministrador','Tableau de bord Super Administrateur','Superadministrator-Dashboard','Dashboard Super Amministratore','Painel do Super Administrador','超级管理员面板','スーパー管理者ダッシュボード','슈퍼 관리자 대시보드'],
selectRotation:['Selecionar imagens da rotação','Select rotation images','Seleccionar imágenes de rotación','Sélectionner les images de rotation','Rotationsbilder auswählen','Seleziona immagini della rotazione','Selecionar imagens da rotação','选择轮播图片','ローテーション画像を選択','회전 이미지 선택'],
bannersAdvertising:['Banners e publicidade','Banners and advertising','Banners y publicidad','Bannières et publicité','Banner und Werbung','Banner e pubblicità','Banners e publicidade','横幅与广告','バナーと広告','배너 및 광고']
};
function lang(){try{return JSON.parse(localStorage.getItem(K)||'{}').language||'pt-BR'}catch{return'pt-BR'}}
function ix(){const i=LANGS.indexOf(lang());return i<0?0:i}
function phraseFor(text){for(const vals of Object.values(P)){const j=vals.indexOf(text);if(j>=0)return vals[ix()]}return null}
function translateTextNode(n){const raw=n.nodeValue||'',t=raw.trim();if(!t)return;const x=phraseFor(t);if(!x||x===t)return;const a=raw.slice(0,raw.indexOf(t)),b=raw.slice(raw.indexOf(t)+t.length);n.nodeValue=a+x+b}
function translateElement(el){if(!el||['SCRIPT','STYLE','NOSCRIPT'].includes(el.tagName))return;const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())translateTextNode(n);el.querySelectorAll?.('option').forEach(o=>{const x=phraseFor(o.textContent.trim());if(x)o.textContent=x});['placeholder','aria-label','title'].forEach(attr=>el.querySelectorAll?.(`[${attr}]`).forEach(e=>{const v=e.getAttribute(attr)?.trim(),x=v&&phraseFor(v);if(x)e.setAttribute(attr,x)}))}
function setButton(route,key){const text=P[key][ix()];document.querySelectorAll(`.t2-pro-menu [data-route="${route}"],.t2-pro-mobilebar [data-route="${route}"]`).forEach(b=>{[...b.childNodes].filter(n=>n.nodeType===3).forEach(n=>n.remove());b.append(document.createTextNode(text))})}
function apply(){document.documentElement.lang=lang();setButton('properties','properties');setButton('expenses','expenses');setButton('settings','settings');setButton('plans','plans');setButton('publicity','publicity');setButton('logs','logs');setButton('admins','admins');translateElement(document.body);const sh=document.querySelector('#t2PageShareBar button');if(sh)sh.textContent='↗ '+P.share[ix()]}
function boot(){apply();['stay:language-change','stay:unified-navigation','t2-banners-updated'].forEach(ev=>window.addEventListener(ev,()=>requestAnimationFrame(apply)));document.addEventListener('change',e=>{if(['t2AppLanguage','t2V2Language'].includes(e.target?.id))requestAnimationFrame(apply)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();