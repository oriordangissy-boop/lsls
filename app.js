(() => {
"use strict";
const items = window.PASSPORT_REGISTRY;
const units = window.TIMEPIECE_UNITS || [];
const config = window.PASSPORT_CONFIG;
const main = document.querySelector("#main");
const params = new URLSearchParams(location.search);
// Preserve previously shared product URLs after the seller's SKU correction.
if(['MW-30038G.02','ZY-3038L.02'].includes(params.get('sku')))params.set('sku','ZY-3038LB.02');
if(['MW-30038G.02','ZY-3038L.02'].includes(params.get('model')))params.set('model','ZY-3038LB.02');
const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
const price = value => "¥ " + Number(value).toLocaleString("zh-CN");
const series = {
"SKELETON SPORT": {name:"镂空运动",label:"SKELETON",copy:"交错线条，构筑有力轮廓。鲜明色彩，让每一次抬腕都自有态度。"},
"SPECTRUM": {name:"光谱色彩",label:"SPECTRUM",copy:"将色彩藏进时间。彩虹表圈与细腻配色，在转腕之间呈现不同光芒。"},
"STEEL DIVER": {name:"经典钢带",label:"CLASSIC",copy:"简洁表盘，搭配利落的金属链节。黑、绿、蓝三种配色，让经典有更多表达。"}
};
const colorNames=["深蓝","橙色","绿色","黑色","红色","白色","红色","蓝色","拼色","绿色","粉色","黑色","绿色","蓝色"];
const colors=["#233886","#ed7b28","#267741","#292625","#b72629","#efeeea","#bf282d","#275ab2","#9870c8","#164f38","#d69da9","#282828","#246f4c","#24619a"];
items.forEach((r,i)=>{ r.color=colorNames[i];r.swatch=colors[i];r.limit=r.product.editionTotal;r.index=i;});
const href = r => "?sku=" + encodeURIComponent(r.product.model);
const image = (r, cls="",lazy=true)=>'<span class="photo-frame '+cls+'" data-model="'+esc(r.product.model)+'"><img src="'+esc(r.product.image)+'" alt="'+esc(r.product.name)+'" width="450" height="600" '+(lazy?'loading="lazy"':'fetchpriority="high"')+'></span>';
const arrow = '<span aria-hidden="true">↗</span>';
const card = r => '<a class="product-card" href="'+href(r)+'"><div class="product-photo">'+image(r)+'<span class="card-ref">'+esc(r.product.model)+'</span><span class="card-open" aria-hidden="true">↗</span></div><div class="card-info"><span class="overline">'+series[r.product.collection].label+'</span><h3>'+esc(r.product.name)+'</h3><span class="card-color"><i style="--swatch:'+r.swatch+'"></i>'+r.color+'</span><p>'+price(r.price.amount)+'<small>品牌联名定制官方价</small></p></div></a>';
function toast(message){const t=document.querySelector("#toast");t.textContent=message;t.classList.add("visible");clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove("visible"),2500);}
async function copy(text){try{await navigator.clipboard.writeText(text);toast("已复制");}catch{toast("浏览器未允许复制，请长按或选中内容复制。");}}
function renderHome(){
 main.innerHTML='<section class="hero"><div class="hero-copy"><span class="overline">THE WATCH COLLECTION</span><h1>时间，<br>自有锋芒。</h1><p>从镂空轮廓到流动色彩，<br>探索属于你的腕间表达。</p><a class="button light" href="#collection">探索腕表系列 '+arrow+'</a><span class="hero-caption">SKELETON SPORT / ZY-3038LB.01</span></div><a class="hero-visual" href="'+href(items[0])+'" aria-label="探索深蓝镂空运动腕表"><span class="hero-word" aria-hidden="true">SKELETON</span>'+image(items[0],"hero-watch",false)+'<span class="visual-note">镂空运动系列 <span>01 / 06 ↗</span></span></a></section>'+
 '<div class="collection-nav"><a href="#collection" data-series="all">全部腕表 <sup>14</sup></a><a href="#collection" data-series="SKELETON SPORT">镂空运动 <sup>06</sup></a><a href="#collection" data-series="SPECTRUM">光谱色彩 <sup>05</sup></a><a href="#collection" data-series="STEEL DIVER">经典钢带 <sup>03</sup></a></div>'+
 '<section class="collection-section wrap" id="collection"><div class="section-title"><div><span class="overline">EXPLORE THE COLLECTION</span><h2>腕表系列</h2></div><p>每一种风格，都是个性的延伸。</p></div><div class="catalog-toolbar"><button class="text-control" id="toggle-filters" aria-expanded="true">筛选条件 <span>−</span></button><span id="result-count" role="status">14 款腕表</span><label class="sort-control">排序方式 <select id="sort"><option value="default">系列推荐</option><option value="model">型号 A—Z</option><option value="color">颜色名称</option></select></label></div><div class="catalog-layout"><aside class="filters" id="filters"><fieldset><legend>腕表系列</legend>'+Object.entries(series).map(([key,s])=>'<label><input type="checkbox" name="series" value="'+key+'"><span>'+s.name+'</span><small>'+items.filter(r=>r.product.collection===key).length+'</small></label>').join('')+'</fieldset><fieldset><legend>颜色</legend>'+[...new Set(colorNames)].map(c=>'<label><input type="checkbox" name="color" value="'+c+'"><span>'+c+'</span></label>').join('')+'</fieldset><button class="text-link" id="clear-filters">清除全部筛选</button></aside><div><div class="product-grid" id="product-grid">'+items.map(card).join('')+'</div><p class="collection-end" id="collection-end">已展示全部 14 款腕表</p></div></div></section>'+
 '<section class="design-section" id="design"><div class="design-image">'+image(items[8])+'<span class="overline">SPECTRUM / ZY-3036LB.03</span></div><div class="design-copy"><span class="overline">A DIFFERENT EXPRESSION</span><h2>不止一种<br>时间的色彩。</h2><p>鲜明的色彩交织，映照每一种心境。<br>探索光谱系列，让日常多一点不同。</p><a class="button dark" href="?collection=SPECTRUM#collection">探索光谱系列 '+arrow+'</a></div></section>'+
 '<section class="service-band wrap"><div><span class="overline">YOUR TIMEPIECE</span><h2>你的腕表，你的记录。</h2><p>查看商品型号、公示价格及对应编号资料。</p></div><a class="button outline" href="?page=lookup">查询腕表编号 '+arrow+'</a></section>';
 const filters=document.querySelector("#filters");
 if(window.matchMedia("(max-width:760px)").matches){filters.hidden=true;document.querySelector('.catalog-layout').classList.add('filters-hidden');const b=document.querySelector('#toggle-filters');b.setAttribute('aria-expanded','false');b.innerHTML='筛选条件 <span>+</span>';}
 function update(){
 const groups=[...document.querySelectorAll('[name="series"]:checked')].map(x=>x.value);
 const chosen=[...document.querySelectorAll('[name="color"]:checked')].map(x=>x.value);
 let filtered=items.filter(r=>(!groups.length||groups.includes(r.product.collection))&&(!chosen.length||chosen.includes(r.color)));
 const order=document.querySelector("#sort").value;
 if(order==="model")filtered.sort((a,b)=>a.product.model.localeCompare(b.product.model));
 if(order==="color")filtered.sort((a,b)=>a.color.localeCompare(b.color,"zh-CN"));
 document.querySelector("#product-grid").innerHTML=filtered.length?filtered.map(card).join(''):'<div class="no-results"><h3>没有符合条件的腕表</h3><p>试试减少筛选条件，或清除全部筛选。</p></div>';
 document.querySelector("#result-count").textContent=filtered.length+" 款腕表";
 document.querySelector("#collection-end").textContent=filtered.length?"已展示 "+filtered.length+" 款腕表":"";
 }
 filters.addEventListener("change",update);document.querySelector("#sort").addEventListener("change",update);
 document.querySelector("#clear-filters").onclick=()=>{filters.querySelectorAll("input").forEach(x=>x.checked=false);update();};
 document.querySelector("#toggle-filters").onclick=e=>{const hidden=filters.hidden=!filters.hidden;document.querySelector(".catalog-layout").classList.toggle("filters-hidden",hidden);e.currentTarget.setAttribute("aria-expanded",String(!hidden));e.currentTarget.innerHTML="筛选条件 <span>"+(hidden?"+":"−")+"</span>";};
 function selectSeries(key){document.querySelectorAll('[name="series"]').forEach(x=>x.checked=x.value===key);update();}
 document.querySelectorAll("[data-series]").forEach(a=>a.onclick=()=>selectSeries(a.dataset.series));
 if(series[params.get("collection")]) selectSeries(params.get("collection"));
}
function renderProduct(r,isRecord){
 const p=r.product,group=series[p.collection],related=items.filter(x=>x.product.collection===p.collection&&x!==r);
 document.title=p.model+" · 时计 TIMEPIECE";
 main.innerHTML='<div class="breadcrumbs wrap"><a href="./">首页</a><span>/</span><a href="./#collection">腕表系列</a><span>/</span><span>'+esc(p.model)+'</span></div><article class="detail wrap"><div class="detail-gallery"><button class="zoom-button" aria-label="放大商品图片">'+image(r,"",false)+'<span>查看大图 ⤢</span></button><p>商品资料图</p></div><div class="detail-info"><span class="overline">'+group.label+' COLLECTION</span><h1>'+esc(p.name.split(" · ")[0])+'</h1><p class="detail-color">'+r.color+'</p><p class="reference">REF. '+esc(p.model)+'</p><div class="detail-price">'+price(r.price.amount)+'<span>品牌联名定制官方价 · CNY</span></div><p class="product-description">'+group.copy+'</p><div class="variant-label">选择颜色 <span>'+r.color+'</span></div><div class="variants">'+items.filter(x=>x.product.collection===p.collection).map(x=>'<a href="'+href(x)+'" aria-label="'+x.color+'" '+(x===r?'aria-current="true"':'')+' style="--swatch:'+x.swatch+'"><i></i></a>').join('')+'</div><a class="button dark full" href="?page=lookup&model='+encodeURIComponent(p.model)+'">查询此款腕表编号 '+arrow+'</a><button class="text-link share-button">复制款式链接</button><div class="detail-facts"><details open><summary>商品信息 <span>+</span></summary><dl><div><dt>商品型号</dt><dd>'+esc(p.model)+'</dd></div><div><dt>系列</dt><dd>'+group.name+'</dd></div><div><dt>颜色</dt><dd>'+r.color+'</dd></div><div><dt>本款计划数量</dt><dd>'+r.limit+' 枚（销售方资料）</dd></div></dl></details><details><summary>价格与资料说明 <span>+</span></summary><p>人民币品牌联名定制官方价 '+price(r.price.amount)+'，资料日期 '+r.price.effectiveDate+'。定价信息由销售方确认提供：此金额为品牌方或有定价权的授权方确定的联名定制价格。本站未独立核验授权及定价文件，实际交易以双方确认的订单为准。</p><p>图片与型号来自销售方资料。机芯、尺寸、防水性能及品牌授权信息应以实物与相应凭证核实。</p></details></div></div></article>'+
 (isRecord?'<section class="record-panel wrap"><span class="overline">SAMPLE RECORD</span><h2>编号样张</h2><code>'+esc(p.visibleSerial)+'</code><p>此编号用于页面与标签预览，尚未绑定实物。款式资料可查看，实物身份待销售方登记。</p><a class="text-link" href="label.html?v='+encodeURIComponent(r.token)+'">查看标签样张 ↗</a></section>':'')+
 '<section class="related wrap"><div class="section-title"><div><span class="overline">IN THE SAME COLLECTION</span><h2>同系列，更多选择</h2></div><a class="text-link" href="./#collection">所有腕表 ↗</a></div><div class="product-grid">'+related.slice(0,3).map(card).join('')+'</div></section>';
 document.querySelector(".zoom-button").onclick=()=>{const img=document.querySelector("#zoom-image");img.src=p.image;img.alt=p.name;document.querySelector("#image-dialog").showModal();};
 document.querySelector(".share-button").onclick=()=>copy(location.protocol==="file:"?p.model:location.href);
}
function renderLookup(){
 main.innerHTML='<section class="lookup wrap"><span class="overline">TIMEPIECE RECORD</span><h1>查询你的腕表</h1><p>输入款式型号或标签上的完整编号，查看相应资料。</p><form id="lookup-form"><label for="lookup-input">型号 / 腕表编号</label><div class="lookup-row"><input id="lookup-input" required maxlength="100" placeholder="例如 ZY-3038LB.01" value="'+esc(params.get("model")||"")+'"><button class="button dark">查询 '+arrow+'</button></div></form><div id="lookup-result" aria-live="polite"></div><div class="lookup-help"><h3>在哪里找到编号？</h3><p>款式型号可在商品标签上查看。单表编号请核对表背、保卡或销售方签发的标签。</p><p>当前站点已收录 14 款商品资料，单表实物绑定记录尚未录入。</p></div></section>';
 document.querySelector("#lookup-form").onsubmit=e=>{e.preventDefault();const q=document.querySelector("#lookup-input").value.trim().toUpperCase();const found=items.find(r=>r.product.model.toUpperCase()===q||r.product.visibleSerial.toUpperCase()===q||r.token.toUpperCase()===q);const out=document.querySelector("#lookup-result");
 if(!found){out.innerHTML='<div class="lookup-message"><h3>未找到对应资料</h3><p>请检查字母、数字与分隔符，或向销售方核对编号。</p></div>';return;}
 const sample=found.product.model.toUpperCase()!==q;
 out.innerHTML='<div class="lookup-match">'+image(found)+'<div><span class="overline">'+(sample?'编号样张 · 尚未绑定实物':'已找到款式资料')+'</span><h2>'+esc(found.product.name)+'</h2><p>'+esc(found.product.model)+'</p><strong>'+price(found.price.amount)+'</strong><a class="text-link" href="'+(sample?'?v='+encodeURIComponent(found.token):href(found))+'">查看完整资料 ↗</a></div></div>';
 };
}
function renderService(){main.innerHTML='<section class="service-page wrap"><span class="overline">CLIENT SERVICES</span><h1>资料与售后</h1><p class="lead">让每一次选择，都有可查的信息。</p><details open><summary>商品资料与价格</summary><p>本网站展示销售方提供的 14 款腕表图片、型号及人民币公示价。公示价为 ¥49,999，资料日期为 2026-09-07；具体交易条款请与销售方确认。</p></details><details open><summary>腕表编号与记录</summary><p>款式型号用于区分设计与配色；单表编号用于对应具体实物。当前单表页是未绑定实物的编号样张，正式记录须由销售方完成实物登记后发布。</p></details><details open><summary>售后联系</summary><p>请联系购买时的销售人员，并提供商品型号、购买凭证及问题照片。本站当前未提供在线售后受理。</p></details><details><summary>页面运营与数据说明</summary><p>这是销售方商品展示站点，非品牌方认证平台。查询无需提供姓名、手机号或微信授权；站点未接入广告追踪。商品信息由销售方维护。</p></details><a class="button dark" href="./#collection">返回腕表系列 ↗</a></section>';}
function renderMissing(){main.innerHTML='<section class="lookup wrap"><span class="overline">RECORD NOT FOUND</span><h1>未找到这条记录</h1><p>该链接不对应本站的款式或已收录编号，请检查完整链接。</p><a class="button dark" href="?page=lookup">重新查询 ↗</a></section>';}
function enhanceEdition(r, unit){
 const number=unit?String(unit.number).padStart(2,'0'):null;
 const panel=document.createElement('section');panel.className='edition-plaque';
 panel.setAttribute('aria-label',unit?'此枚腕表的独立编号':'本款限量信息');
 panel.innerHTML='<div class="edition-top"><span>TIMEPIECE / LIMITED EDITION</span><span>'+ (unit?'N° '+number:'EDITION') +'</span></div><div class="edition-count">'+(unit?'<span class="edition-prefix">第</span><strong>'+number+'</strong><span class="edition-total">/ '+unit.total+' 枚</span>':'<strong>'+r.limit+'</strong><span class="edition-total">枚</span>')+'</div><p class="edition-caption">全球限量 '+r.limit+' 枚'+(unit?' · 此枚独立编号':' · 每枚独立编号')+'</p>'+(unit?'<code class="edition-serial">'+esc(unit.serial)+'</code>':'')+'<p class="edition-source">限量及编号由销售方提供'+(unit?' · 编号已签发，贴牌时核对实物':'')+'</p>';
 document.querySelector('.detail-price').after(panel);
 const facts=document.querySelector('.detail-facts dl');
 facts.lastElementChild.innerHTML='<dt>全球限量</dt><dd>'+r.limit+' 枚<small>销售方发行资料</small></dd>';
 if(unit){
  document.title=unit.serial+' · 第 '+number+' / '+unit.total+' 枚 · 时计';
  document.querySelector('.reference').textContent='REF. '+r.product.model+' / N° '+number;
  facts.insertAdjacentHTML('beforeend','<div><dt>此枚编号</dt><dd>'+number+' / '+unit.total+'</dd></div><div><dt>唯一编码</dt><dd class="serial-value">'+esc(unit.serial)+'</dd></div>');
  document.querySelector('.share-button').textContent='复制此枚腕表链接';
  document.querySelector('.detail .button.full').textContent='查询其他腕表编号 ↗';
  const note=document.createElement('section');note.className='issued-record wrap';
  note.innerHTML='<div><span class="overline">YOUR INDIVIDUAL TIMEPIECE</span><h2>一枚腕表，一份独立记录。</h2></div><dl><div><dt>唯一编码</dt><dd>'+esc(unit.serial)+'</dd></div><div><dt>限量序号</dt><dd>'+number+' / '+unit.total+'</dd></div><div><dt>签发日期</dt><dd>'+unit.issuedAt+'</dd></div></dl><p>请将此编码与吊牌、保卡或销售方出库清单逐一核对。本站记录由销售方签发，不代表品牌鉴定；二维码可被复制，不单独作为真伪或所有权证明。</p>';
  document.querySelector('.related').before(note);
 }
 document.querySelector('.zoom-button').onclick=()=>{const img=document.querySelector('#zoom-image');img.src=r.product.image;img.alt=r.product.name;img.dataset.model=r.product.model;img.style.clipPath=getComputedStyle(document.querySelector('.zoom-button .photo-frame img')).clipPath;document.querySelector('#image-dialog').showModal();};
}
const token=params.get("v"),sku=params.get("sku"),page=params.get("page");
if(token||sku){const unit=token?units.find(u=>u.token===token):null;const r=items.find(x=>token?(unit?x.product.model===unit.model:x.token===token):x.product.model===sku);if(r){renderProduct(r,!!token&&!unit);enhanceEdition(r,unit);}else renderMissing();}
else if(page==="lookup")renderLookup();else if(page==="service")renderService();else renderHome();
if(page==='lookup'&&!token&&!sku){
 document.querySelector('.lookup-help p:last-child').textContent='已签发 1,000 个独立编号，覆盖 14 款腕表。输入完整编号（如 ZY-3038LB.04-01）查询该枚记录；贴牌与实物对应关系由销售方出库时核对。';
 document.querySelector('#lookup-form').onsubmit=e=>{
  e.preventDefault();const q=document.querySelector('#lookup-input').value.trim().replace(/^(?:MW-30038G\.02|ZY-3038L\.02)(?=-|$)/i,'ZY-3038LB.02');
  const u=units.find(u=>u.serial.toUpperCase()===q.toUpperCase()||u.token===q);
  const r=items.find(r=>r.product.model.toUpperCase()===(u?u.model:q.toUpperCase()));
  const out=document.querySelector('#lookup-result');
  if(!r){out.innerHTML='<div class="lookup-message"><h3>未找到对应资料</h3><p>请核对完整编号与分隔符。未签发或超出本款限量范围的编号不会创建记录。</p></div>';return;}
  out.innerHTML='<div class="lookup-match">'+image(r)+'<div><span class="overline">'+(u?'独立编号 · 第 '+String(u.number).padStart(2,'0')+' / '+u.total+' 枚':'款式资料 · 全球限量 '+r.limit+' 枚')+'</span><h2>'+esc(r.product.name)+'</h2><p>'+esc(u?u.serial:r.product.model)+'</p><strong>'+price(r.price.amount)+'</strong><a class="text-link" href="'+(u?'?v='+encodeURIComponent(u.token):href(r))+'">查看完整资料 ↗</a></div></div>';
 };
}
if(page==='service'&&!token&&!sku){document.querySelectorAll('.service-page details').forEach(d=>{if(d.querySelector('summary').textContent==='腕表编号与记录')d.querySelector('p').textContent='本站已签发 1,000 个独立编号，按 14 个款式分别连续编号。每个编号拥有独立网址，展示该枚序号和本款限量。限量信息由销售方提供；贴牌、保卡或表背与实物的对应关系须在出库时核对。二维码可被复制，不单独作为品牌鉴定或所有权证明。';});}
document.querySelector("#menu-toggle").onclick=e=>{const nav=document.querySelector("#mobile-nav");nav.hidden=!nav.hidden;e.currentTarget.setAttribute("aria-expanded",String(!nav.hidden));};
const searchDialog=document.querySelector("#search-dialog"),searchInput=document.querySelector("#global-search");
function search(){const q=searchInput.value.trim().toLowerCase();const matches=items.filter(r=>(r.product.model+" "+r.product.name+" "+series[r.product.collection].name).toLowerCase().includes(q));document.querySelector("#search-results").innerHTML=matches.length?matches.map(r=>'<a class="search-result" href="'+href(r)+'">'+image(r)+'<span>'+esc(r.product.name)+'<small>'+esc(r.product.model)+'</small></span><strong>'+price(r.price.amount)+'</strong></a>').join(''):'<p class="no-results">没有找到相关腕表，请尝试其他型号或颜色。</p>';}
document.querySelector("#search-open").onclick=()=>{searchDialog.showModal();search();searchInput.focus();};searchInput.addEventListener("input",search);
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>b.closest("dialog").close());
document.querySelectorAll("dialog").forEach(d=>d.addEventListener("click",e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
})();
