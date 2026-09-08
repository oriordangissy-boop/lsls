(() => {
'use strict';
const records=window.PASSPORT_REGISTRY,units=window.TIMEPIECE_UNITS||[],config=window.PASSPORT_CONFIG;
const picker=document.querySelector('#record-picker'),mode=document.querySelector('#label-mode'),unitPicker=document.querySelector('#unit-picker'),base=document.querySelector('#public-url'),status=document.querySelector('#studio-status'),output=document.querySelector('#label-output'),print=document.querySelector('#print-button'),download=document.querySelector('#download-button');
const params=new URLSearchParams(location.search),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let svg='',filename='';
picker.innerHTML=records.map(r=>'<option value="'+esc(r.product.model)+'">'+esc(r.product.model+' · '+r.product.name.split(' · ')[1])+'</option>').join('');
const initialUnit=units.find(u=>u.token===params.get('v'));
if(['MW-30038G.02','ZY-3038L.02'].includes(params.get('sku')))params.set('sku','ZY-3038LB.02');
const initial=records.find(r=>r.product.model===(initialUnit?.model||params.get('sku')));
if(initial)picker.value=initial.product.model;
base.value=config.publicBaseUrl||'';
function fillUnits(){
 unitPicker.innerHTML=units.filter(u=>u.model===picker.value).map(u=>'<option value="'+u.token+'">第 '+String(u.number).padStart(2,'0')+' / '+u.total+' 枚 · '+u.serial+'</option>').join('');
}
fillUnits();if(initialUnit)unitPicker.value=initialUnit.token;
function render(){
 const r=records.find(x=>x.product.model===picker.value),isUnit=mode.value==='unit',u=units.find(x=>x.token===unitPicker.value&&x.model===r.product.model);
 document.querySelector('#unit-field').hidden=!isUnit;
 svg='';filename='';print.disabled=download.disabled=true;
 if(isUnit&&!u){output.innerHTML='';status.textContent='尚未加载已签发编号，请刷新页面。';return;}
 const serial=isUnit?u.serial:r.product.model;
 const edition=isUnit?'第 '+String(u.number).padStart(2,'0')+' / '+u.total+' 枚':'全球限量 '+r.product.editionTotal+' 枚';
 output.innerHTML='<article class="print-label"><div class="label-copy"><span class="label-brand">Timepiece</span><div><small>品牌联名定制官方价 / CNY</small><strong class="label-price-value">¥ '+r.price.amount.toLocaleString('zh-CN')+'</strong></div><span class="label-unit-edition">'+edition+'</span><code class="label-serial">'+esc(serial)+'</code><span class="label-demo">销售方限量编号资料</span></div><div class="label-qr-box" id="qr-output">填写网站地址<br>生成二维码</div></article>';
 try{
  const url=new URL(base.value.trim());
  const local=['localhost','127.0.0.1','[::1]'].includes(url.hostname);
  if(url.protocol!=='https:'&&!(local&&url.protocol==='http:'))throw new Error('请输入正式 HTTPS 网站地址。');
  if(url.username||url.password||url.search||url.hash||url.hostname.endsWith('.invalid'))throw new Error('地址不能包含账号、密码、查询参数或片段。');
  if(!url.pathname.endsWith('/'))url.pathname+='/';
  url.searchParams.set(isUnit?'v':'sku',isUnit?u.token:r.product.model);
  if(url.href.length>300)throw new Error('网址过长，请使用较短的正式域名。');
  const qr=qrcode(0,'H');qr.addData(url.href);qr.make();
  svg=qr.createSvgTag({cellSize:4,margin:16,scalable:true});filename=serial;
  document.querySelector('#qr-output').innerHTML=svg;
  print.disabled=download.disabled=false;
  status.textContent=(local?'本机测试地址，不能用于对外吊牌。':'二维码指向：'+url.href)+(isUnit?' 请将 '+serial+' 与实物逐只对应，勿重复贴牌。':' 这是款式公用码，不对应单只实物。');
 }catch(e){status.textContent=e.message;}
}
picker.addEventListener('change',()=>{fillUnits();render();});mode.addEventListener('change',render);unitPicker.addEventListener('change',render);
base.addEventListener('input',()=>{svg='';print.disabled=download.disabled=true;const qr=document.querySelector('#qr-output');if(qr)qr.textContent='请更新二维码';status.textContent='点击“更新二维码”应用新地址。';});
document.querySelector('#generate-button').onclick=render;
print.onclick=()=>{if(svg)window.print();};
download.onclick=()=>{if(!svg)return;const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'})),link=document.createElement('a');link.href=url;link.download=filename+'.svg';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
render();
})();
