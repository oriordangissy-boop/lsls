/*
 * 首批 14 个款式的展示登记。
 * 图片来自销售方提供的两张商品资料表；每只实物出库时，应新建一个不可重复的 token
 * 与 visibleSerial，不能复用本文件中的展示 token。
 */

window.PASSPORT_CONFIG = {
  siteName: "时计档案",
  issuerName: "时计档案",
  publicBaseUrl: "https://oriordangissy-boop.github.io/lsls/",
  supportUrl: "?page=service",
  demoMode: false,
  publicNotice:
    "本页由销售方维护，用于展示商品资料、销售方公示价和内部唯一编码。它不替代品牌授权、第三方鉴定、所有权证明或保值承诺。"
};

function makeRecord(options) {
  return {
    token: options.token,
    recordId: options.recordId,
    status: "sample",
    statusLabel: "编号样张 · 尚未绑定实物",
    product: {
      collection: options.collection,
      name: options.name,
      model: options.model,
      editionTotal: options.limit,
      visibleSerial: options.model + "-001/" + String(options.limit).padStart(3, "0"),
      editionNumber: "展示号 001 / " + options.limit,
      seriesEdition: "全系列 1,000 枚（销售方资料）",
      image: "assets/watches/" + options.image,
      imageAlt: options.name + "，销售方提供的商品资料图"
    },
    price: {
      label: "销售方公示价",
      amount: 49999,
      currency: "CNY",
      effectiveDate: "2026-09-07",
      version: "P-20260907-01",
      taxNote: "价格为销售方公示信息；税费、库存与交易条款以最终订单确认页为准。"
    },
    verification: {
      issuedAt: "2026-09-07",
      dataAsOf: "2026-09-07",
      physicalCheck: "成交前请核对实物表背、保卡或包装上的唯一编码。",
      note:
        "本页面尚未接入品牌方或第三方鉴定数据。产品图来自销售方提供资料，正式上线前应补充实物照片、售后主体和可核验的进货凭证。"
    },
    evidence: {
      label: "销售方公示记录",
      method:
        "本页首先公开销售方的定价版本与商品资料，并保留未来补充的采购、鉴定或公开来源的位置。未经独立核验的资料不会表述为品牌方官方信息。",
      exchangeRate: "当前为销售方人民币公示价，不以外币换算结果作为定价依据。",
      sources: []
    },
    history: [
      {
        date: "2026-09-07",
        title: "商品资料已建立",
        description: "款式图、型号和销售方公示价已录入；实物资料待出库前复核。"
      },
      {
        date: "待出库",
        title: "单表编码待签发",
        description: "正式版应为每只实物生成不可预测的二维码 token，并绑定表背或保卡编码。"
      }
    ]
  };
}

window.PASSPORT_REGISTRY = [
  makeRecord({ token: "m7qa-3038-blue-001", recordId: "REC-20260907-001", model: "ZY-3038LB.01", name: "镂空运动腕表 · 深蓝", collection: "SKELETON SPORT", image: "zy-3038lb-01.jpg", limit: 50 }),
  makeRecord({ token: "m7qa-3038-orange-001", recordId: "REC-20260907-002", model: "MW-30038G.02", name: "镂空运动腕表 · 橙色", collection: "SKELETON SPORT", image: "mw-30038g-02.jpg", limit: 50 }),
  makeRecord({ token: "m7qa-3038-green-001", recordId: "REC-20260907-003", model: "ZY-3038LB.03", name: "镂空运动腕表 · 绿色", collection: "SKELETON SPORT", image: "zy-3038lb-03.jpg", limit: 50 }),
  makeRecord({ token: "m7qa-3038-black-001", recordId: "REC-20260907-004", model: "ZY-3038LB.04", name: "镂空运动腕表 · 黑玫瑰金", collection: "SKELETON SPORT", image: "zy-3038lb-04.jpg", limit: 100 }),
  makeRecord({ token: "m7qa-3038-red-001", recordId: "REC-20260907-005", model: "ZY-3038LB.05", name: "镂空运动腕表 · 红色", collection: "SKELETON SPORT", image: "zy-3038lb-05.jpg", limit: 200 }),
  makeRecord({ token: "m7qa-3038-white-001", recordId: "REC-20260907-006", model: "ZY-3038LB.06", name: "镂空运动腕表 · 白色", collection: "SKELETON SPORT", image: "zy-3038lb-06.jpg", limit: 50 }),
  makeRecord({ token: "m7qa-3036-red-001", recordId: "REC-20260907-007", model: "ZY-3036LB.01", name: "彩虹圈运动腕表 · 红色", collection: "SPECTRUM", image: "zy-3036lb-01.jpg", limit: 50 }),
  makeRecord({ token: "m7qa-3036-blue-001", recordId: "REC-20260907-008", model: "ZY-3036LB.02", name: "彩虹圈运动腕表 · 蓝色", collection: "SPECTRUM", image: "zy-3036lb-02.jpg", limit: 50 }),
  makeRecord({ token: "m7qa-3036-multi-001", recordId: "REC-20260907-009", model: "ZY-3036LB.03", name: "彩虹盘运动腕表 · 拼色", collection: "SPECTRUM", image: "zy-3036lb-03.jpg", limit: 100 }),
  makeRecord({ token: "m7qa-3036-green-001", recordId: "REC-20260907-010", model: "ZY-3036LB.04", name: "彩虹圈运动腕表 · 绿色", collection: "SPECTRUM", image: "zy-3036lb-04.jpg", limit: 50 }),
  makeRecord({ token: "m7qa-3036-pink-001", recordId: "REC-20260907-011", model: "ZY-3036LB.05", name: "彩虹圈运动腕表 · 粉色", collection: "SPECTRUM", image: "zy-3036lb-05.jpg", limit: 50 }),
  makeRecord({ token: "m7qa-3035-black-001", recordId: "REC-20260907-012", model: "ZY-3035LB.01", name: "经典钢带腕表 · 黑色", collection: "STEEL DIVER", image: "zy-3035lb-01.jpg", limit: 70 }),
  makeRecord({ token: "m7qa-3035-green-001", recordId: "REC-20260907-013", model: "ZY-3035LB.02", name: "经典钢带腕表 · 绿色", collection: "STEEL DIVER", image: "zy-3035lb-02.jpg", limit: 80 }),
  makeRecord({ token: "m7qa-3035-blue-001", recordId: "REC-20260907-014", model: "ZY-3035LB.03", name: "经典钢带腕表 · 蓝色", collection: "STEEL DIVER", image: "zy-3035lb-03.jpg", limit: 50 })
];
