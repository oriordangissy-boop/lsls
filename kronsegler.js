(() => {
 'use strict';
 const products=window.KRON_PRODUCTS,groups=window.KRON_SERIES;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const href=r=>'?sku='+encodeURIComponent(r.model);
 const money=()=>window.KRON_PRICE.confirmed?'¥ '+window.KRON_PRICE.amount.toLocaleString('zh-CN'):'价格待确认';
 const photo=(r,lazy=true)=>'<span class="kron-photo" data-model="'+r.model+'"><img src="'+r.image+'" alt="'+esc(r.name+'，'+r.strap)+'" '+(lazy?'loading="lazy"':'fetchpriority="high"')+'></span>';
 const card=r=>'<a class="product-card kron-card" href="'+href(r)+'"><div class="product-photo">'+photo(r)+'<span class="card-ref">'+r.model+'</span><span class="card-open" aria-hidden="true">↗</span></div><div class="card-info"><span class="overline">KRONSEGLER / '+r.series+' · '+esc(r.editionLabel)+'</span><h3>'+esc(r.color)+' · '+esc(r.strap)+'</h3><span class="card-color"><i style="--swatch:'+r.swatch+'"></i>'+esc(r.model)+'</span><p>'+money()+(window.KRON_PRICE.confirmed?'<small>'+window.KRON_PRICE.label+'</small>':'')+'</p></div></a>';
 const archive='<img src="assets/kronsegler/779-2-2.jpg" alt="康斯格779星空蓝腕表，表壳与蓝色表带细节" width="1392" height="1920" fetchpriority="high">';
 const brandLink='?brand=kronsegler';
 function activate(){document.body.classList.add('kron-page');document.querySelectorAll('a[href="?brand=kronsegler"]').forEach(a=>a.setAttribute('aria-current','page'));}
 function home(main,params){
  activate();document.title='KRONSEGLER 康斯格 · 腕表系列 · 时计';
  main.innerHTML='<div class="kron-brandbar wrap"><a href="./">时计腕表</a><span>/</span><span>KRONSEGLER 康斯格</span><a href="./#collection">返回原有腕表系列 ↗</a></div>'+
   '<section class="kron-hero"><div class="kron-hero-copy"><span class="overline">THE KRONSEGLER COLLECTION</span><p class="kron-wordmark">KronSegler<span>康 斯 格</span></p><h1>把故事，<br>留在时间里。</h1><p class="kron-intro">从盘面的精巧层次，到腕间的从容表达。<br>探索康斯格 745、746 与 779 系列。</p><a class="button light" href="#kron-collection">探索 15 款腕表 <span>↓</span></a></div><figure class="kron-archive">'+archive+'<figcaption>COPERNICUS / 779 · 星空蓝</figcaption></figure></section>'+
   '<nav class="kron-tabs" aria-label="康斯格系列"><a href="#kron-collection" data-kron-series="all">全部款式 <sup>15</sup></a>'+Object.keys(groups).map(k=>'<a href="#kron-collection" data-kron-series="'+k+'">'+k+' 系列 <sup>05</sup></a>').join('')+'<a href="#kron-story">品牌故事</a></nav>'+
   '<section class="wrap kron-catalog" id="kron-collection"><div class="section-title"><div><span class="overline">THREE COLLECTIONS. INDIVIDUAL EXPRESSION.</span><h2>三种表达，各有章法。</h2></div><p>选择系列，找到你的腕间风格。</p></div><div class="kron-tools"><label>腕表系列<select id="kron-series"><option value="all">全部系列</option>'+Object.keys(groups).map(k=>'<option value="'+k+'">'+k+' 系列</option>').join('')+'</select></label><label>颜色<select id="kron-color"><option value="all">全部颜色</option>'+[...new Set(products.map(r=>r.color))].map(c=>'<option>'+c+'</option>').join('')+'</select></label><label class="kron-model-search">搜索型号<input id="kron-model" type="search" placeholder="例如 KS745.21.01.32.21"></label><button class="text-link" id="kron-reset">重置</button><span id="kron-count" role="status">15 款腕表</span></div><div class="kron-collection-caption" id="kron-caption"></div><div class="product-grid" id="kron-grid">'+products.map(card).join('')+'</div></section>'+
   '<section class="kron-story" id="kron-story"><div><span class="overline">A STORY IN EVERY DETAIL</span><h2>不只记录时间，<br>也承载灵感。</h2></div><div><p>康斯格的品牌资料将历史、天文与哲学列为腕表设计的灵感来源。对时间的理解，也融入盘面布局、色彩与细节之中。</p><p>在这里，分别探索 745、746、779 三个系列。每一款都拥有独立的型号与商品资料页，便于选款、分享与核对。</p><small>品牌理念摘述自销售方提供的《KronSegler康斯格品牌介绍2023》。本站为销售方商品展示专区，不代表品牌官方认证。</small></div></section>'+
   '<section class="service-band wrap"><div><span class="overline">PRODUCT INFORMATION</span><h2>每一款，都有资料可查。</h2><p>查看型号、配色与规格；本批供应数量不等同于全球发行限量。</p></div><a class="button outline" href="?page=lookup">按型号查询 <span>↗</span></a></section>';
  const s=document.querySelector('#kron-series'),c=document.querySelector('#kron-color'),q=document.querySelector('#kron-model');
  function update(){const list=products.filter(r=>(s.value==='all'||r.series===s.value)&&(c.value==='all'||r.color===c.value)&&r.model.toLowerCase().includes(q.value.trim().toLowerCase()));document.querySelector('#kron-grid').innerHTML=list.length?list.map(card).join(''):'<p class="no-results">没有符合条件的款式。请减少筛选条件，或点击“重置”。</p>';document.querySelector('#kron-count').textContent=list.length+' 款腕表';const g=groups[s.value];document.querySelector('#kron-caption').innerHTML=g?'<span class="overline">COLLECTION '+s.value+'</span><h3>'+g.theme+'</h3><p>'+g.copy+'</p>':'';document.querySelectorAll('[data-kron-series]').forEach(a=>{if(a.dataset.kronSeries===s.value)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});}
  s.onchange=c.onchange=q.oninput=update;document.querySelector('#kron-reset').onclick=()=>{s.value=c.value='all';q.value='';update();};
  document.querySelectorAll('[data-kron-series]').forEach(a=>a.onclick=()=>{s.value=a.dataset.kronSeries;c.value='all';q.value='';update();});
  if(groups[params.get('series')])s.value=params.get('series');update();
 }
 function teaser(){return '<section class="kron-teaser wrap"><div><span class="overline">NEW COLLECTION / KRONSEGLER</span><h2>康斯格，<br>另一种时间表达。</h2><p>745 · 746 · 779<br>三个系列，十五款腕间风格。</p><a class="button dark" href="'+brandLink+'">探索康斯格 <span>↗</span></a></div><a class="kron-teaser-art" href="'+brandLink+'" aria-label="探索康斯格腕表">'+archive+'</a></section>';}
 function search(q){return products.filter(r=>(r.model+' '+r.name+' '+r.strap+' KRONSEGLER').toLowerCase().includes(q)).map(r=>'<a class="search-result" href="'+href(r)+'">'+photo(r)+'<span>'+esc(r.name)+'<small>'+r.model+'</small></span><strong>'+money()+'</strong></a>').join('');}
 function lookup(r){return '<div class="lookup-match kron-lookup">'+photo(r)+'<div><span class="overline">康斯格 · 限量定制款</span><h2>'+esc(r.name)+'</h2><p>'+r.model+'</p><strong>'+money()+'</strong><a class="text-link" href="'+href(r)+'">查看完整资料 ↗</a></div></div>';}
 const identities={
  '745':{en:'Genius',cn:'天才 · 745系列',detail:'层次之间，见精巧。',intro:'叶形指针、扇形显示与层叠盘面。由整体到局部，细看机械腕表的秩序。'},
  '746':{en:'Relativity',cn:'相对论 · 746系列',detail:'从容，自成风格。',intro:'疏朗的时标与圆形显示相映，细长指针掠过盘面，留下清晰的时间读数。'},
  '779':{en:'Copernicus',cn:'哥白尼 · 779系列',detail:'让细节，清晰可见。',intro:'罗马数字时标、层叠盘面与蓝色行星盘。从正面到侧面，细看腕表的每一处细节。'}
 };
 function premiumProduct(main,r){
  activate();const id=identities[r.series],gallery=r.gallery;
  document.title=r.model+' · 康斯格 '+r.series+' 系列 · 时计';
  const facts=[['品牌','KRONSEGLER 康斯格'],['商品型号',r.model],['款式',r.editionLabel],['系列',id.cn],['颜色',r.color],['表带',r.strap],['表盘尺寸',r.diameter],['防水标示',r.waterResistance],['机芯',r.movement],['本批供应',r.supply+' 枚']];
  main.innerHTML=`<div class="breadcrumbs wrap"><a href="./">首页</a><span>/</span><a href="${brandLink}">康斯格</a><span>/</span><span>${r.series} · ${r.color}</span></div>
   <article class="kron-premium wrap">
    <section class="kron-gallery" aria-label="商品图片">
     <div class="kron-stage"><span class="kron-stage-label">KRONSEGLER / ${r.series}</span><button class="kron-hero-button" id="kron-open-image" aria-label="放大查看腕表图片"><img id="kron-hero-image" src="${gallery[0].src}" alt="${esc(r.name+'，'+r.strap+'，'+gallery[0].label)}" fetchpriority="high"></button><span class="kron-stage-caption" id="kron-stage-caption">${gallery[0].label}</span><button class="kron-zoom" id="kron-zoom" aria-label="打开高清大图">放大查看 <span>＋</span></button></div>
     <div class="kron-gallery-bottom"><div class="kron-thumbnails" aria-label="选择商品图片">${gallery.map((g,i)=>`<button data-kron-image="${i}" aria-label="查看${g.label}" aria-pressed="${i===0}"><img src="${g.src}" alt="" loading="lazy"></button>`).join('')}</div><span id="kron-image-count" aria-live="polite">01 / ${String(gallery.length).padStart(2,'0')}</span></div>
     <p class="kron-image-note">品牌官网商品摄影 · 表带与细节版本以实物为准</p>
    </section>
    <section class="kron-product-info"><span class="overline">KRONSEGLER · AUTOMATIC · ${esc(r.editionLabel)}</span><h1>${id.en}<span>${id.cn}</span></h1><p class="kron-color"><i style="background:${r.swatch}"></i>${r.color} · ${r.strap}</p><p class="reference">REF. ${r.model}</p><div class="detail-price">${money()}<span>${window.KRON_PRICE.confirmed?esc(window.KRON_PRICE.label)+' · CNY / 枚':'人民币公开售价核对中'}</span></div><p class="kron-product-intro">${id.intro}</p>
     <div class="kron-spec-strip"><div><strong>43<small> mm</small></strong><span>表盘尺寸</span></div><div><strong>自动<small>机械</small></strong><span>机芯类型</span></div><div><strong>5<small> ATM</small></strong><span>资料标示防水</span></div></div>
     <div class="variant-label">选择款式 <span>${r.color} / ${r.strap}</span></div><div class="kron-variants">${products.filter(x=>x.series===r.series).map(x=>`<a href="${href(x)}" aria-label="${esc(x.color+' '+x.strap+' '+x.model)}" ${x===r?'aria-current="true"':''}>${photo(x)}<small>${x.color}</small></a>`).join('')}</div>
     <a class="button dark full" href="#kron-details">查看商品资料 <span>↓</span></a><button class="kron-share-link" id="kron-share">复制此款链接 <span>↗</span></button><p class="kron-share-status" id="kron-share-status" role="status"></p>
    </section>
   </article>
   <section class="kron-editorial"><div><span class="overline">A CLOSER LOOK</span><h2>${id.detail}</h2><p>近看盘面的层次、表壳的轮廓，<br>以及皮革自然的纹理。</p><a class="text-link" href="#main">返回商品图片 ↑</a><small>${id.en.toUpperCase()} / ${r.series}</small></div><figure><img src="${gallery[1].src}" alt="${esc(r.name+'，'+r.strap+'，商品细节摄影')}" loading="lazy"><figcaption>KRONSEGLER · 商品摄影</figcaption></figure></section>
   <section class="kron-specifications wrap" id="kron-details"><div><span class="overline">TIMEPIECE DETAILS</span><h2>商品资料</h2><p>选款、查看与核对。</p></div><div class="detail-facts"><details open><summary>型号与规格 <span>＋</span></summary><dl>${facts.map(([k,v])=>`<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></details><details><summary>图片与价格说明 <span>＋</span></summary><p>商品摄影来自康斯格官网，按系列、表壳与表带配色对应展示，未使用AI重绘。官网版本与本批实物在表带纹理、指针等细节上可能存在差异，请以销售方提供的实拍与实物为准。</p><p>型号、配色、规格与供应数量来自销售方企业渠道资料，录入日期 ${r.dataAsOf}。本批供应不等于全球限量。${window.KRON_PRICE.confirmed?'人民币公示价由销售方确认，具体成交价格以订单为准。':'公开售价及币种口径尚待销售方确认，暂不标注官方人民币价格。'}</p><p>机芯、防水及售后以实物随附说明为准。款式链接并非单表身份、防伪或品牌鉴定凭证。</p><a class="text-link" href="${r.imageSource}" target="_blank" rel="noopener noreferrer">查看品牌系列资料 ↗</a></details></div></section>
   <section class="related wrap"><div class="section-title"><div><span class="overline">IN THE SAME COLLECTION</span><h2>同系列，更多选择</h2></div><a class="text-link" href="${brandLink}&series=${r.series}#kron-collection">查看 ${r.series} 系列 ↗</a></div><div class="product-grid">${products.filter(x=>x.series===r.series&&x!==r).map(card).join('')}</div><a class="button outline kron-all-link" href="${brandLink}#kron-collection">浏览全部15款 <span>↗</span></a></section>`;
  let selected=0;
  const hero=document.querySelector('#kron-hero-image'),caption=document.querySelector('#kron-stage-caption');
  document.querySelectorAll('[data-kron-image]').forEach(b=>b.onclick=()=>{selected=Number(b.dataset.kronImage);const g=gallery[selected];hero.src=g.src;hero.alt=r.name+'，'+r.strap+'，'+g.label;caption.textContent=g.label;document.querySelector('#kron-image-count').textContent=String(selected+1).padStart(2,'0')+' / '+String(gallery.length).padStart(2,'0');document.querySelectorAll('[data-kron-image]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));});
  function zoom(){const img=document.querySelector('#zoom-image'),dialog=document.querySelector('#image-dialog');img.src=gallery[selected].src;img.alt=hero.alt;dialog.classList.add('kron-lightbox');dialog.querySelector('p').textContent='品牌官网原图 · 滚动查看细节';dialog.showModal();}
  document.querySelector('#kron-open-image').onclick=document.querySelector('#kron-zoom').onclick=zoom;
  document.querySelector('#kron-share').onclick=async()=>{const out=document.querySelector('#kron-share-status');try{await navigator.clipboard.writeText(new URL(href(r),location.href).href);out.textContent='款式链接已复制';}catch{out.textContent='请复制浏览器地址栏中的完整链接。';}};
 }
 window.KronCollection={home,product:premiumProduct,teaser,search,lookup};
})();
