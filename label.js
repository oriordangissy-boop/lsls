(() => {
"use strict";
const records=window.PASSPORT_REGISTRY, config=window.PASSPORT_CONFIG;
const picker=document.querySelector("#record-picker"),mode=document.querySelector("#label-mode"),base=document.querySelector("#public-url"),status=document.querySelector("#studio-status"),output=document.querySelector("#label-output"),print=document.querySelector("#print-button"),download=document.querySelector("#download-button");
const params=new URLSearchParams(location.search);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let svg="",currentUrl="";
picker.innerHTML=records.map(r=>'<option value="'+esc(r.token)+'">'+esc(r.product.model+" · "+r.product.name.split(" · ")[1])+'</option>').join("");
const initial=records.find(r=>r.token===params.get("v")||r.product.model===params.get("sku"));
if(initial)picker.value=initial.token;
if(params.has("v"))mode.value="sample";
base.value=config.publicBaseUrl||(location.protocol==="http:"||location.protocol==="https:"?new URL("./",location.href).href:"");
function render(){
const r=records.find(x=>x.token===picker.value),sample=mode.value==="sample";
svg="";currentUrl="";print.disabled=download.disabled=true;
output.innerHTML='<article class="print-label"><div class="label-copy"><span class="label-brand">Timepiece</span><div><small>销售方公示价 / CNY</small><strong class="label-price-value">¥ '+r.price.amount.toLocaleString("zh-CN")+'</strong></div><code class="label-serial">'+esc(sample?r.product.visibleSerial:r.product.model)+'</code><span class="label-demo">'+(sample?'编号样张 · 未绑定实物':'款式价格标签')+'</span></div><div class="label-qr-box" id="qr-output">填写网站地址<br>生成二维码</div></article>';
try{
 const url=new URL(base.value.trim());
 const local=url.hostname==="localhost"||url.hostname==="127.0.0.1"||url.hostname==="[::1]";
 if(url.protocol!=="https:"&&!(local&&url.protocol==="http:"))throw new Error("请输入正式 HTTPS 网站地址。");
 if(url.username||url.password||url.search||url.hash||url.hostname.endsWith(".invalid"))throw new Error("地址不能包含账号、密码、查询参数或片段。");
 if(!url.pathname.endsWith("/")&&!url.pathname.endsWith(".html"))url.pathname+="/";
 const target=new URL("index.html",url);
 target.searchParams.set(sample?"v":"sku",sample?r.token:r.product.model);
 currentUrl=target.href;
 if(currentUrl.length>300)throw new Error("网址过长，请使用较短的正式域名。");
 const qr=qrcode(0,"M");qr.addData(currentUrl);qr.make();
 svg=qr.createSvgTag({cellSize:4,margin:16,scalable:true});
 document.querySelector("#qr-output").innerHTML=svg;
 print.disabled=download.disabled=false;
 status.textContent=(local?"本机测试地址，仅此电脑可访问；对外打印前请替换为已部署的 HTTPS 地址。":"二维码指向："+currentUrl)+(sample?" 此编号仅为样张。":"");
}catch(error){status.textContent=base.value.trim()?error.message:"请先填写网站部署地址。"; }
}
picker.addEventListener("change",render);mode.addEventListener("change",render);
base.addEventListener("input",()=>{svg="";print.disabled=download.disabled=true;document.querySelector("#qr-output").textContent="地址已修改，请更新二维码";status.textContent="点击“更新二维码”应用新地址。";});
document.querySelector("#generate-button").onclick=render;
print.onclick=()=>{if(svg)window.print();};
download.onclick=()=>{if(!svg)return;const r=records.find(x=>x.token===picker.value),blob=new Blob([svg],{type:"image/svg+xml"}),link=document.createElement("a"),url=URL.createObjectURL(blob);link.href=url;link.download=r.product.model+"-"+mode.value+"-qr.svg";link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
render();
})();
