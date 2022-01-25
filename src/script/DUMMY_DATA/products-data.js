export const productsData = [
  {
    id: "p-01",
    initialPrice: 800000,
    title: "Bộ bát đĩa sứ 16 món Wickham (Test)",
    category: { value: "kitchen", name: "Nhà bếp" },
    distributor: { name: "Phố Xinh", search: "pho-xinh" },
    tags: {
      new: false,
      bestSeller: true,
      discount: 30,
      freeShip: false,
      gift: false,
    },
    promotion: [
      {
        type: "freeShip-on-total",
        promotionCode: "PhoXinhFreeShip",
        totalRate: "1,5 triệu",
      },
    ],
    sort: [
      {
        type: "color",
        defaultValue: "white",
        name: "Màu sắc",
        values: [
          { value: "white", name: "Trắng", default: true },
          { value: "pink", name: "Hồng" },
        ],
      },
    ],
    policy: [
      { warranty: { time: 2, unit: "năm" }, icon: "warranty" },
      { deliveryDate: { from: 2, to: 5 }, icon: "delivery" },
      { gift: true, icon: "gift" },
    ],
    specs: { size: null, madeIn: "Việt Nam", material: "Sứ", belongings: null },
  },
  {
    id: "p-01",
    initialPrice: 800000,
    title: "Bộ bát đĩa sứ 16 món Wickham",
    category: { value: "kitchen", name: "Phòng bếp" },
    distributor: { name: "Phố Xinh", search: "pho-xinh" },
    tags: {
      new: false,
      bestSeller: true,
      discount: 30,
      freeShip: false,
      gift: false,
    },
    promotion: [
      {
        type: "freeShip-on-total",
        promotionCode: "PhoXinhFreeShip",
        totalRate: "1,5 triệu",
      },
    ],
    sort: [{ type: "color", values: ["white", "pink"] }],
    policy: [
      { warranty: { time: 2, unit: "năm" }, icon: "warranty" },
      { deliveryDate: { from: 2, to: 5 }, icon: "delivery" },
      { gift: true, icon: "gift" },
    ],
    specs: { size: null, madeIn: "Việt Nam", material: "Sứ", belongings: null },
  },
  {
    id: "p-01",
    initialPrice: 800000,
    title: "Bộ bát đĩa sứ 16 món Wickham",
    category: { value: "kitchen", name: "Phòng bếp" },
    distributor: { name: "Phố Xinh", search: "pho-xinh" },
    tags: {
      new: false,
      bestSeller: true,
      discount: 30,
      freeShip: false,
      gift: false,
    },
    promotion: [
      {
        type: "freeShip-on-total",
        promotionCode: "PhoXinhFreeShip",
        totalRate: "1,5 triệu",
      },
    ],
    sort: [{ type: "color", values: ["white", "pink"] }],
    policy: [
      { warranty: { time: 2, unit: "năm" }, icon: "warranty" },
      { deliveryDate: { from: 2, to: 5 }, icon: "delivery" },
      { gift: true, icon: "gift" },
    ],
    specs: { size: null, madeIn: "Việt Nam", material: "Sứ", belongings: null },
  },
  {
    id: "p-01",
    initialPrice: 800000,
    title: "Bộ bát đĩa sứ 16 món Wickham",
    category: { value: "kitchen", name: "Phòng bếp" },
    distributor: { name: "Phố Xinh", search: "pho-xinh" },
    tags: {
      new: false,
      bestSeller: true,
      discount: 30,
      freeShip: false,
      gift: false,
    },
    promotion: [
      {
        type: "freeShip-on-total",
        promotionCode: "PhoXinhFreeShip",
        totalRate: "1,5 triệu",
      },
    ],
    sort: [{ type: "color", values: ["white", "pink"] }],
    policy: [
      { warranty: { time: 2, unit: "năm" }, icon: "warranty" },
      { deliveryDate: { from: 2, to: 5 }, icon: "delivery" },
      { gift: true, icon: "gift" },
    ],
    specs: { size: null, madeIn: "Việt Nam", material: "Sứ", belongings: null },
  },
];
