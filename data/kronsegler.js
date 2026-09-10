/* Seller-provided product sheets, received 2026-09-09.
 * Supply is this enterprise-channel batch, not a verified global edition.
 * Public price/currency awaits seller confirmation. No unit tokens issued here.
 * Private trade prices are intentionally excluded from this public file.
 */
window.KRON_PRICE = { amount: 6890, currency: 'CNY', confirmed: false, label: '销售方公示价' };
window.KRON_SERIES = {
  '745': { name: '745 系列', theme: '层次之间，见精巧。', copy: '以细腻的盘面层次，呈现机械腕表的秩序之美。银色、金色与灰色，为日常留下不同的表达。', total: 600 },
  '746': { name: '746 系列', theme: '从容，自成风格。', copy: '圆润轮廓与疏朗盘面相映，在星空蓝与月光银之间，寻找属于自己的日常节奏。', total: 450 },
  '779': { name: '779 系列', theme: '让时间，多一重意涵。', copy: '丰富的盘面布局与深浅配色相衬，将细节留给每一次抬腕与凝视。', total: 700 }
};
window.KRON_PRODUCTS = [
 ['KS745.21.01.32.21','745','月光银',70,'#c4c6c8','黑色表带'],
 ['KS745.24.00.30.21','745','苍穹灰',200,'#777977','灰色表带'],
 ['KS745.23.01.35.21','745','奢华金',30,'#bd9f56','棕色表带'],
 ['KS745.24.01.32.21','745','玫瑰金',200,'#bd8c76','黑色表带'],
 ['KS745.21.01.35.21','745','月光银',100,'#c4c6c8','棕色表带'],
 ['KS746.21.08.35.21','746','星空蓝',100,'#1b314e','棕色表带'],
 ['KS746.21.01.35.21','746','月光银',100,'#c4c6c8','棕色表带'],
 ['KS746.24.01.32.21','746','玫瑰金',80,'#bd8c76','黑色表带'],
 ['KS746.23.01.35.21','746','奢华金',80,'#bd9f56','棕色表带'],
 ['KS746.24.00.30.21','746','苍穹灰',90,'#777977','灰色表带'],
 ['KS779.24.04.35.21','779','玫瑰金',150,'#bd8c76','棕色表带'],
 ['KS779.21.08.38.21','779','星空蓝',150,'#1b314e','蓝色表带'],
 ['KS779.23.03.35.21','779','奢华金',100,'#bd9f56','棕色表带'],
 ['KS779.21.03.32.21','779','月光银',150,'#c4c6c8','黑色表带'],
 ['KS779.24.02.30.21','779','苍穹灰',150,'#777977','灰色表带']
].map(([model,series,color,supply,swatch,strap],i)=>({
 model,series,color,supply,swatch,strap,brand:'KRONSEGLER 康斯格',
 name:'康斯格 '+series+' 系列 · '+color,
 image:'assets/kronsegler/'+series+'-'+(i%5+1)+'.png',
 diameter:'43 mm',waterResistance:'5 ATM',movement:'日本自动机械机芯 · 9110（销售方资料）',
 dataAsOf:'2026-09-09',source:'销售方企业限量定制礼品渠道资料'
}));
