export const productsData = [
  {
    initialPrice: 800000,
    title: "Bộ bát đĩa sứ 16 món Wickham",
    category: { value: "kitchen", name: "Nhà bếp" },
    productType: "kitchen-appliances",
    distributor: { name: "Phố Xinh", search: "pho-xinh" },
    tags: {
      new: false,
      bestSeller: true,
      discount: 20,
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
    images: [
      {
        type: "white",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-01%2Fwhite-1.jpg?alt=media&token=a5f25c76-f81b-43ab-ac6f-ef90e1b929f3",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-01%2Fwhite-2.jpg?alt=media&token=877ff3a0-65f5-48e4-b758-536a1d0c2da6",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-01%2Fwhite-3.jpg?alt=media&token=a7075fc8-82a1-4aac-902d-2e911423b08b",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-01%2Fwhite-4.jpg?alt=media&token=7276770f-4adb-4981-b8b6-d6d41004b612",
        ],
      },

      {
        type: "pink",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-01%2Fpink-1.jpg?alt=media&token=5158e2f5-a017-4338-a384-619508923cdf",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-01%2Fpink-2.jpg?alt=media&token=632e97d1-7c44-4182-9eb4-02937bab0c9b",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-01%2Fpink-3.jpg?alt=media&token=67132190-14f2-4250-a9a9-2342ade0faa0",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-01%2Fpink-4.jpg?alt=media&token=4760350e-6b41-4bd9-8cc0-a316250f9717",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-01%2Fthmb.jpg?alt=media&token=776c468c-7642-44d1-8c2a-d40781689e5e",
    policy: [{ deliveryDate: { from: 3, to: 5 }, icon: "delivery" }],
    specs: {
      size: null,
      madeIn: "Việt Nam",
      material: ["Sứ"],
      belongings: null,
    },
  },
  {
    initialPrice: 5500000,
    title: "Bàn ăn tròn chân gỗ hạt dẻ",
    category: { value: "kitchen", name: "Nhà bếp" },
    productType: "table",
    distributor: { name: "Chilai", search: "chilai" },
    tags: {
      new: true,
      bestSeller: false,
      discount: false,
      freeShip: true,
      gift: false,
    },
    promotion: [
      {
        freeShipCode: "ChilaiFreeShip",
      },
    ],
    sort: [],
    images: [
      {
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-02%2F1.jpg?alt=media&token=ab1a8f56-b172-4142-b13f-1f188b99bba6",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-02%2F2.jpg?alt=media&token=3d465375-1419-4db5-883f-cbc3da89f80d",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-02%2F3.jpg?alt=media&token=82041be4-ae9d-4137-9d16-ab4ecc93fea7",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-02%2F4.jpg?alt=media&token=8906a45a-dd86-4911-ac8d-29dbe436eeaa",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-02%2Fthmb.jpg?alt=media&token=74016391-519a-4c43-ad66-54ae8f18d8a4",
    policy: [
      { warranty: null, icon: "warranty" },
      { deliveryDate: { from: 3, to: 5 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: `39'' L x 39'' D x 30'' H`,
      madeIn: "Việt Nam",
      material: ["Sứ", "Thủy tinh"],
      belongings: null,
    },
  },
  {
    initialPrice: 2600000,
    title: "Bàn cà phê kèm ngăn để đồ Alviva",
    category: { value: "living-room", name: "Phòng khách" },
    productType: "table",
    distributor: { name: "Hòa Phát", search: "hoa-phat" },
    tags: {
      new: false,
      bestSeller: false,
      discount: 20,
      freeShip: false,
      gift: false,
    },
    promotion: [],
    sort: [],
    images: [
      {
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-03%2F1.jpg?alt=media&token=df81cf7b-eed0-4d52-8bf8-a4cf685ec81d",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-03%2F2.jpg?alt=media&token=8ae32d15-9164-48e9-bad5-0c578fc0da8f",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-03%2F3.jpg?alt=media&token=a0708705-94c2-4e49-8ad4-6c4644163d92",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-03%2F4.jpg?alt=media&token=1fd7c2ab-3e6c-4550-8d7d-bcee911da4b7",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-03%2Fthmb.jpg?alt=media&token=bab0b114-ab24-4c6a-a9e0-ef06ab25f156",
    policy: [
      { warranty: null, icon: "warranty" },
      { deliveryDate: { from: 3, to: 5 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "17'' H x 38'' L x 18'' D",
      madeIn: "Việt Nam",
      material: ["Nhôm"],
      belongings: null,
    },
  },
  {
    initialPrice: 3600000,
    title: "Bộ giường Newt Low",
    category: { value: "bed-room", name: "Phòng ngủ" },
    productType: "bed",
    distributor: { name: "Decox", search: "decox" },
    tags: {
      new: false,
      bestSeller: true,
      discount: 15,
      freeShip: false,
      gift: true,
    },
    promotion: [
      {
        type: "freeShip-on-total",
        promotionCode: "DECOXFreeShip",
        totalRate: "4 triệu",
      },
      {
        gifts: ["Bộ vỏ gối, ga trải giường Newt Low"],
      },
    ],
    sort: [],
    images: [
      {
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-04%2F1.jpg?alt=media&token=7f67dde8-dde3-4292-8240-2fd85bc9ba40",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-04%2F2.jpg?alt=media&token=60fd88db-d933-42a1-a477-19be545daeb2",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-04%2F3.jpg?alt=media&token=96e7b0aa-e255-42a7-b2fd-e24e9f140b0a",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-04%2F4.jpg?alt=media&token=e3e3c684-5255-4f4e-8984-04c977801139",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-04%2Fthmb.jpg?alt=media&token=7ee10e71-6466-4a87-8c5d-b6bd79827e5e",
    policy: [
      { warranty: { time: 2, unit: "năm" }, icon: "warranty" },
      { deliveryDate: { from: 4, to: 7 }, icon: "delivery" },
      { gift: true, icon: "gift" },
    ],
    specs: {
      size: "53.5'' W x 74.70'' L",
      madeIn: "Việt Nam",
      material: ["Gỗ công nghiệp"],
      belongings: "Bộ khung đỡ",
    },
  },
  {
    initialPrice: 7000000,
    title: "Ghế sofa Loveseat Cutshall",
    category: { value: "living-room", name: "Phòng khách" },
    productType: "chair",
    distributor: { name: "Chilai", search: "chilai" },
    tags: {
      new: true,
      bestSeller: false,
      discount: 10,
      freeShip: true,
      gift: false,
    },
    promotion: [
      {
        freeShipCode: "ChilaiFreeShip",
      },
    ],
    sort: [
      {
        type: "color",
        defaultValue: "blue",
        name: "Màu sắc",
        values: [
          { value: "blue", name: "Xanh dương", default: true },
          { value: "mustard", name: "Vàng nghệ" },
          { value: "moon-light", name: "Xám sáng" },
        ],
      },
    ],
    images: [
      {
        type: "blue",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-05%2Fblue-1.jpg?alt=media&token=127cfd57-df87-4552-ab70-40b76ae44940",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-05%2Fblue-2.jpg?alt=media&token=42d286f2-76d9-41dc-a56e-6e5f1251342a",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-05%2Fblue-3.jpg?alt=media&token=e46f3f34-c862-4230-a66b-6a07e97a2811",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-05%2Fblue-4.jpg?alt=media&token=204948c9-dbb1-480f-8fe0-f679862d875a",
        ],
      },
      {
        type: "mustard",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-05%2Fmustard-1.jpg?alt=media&token=9cc0eed4-ba85-4e74-abc5-b17c156dda52",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-05%2Fmustard-2.jpg?alt=media&token=4f2c152a-560d-414c-a3af-ab7d25f75e84",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-05%2Fmustard-3.jpg?alt=media&token=9e523b7f-e458-43d2-8517-9bad65425f6b",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-05%2Fmustard-4.jpg?alt=media&token=0dc5b181-5282-4571-84bc-657cc88b9601",
        ],
      },
      {
        type: "moon-light",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-05%2Fmoon-light-1.jpg?alt=media&token=9e507392-b55b-4e67-8542-d5052f7c6619",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-05%2Fmoon-light-2.jpg?alt=media&token=bfbd6d2c-6c2e-46a1-9418-ea3cc410b43c",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-05%2Fmoon-light-3.jpg?alt=media&token=c875dbf5-a8a0-4863-95cd-ce5b49dfb0a2",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-05%2Fmoon-light-4.jpg?alt=media&token=1c07d1cf-240a-472b-8b57-8d445bd18897",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-05%2Fthmb.jpg?alt=media&token=295bd5c5-af6b-48e9-b815-04423411a3ad",
    policy: [
      { warranty: null, icon: "warranty" },
      { deliveryDate: { from: 4, to: 7 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "34'' H x 58'' W x 32'' D",
      madeIn: "Việt Nam",
      material: ["Gỗ công nghiệp", "Cao su", "Vải polyester"],
      belongings: null,
    },
  },
  {
    initialPrice: 1500000,
    title: "Tủ cạnh giường Carnforth",
    category: { value: "bed-room", name: "Phòng ngủ" },
    productType: "closet-cabinet",
    distributor: { name: "Phố Xinh", search: "pho-xinh" },
    tags: {
      new: false,
      bestSeller: false,
      discount: false,
      freeShip: false,
      gift: false,
    },
    promotion: [],
    sort: [],
    images: [
      {
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-06%2F1.jpg?alt=media&token=085f1d55-4ce3-442e-b83c-a9e5cf2d9b0f",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-06%2F2.jpg?alt=media&token=073a9fe5-1db1-4e37-9935-0628e213585b",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-06%2F3.jpg?alt=media&token=b07a759b-afbb-4666-90d1-8d318f5e028e",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-06%2F4.jpg?alt=media&token=d3998233-a69c-48d9-87d3-56f0be911926",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-06%2Fthmb.jpg?alt=media&token=e58cf44d-cfaa-45bc-ab85-c9fa97174dc9",
    policy: [
      { warranty: null, icon: "warranty" },
      { deliveryDate: { from: 3, to: 5 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "22.09'' H x 15.79'' W x 16.34'' D",
      madeIn: "Việt Nam",
      material: ["Gỗ công nghiệp"],
      belongings: null,
    },
  },
  {
    initialPrice: 5000000,
    title: "Bộ tủ bếp Aaronsburg",
    category: { value: "kitchen", name: "Nhà bếp" },
    productType: "closet-cabinet",
    distributor: { name: "Hòa Phát", search: "hoa-phat" },
    tags: {
      new: false,
      bestSeller: true,
      discount: 30,
      freeShip: true,
      gift: false,
    },
    promotion: [
      {
        freeShipCode: "HoaPhatFreeShip",
      },
    ],
    sort: [
      {
        type: "color",
        defaultValue: "white",
        name: "Màu sắc",
        values: [
          { value: "white", name: "Trắng", default: true },
          { value: "coffee", name: "Cà phê" },
        ],
      },
    ],
    images: [
      {
        type: "white",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-07%2Fwhite-1.jpg?alt=media&token=eb363c17-b9a9-4819-81b2-5a8ddb836e3b",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-07%2Fwhite-2.jpg?alt=media&token=4f480630-4c12-4ddd-aa80-ec27ba914248",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-07%2Fwhite-3.jpg?alt=media&token=d0effa8d-505a-46c1-b5ec-181cf3329703",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-07%2Fwhite-4.jpg?alt=media&token=dfe89b74-5eff-48f1-89ac-e2a9858dd9d9",
        ],
      },
      {
        type: "coffee",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-07%2Fcoffee-1.jpg?alt=media&token=60eee10a-b680-46b5-a611-49d4d75df7c6",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-07%2Fcoffee-2.jpg?alt=media&token=2f336107-6b82-4f7f-bee5-34448331a5a3",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-07%2Fcoffee-3.jpg?alt=media&token=9a5e0683-36d7-47b0-b5b4-e5f3d96a695e",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-07%2Fcoffee-4.jpg?alt=media&token=de2ceb26-a0b8-41dc-8ce9-e7919f3e797a",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-07%2Fthmb.jpg?alt=media&token=6ed54c43-782e-41cd-98bf-88065b6f01c6",
    policy: [
      { warranty: { time: 1, unit: "năm" }, icon: "warranty" },
      { deliveryDate: { from: 3, to: 5 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "72.25'' H x 29.13'' W x 15.75'' D",
      madeIn: "Việt Nam",
      material: ["Gỗ công nghiệp"],
      belongings: null,
    },
  },
  {
    initialPrice: 8800000,
    title: "Bộ tủ TV cỡ lớn Doralynn",
    category: { value: "living-room", name: "Phòng khách" },
    productType: "closet-cabinet",
    distributor: { name: "Decox", search: "decox" },
    tags: {
      new: true,
      bestSeller: false,
      discount: false,
      freeShip: true,
      gift: false,
    },
    promotion: [
      {
        freeShipCode: "DecoxFreeShip",
      },
    ],
    sort: [],
    images: [
      {
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-08%2F1.jpg?alt=media&token=5f189f54-e6b5-4a0d-9108-1efc4590e5f6",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-08%2F2.jpg?alt=media&token=bcbc7319-a0ed-4034-8e13-40e5e5c0058d",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-08%2F3.jpg?alt=media&token=7baa6619-73cc-46b2-8085-8b1058e90244",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-08%2F4.jpg?alt=media&token=cc8503bb-cf55-4d0f-a4ed-f2ba8e3c3091",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-08%2Fthmb.jpg?alt=media&token=18f88e98-acaf-4311-a787-53cc9c219da7",
    policy: [
      { warranty: { time: 2, unit: "năm" }, icon: "warranty" },
      { deliveryDate: { from: 3, to: 5 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "94.25'' x 72'' x 15.75''",
      madeIn: "Việt Nam",
      material: ["Gỗ công nghiệp"],
      belongings: null,
    },
  },
  {
    initialPrice: 6600000,
    title: "Bộ giường Marla",
    category: { value: "bed-room", name: "Phòng ngủ" },
    productType: "bed",
    distributor: { name: "Chilai", search: "chilai" },
    tags: {
      new: false,
      bestSeller: false,
      discount: false,
      freeShip: false,
      gift: false,
    },
    promotion: [],
    sort: [],
    images: [
      {
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-09%2F1.jpg?alt=media&token=76f8e6cb-39f5-47f7-b2f8-3040f3aa1b9a",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-09%2F2.jpg?alt=media&token=70008384-b261-48df-ac26-e832e9340717",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-09%2F3.jpg?alt=media&token=397dddfa-1fb1-4ae7-80e6-5ac62b863093",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-09%2F4.jpg?alt=media&token=194a8e19-c013-4532-a9a0-7d5a0fe4a411",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-09%2Fthmb.jpg?alt=media&token=710b9d4c-29ee-4238-bb81-175ba91cac13",
    policy: [
      { warranty: { time: 2, unit: "năm" }, icon: "warranty" },
      { deliveryDate: { from: 4, to: 7 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "62.6'' W x 82.7'' L",
      madeIn: "Việt Nam",
      material: ["Gỗ công nghiệp", "Thép không gỉ"],
      belongings: "Bộ khung đỡ",
    },
  },
  {
    initialPrice: 4700000,
    title: "Bộ 4 ghế phòng ăn Polyurethane",
    category: { value: "kitchen", name: "Nhà bếp" },
    productType: "chair",
    distributor: { name: "Phố Xinh", search: "pho-xinh" },
    tags: {
      new: false,
      bestSeller: true,
      discount: 20,
      freeShip: true,
      gift: false,
    },
    promotion: [
      {
        freeShipCode: "PhoXinhFreeShip",
      },
    ],
    sort: [
      {
        type: "color",
        defaultValue: "teal",
        name: "Màu sắc",
        values: [
          { value: "teal", name: "Xanh lá", default: true },
          { value: "white", name: "Trắng" },
        ],
      },
    ],
    images: [
      {
        type: "teal",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-10%2Fteal-1.jpg?alt=media&token=1351185f-4fb6-492a-86fd-2630943653db",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-10%2Fteal-2.jpg?alt=media&token=c89816b3-eb5b-4338-823f-82572a1fe1da",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-10%2Fteal-3.jpg?alt=media&token=38fe9b52-b688-4cfd-9738-fe5903bc33be",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-10%2Fteal-4.jpg?alt=media&token=fc07c1f2-145c-4bcf-94a8-fa9a7b524fd4",
        ],
      },
      {
        type: "white",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-10%2Fwhite-1.jpg?alt=media&token=f782a982-941c-47e4-9668-119ffaacd95f",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-10%2Fwhite-2.jpg?alt=media&token=8c6de042-e467-4a1c-a024-39119a6099cf",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-10%2Fwhite-3.jpg?alt=media&token=13bea4c4-1f56-4c7e-84a3-92a59ab2cb15",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-10%2Fwhite-4.jpg?alt=media&token=dc9f281d-4585-4b7d-8d15-f8120df3c119",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-10%2Fthmb.jpg?alt=media&token=5eb0ab04-d126-411c-abea-dc64aa0b794e",
    policy: [
      { warranty: { time: 1, unit: "năm" }, icon: "warranty" },
      { deliveryDate: { from: 3, to: 5 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "32.09'' H x 18.89'' W",
      madeIn: "Việt Nam",
      material: ["Gỗ công nghiệp", "Nhựa PVC", "Cao su"],
      belongings: null,
    },
  },
  {
    initialPrice: 6000000,
    title: "Bàn cà phê Alezzi",
    category: { value: "living-room", name: "Phòng khách" },
    productType: "table",
    distributor: { name: "Hòa Phát", search: "hoa-phat" },
    tags: {
      new: true,
      bestSeller: false,
      discount: false,
      freeShip: false,
      gift: false,
    },
    promotion: [],
    sort: [],
    images: [
      {
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-11%2F1.jpg?alt=media&token=c44490a8-20ae-4327-87f6-4a59c283b853",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-11%2F2.jpg?alt=media&token=b340f655-81d0-4f98-9722-1e2dcd0ddcee",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-11%2F3.jpg?alt=media&token=ce43265f-3fca-4965-9178-972220efd7f9",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-11%2F4.jpg?alt=media&token=b7f508d5-ce19-45eb-8c83-a329b93ba1cc",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-11%2Fthmb.jpg?alt=media&token=4b69886d-2be2-4392-8a6c-c57280196046",
    policy: [
      { warranty: null, icon: "warranty" },
      { deliveryDate: { from: 3, to: 5 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "18'' H x 42'' L x 24'' D",
      madeIn: "Việt Nam",
      material: ["Gỗ công nghiệp"],
      belongings: null,
    },
  },
  {
    initialPrice: 1800000,
    title: "Tủ cạnh giường Guilford",
    category: { value: "bed-room", name: "Phòng ngủ" },
    productType: "closet-cabinet",
    distributor: { name: "Decox", search: "decox" },
    tags: {
      new: false,
      bestSeller: false,
      discount: false,
      freeShip: false,
      gift: false,
    },
    promotion: [],
    sort: [
      {
        type: "color",
        defaultValue: "black",
        name: "Màu sắc",
        values: [
          { value: "black", name: "Đen", default: true },
          { value: "white", name: "Trắng" },
        ],
      },
    ],
    images: [
      {
        type: "black",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-12%2Fblack-1.jpg?alt=media&token=ac3d58c3-6a93-4d4c-9c1e-2eb51b941f27",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-12%2Fblack-2.jpg?alt=media&token=7def6c70-3c26-43af-a5b1-78ad827d9f3f",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-12%2Fblack-3.jpg?alt=media&token=2eb63e06-fdec-46c7-ba23-c33f8e785647",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-12%2Fblack-4.jpg?alt=media&token=5d89e3e7-2ab2-46ee-83c5-fe54a2d96f7c",
        ],
      },
      {
        type: "white",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-12%2Fwhite-1.jpg?alt=media&token=01c1c551-ddc7-4644-bcba-a03bdec73c0c",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-12%2Fwhite-2.jpg?alt=media&token=d283284e-ffff-4fa8-8a89-de0b552b1c15",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-12%2Fwhite-3.jpg?alt=media&token=7096d88f-414c-40ac-a55c-bfe399acd7b1",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-12%2Fwhite-4.jpg?alt=media&token=60460ca9-e759-4868-9255-8ea1245d0302",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-12%2Fthmb.jpg?alt=media&token=f4163d7a-0bc2-4b29-810c-715e34f633d9",
    policy: [
      { warranty: null, icon: "warranty" },
      { deliveryDate: { from: 4, to: 7 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "19.06'' H x 14.92'' W x 12.5'' D",
      madeIn: "Việt Nam",
      material: ["Gỗ công nghiệp"],
      belongings: null,
    },
  },
  {
    initialPrice: 5600000,
    title: "Tủ bếp Tressa",
    category: { value: "kitchen", name: "Nhà bếp" },
    productType: "closet-cabinet",
    distributor: { name: "Chilai", search: "chi-lai" },
    tags: {
      new: false,
      bestSeller: true,
      discount: 15,
      freeShip: true,
      gift: false,
    },
    promotion: [
      {
        freeShipCode: "ChilaiFreeShip",
      },
    ],
    sort: [],
    images: [
      {
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-13%2F1.jpg?alt=media&token=c220da7b-d8cd-42df-b908-cfaa18342838",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-13%2F2.jpg?alt=media&token=1778aa44-cd2f-401b-8bf8-6136695c9da4",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-13%2F3.jpg?alt=media&token=003d199f-4906-4a98-9b65-716b40f712c5",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-13%2F4.jpg?alt=media&token=f99a04af-6f94-4480-b7d2-1c1baf4a0a3d",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-13%2Fthmb.jpg?alt=media&token=e2445b19-d30b-4fd7-9d7d-4fe0858fd424",
    policy: [
      { warranty: { time: 1, unit: "năm" }, icon: "warranty" },
      { deliveryDate: { from: 3, to: 5 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "35.98'' H x 35.67'' W x 16.54'' D",
      madeIn: "Việt Nam",
      material: ["Gỗ công nghiệp", "Thủy tinh"],
      belongings: null,
    },
  },
  {
    initialPrice: 7200000,
    title: "Ghế sofa Theodore",
    category: { value: "living-room", name: "Phòng khách" },
    productType: "chair",
    distributor: { name: "Phố Xinh", search: "pho-xinh" },
    tags: {
      new: true,
      bestSeller: false,
      discount: false,
      freeShip: true,
      gift: false,
    },
    promotion: [
      {
        freeShipCode: "PhoXinhFreeShip",
      },
    ],
    sort: [
      {
        type: "color",
        defaultValue: "beige",
        name: "Màu sắc",
        values: [
          { value: "beige", name: "Be", default: true },
          { value: "blue", name: "Xanh dương" },
        ],
      },
    ],
    images: [
      {
        type: "beige",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-14%2Fbeige-1.jpg?alt=media&token=99f89f2c-4535-4ca1-be55-4db6cc4c0044",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-14%2Fbeige-2.jpg?alt=media&token=efa9231a-0064-4a4c-9255-b1a829a0531c",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-14%2Fbeige-3.jpg?alt=media&token=20f49943-8465-4290-a2de-2aaf9b418b48",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-14%2Fbeige-4.jpg?alt=media&token=7b40cd96-3ed2-4641-9d7c-4309920fbb67",
        ],
      },
      {
        type: "blue",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-14%2Fblue-1.jpg?alt=media&token=ea915dd9-caae-4f78-9757-021030d071b8",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-14%2Fblue-2.jpg?alt=media&token=9bdc32b2-f09c-48bc-a806-ef6662f7a240",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-14%2Fblue-3.jpg?alt=media&token=8b62ef1b-ed1f-4b23-b4bf-9160de3286a8",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-14%2Fblue-4.jpg?alt=media&token=dccd3d28-19e1-41fb-858b-3ab852ea5092",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-14%2Fthmb.jpg?alt=media&token=30dd9f12-fa60-473f-a78c-b288772932c5",
    policy: [
      { warranty: { time: 1.5, unit: "năm" }, icon: "warranty" },
      { deliveryDate: { from: 3, to: 5 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "36'' H x 55'' W x 30'' D",
      madeIn: "Việt Nam",
      material: ["Gỗ công nghiệp", "Vải polyester"],
      belongings: null,
    },
  },
  {
    initialPrice: 16000000,
    title: "Tủ quần áo đa dụng Home Storage",
    category: { value: "bed-room", name: "Phòng ngủ" },
    productType: "closet-cabinet",
    distributor: { name: "Hòa Phát", search: "hoa-phat" },
    tags: {
      new: false,
      bestSeller: false,
      discount: false,
      freeShip: true,
      gift: false,
    },
    promotion: [
      {
        freeShipCode: "HoaPhatFreeShip",
      },
    ],
    sort: [],
    images: [
      {
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-15%2F1.jpg?alt=media&token=54a59888-7a21-438a-ad0f-8cfd4bb3d0f1",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-15%2F2.jpg?alt=media&token=543bfd88-f9b0-450b-afee-9a5f691d3e71",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-15%2F3.jpg?alt=media&token=39efd2c2-f532-47fc-a230-c23b078583a2",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-15%2F4.jpg?alt=media&token=b52c625c-ba38-4a0a-9f6a-cf24040b1e5b",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-15%2Fthmb.jpg?alt=media&token=bc86e840-a3ea-4c26-a869-2dc20cfde1c0",
    policy: [
      { warranty: { time: 1.5, unit: "năm" }, icon: "warranty" },
      { deliveryDate: { from: 4, to: 7 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "84'' H x 113'' W x 16.75'' D",
      madeIn: "Việt Nam",
      material: ["Gỗ công nghiệp"],
      belongings: null,
    },
  },
  {
    initialPrice: 4200000,
    title: "Bộ 2 ghế phòng ăn Annabelle Velvet",
    category: { value: "kitchen", name: "Nhà bếp" },
    productType: "chair",
    distributor: { name: "Decox", search: "decox" },
    tags: {
      new: false,
      bestSeller: true,
      discount: 20,
      freeShip: false,
      gift: false,
    },
    promotion: [],
    sort: [
      {
        type: "color",
        defaultValue: "rose",
        name: "Màu sắc",
        values: [
          { value: "rose", name: "Hồng", default: true },
          { value: "green", name: "Xanh lá" },
        ],
      },
    ],
    images: [
      {
        type: "rose",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-16%2Frose-1.jpg?alt=media&token=96d2886f-8d31-47a3-a278-14cb40abbc4e",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-16%2Frose-2.jpg?alt=media&token=4e6b8dcf-7178-4bf4-a76c-e6a706b9e4b2",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-16%2Frose-3.jpg?alt=media&token=c260b0af-cad4-4889-b3b9-282bbd262b4e",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-16%2Frose-4.jpg?alt=media&token=ee33a74d-a7e7-40b0-8291-edb5d7c494e6",
        ],
      },
      {
        type: "green",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-16%2Fgreen-1.jpg?alt=media&token=96a4a4b1-0a3d-4e61-ba46-e4b12f674bc9",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-16%2Fgreen-2.jpg?alt=media&token=43c9eed6-76f7-46d0-a599-ca9aadb2258c",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-16%2Fgreen-3.jpg?alt=media&token=a507cb22-fd1c-42d7-91d5-565d2e4fa88c",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-16%2Fgreen-4.jpg?alt=media&token=e05dc74d-7547-4fc9-8bc6-7f613e722fbc",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-16%2Fthmb.jpg?alt=media&token=7b0078b0-f237-4a22-a169-91a4c7d43ab7",
    policy: [
      { warranty: null, icon: "warranty" },
      { deliveryDate: { from: 3, to: 5 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "35.98'' H x 35.67'' W x 16.54'' D",
      madeIn: "Việt Nam",
      material: ["Gỗ công nghiệp", "Vải polyester", "Cao su"],
      belongings: null,
    },
  },
  {
    initialPrice: 11000000,
    title: "Bàn cà phê Neko",
    category: { value: "living-room", name: "Phòng khách" },
    productType: "table",
    distributor: { name: "Chilai", search: "chilai" },
    tags: {
      new: true,
      bestSeller: false,
      discount: false,
      freeShip: true,
      gift: false,
    },
    promotion: [
      {
        freeShipCode: "ChilaiFreeShip",
      },
    ],
    sort: [],
    images: [
      {
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-17%2F1.jpg?alt=media&token=15cabc09-86f2-4e5c-adf1-f7c7230ad173",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-17%2F2.jpg?alt=media&token=526ddfdf-f6f1-4ab5-861e-42ec7c5926f4",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-17%2F3.jpg?alt=media&token=cc3b28a9-15b6-4edd-93a5-e9e5dd1daf74",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-17%2F4.jpg?alt=media&token=11fc8437-414f-4f51-a77f-3ce0bee109f0",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-17%2Fthmb.jpg?alt=media&token=1203e83d-31a5-454f-b3f3-da15e06c4a23",
    policy: [
      { warranty: null, icon: "warranty" },
      { deliveryDate: { from: 3, to: 5 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "36'' H x 55'' W x 30'' D",
      madeIn: "Việt Nam",
      material: ["Thép không gỉ", "Đá granit"],
      belongings: null,
    },
  },
  {
    initialPrice: 2000000,
    title: "Tủ cạnh giường Dillwyn",
    category: { value: "bed-room", name: "Phòng ngủ" },
    productType: "closet-cabinet",
    distributor: { name: "Phố Xinh", search: "pho-xinh" },
    tags: {
      new: false,
      bestSeller: false,
      discount: false,
      freeShip: false,
      gift: false,
    },
    promotion: [],
    sort: [
      {
        type: "color",
        defaultValue: "white",
        name: "Màu sắc",
        values: [
          { value: "white", name: "Trắng", default: true },
          { value: "walnut", name: "Vân gỗ" },
        ],
      },
    ],
    images: [
      {
        type: "white",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-18%2Fwhite-1.jpg?alt=media&token=c466e734-bf29-408f-bc66-140e560649f9",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-18%2Fwhite-2.jpg?alt=media&token=b6b3f904-f444-49bd-b200-ae9418fc651d",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-18%2Fwhite-3.jpg?alt=media&token=90dd4342-13f4-4c39-803c-269aee8b8b59",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-18%2Fwhite-4.jpg?alt=media&token=4919f74a-0110-44b2-9d05-1b0c4afd92b0",
        ],
      },
      {
        type: "walnut",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-18%2Fwalnut-1.jpg?alt=media&token=a10ead44-08c8-4c5e-bf74-72aaf1ec3ea7",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-18%2Fwalnut-2.jpg?alt=media&token=0f826099-7e6c-4e2f-9f34-5be77be14bb1",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-18%2Fwalnut-3.jpg?alt=media&token=172925d3-9edb-485c-a90a-512df414d03b",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-18%2Fwalnut-4.jpg?alt=media&token=4aa7a77e-72e5-4e58-babc-78b2706a1099",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-18%2Fthmb.jpg?alt=media&token=40cb1474-5180-4347-80d8-ab8cafa4c182",
    policy: [
      { warranty: null, icon: "warranty" },
      { deliveryDate: { from: 4, to: 7 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "16.65'' H x 15.75'' W x 15.85'' D",
      madeIn: "Việt Nam",
      material: ["Gỗ công nghiệp"],
      belongings: null,
    },
  },
  {
    initialPrice: 7000000,
    title: "Bàn ăn Beaufort",
    category: { value: "kitchen", name: "Nhà bếp" },
    productType: "table",
    distributor: { name: "Hòa Phát", search: "hoa-phat" },
    tags: {
      new: false,
      bestSeller: true,
      discount: false,
      freeShip: true,
      gift: false,
    },
    promotion: [
      {
        freeShipCode: "HoaPhatFreeShip",
      },
    ],
    sort: [],
    images: [
      {
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-19%2F1.jpg?alt=media&token=78600b3f-e9e4-4506-a98c-336fdbe17da0",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-19%2F2.jpg?alt=media&token=95e6b946-f1b5-41da-8c22-f7023f1d8f06",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-19%2F3.jpg?alt=media&token=706be512-f64b-41d4-b690-317b06f3975b",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-19%2F4.jpg?alt=media&token=026e7ff1-2fde-4eb2-8303-9dd1d48f2d54",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-19%2Fthmb.jpg?alt=media&token=b2a9df24-b57d-44ed-891f-d2311323a107",
    policy: [
      { warranty: null, icon: "warranty" },
      { deliveryDate: { from: 3, to: 5 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "36'' L x 36'' D x 30'' H",
      madeIn: "Việt Nam",
      material: ["Gỗ công nghiệp", "Thép không gỉ"],
      belongings: null,
    },
  },
  {
    initialPrice: 4400000,
    title: "Bộ tủ TV Wodome",
    category: { value: "living-room", name: "Phòng khách" },
    productType: "closet-cabinet",
    distributor: { name: "Decox", search: "decox" },
    tags: {
      new: true,
      bestSeller: false,
      discount: false,
      freeShip: false,
      gift: false,
    },
    promotion: [],
    sort: [
      {
        type: "color",
        defaultValue: "white",
        name: "Màu sắc",
        values: [
          { value: "white", name: "Trắng", default: true },
          { value: "black", name: "Đen" },
        ],
      },
    ],
    images: [
      {
        type: "white",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-20%2Fwhite-1.jpg?alt=media&token=b25dc823-e497-424c-9e96-0af28a85c449",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-20%2Fwhite-2.jpg?alt=media&token=013c4870-c931-4462-8eea-a0f61a29c9a8",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-20%2Fwhite-3.jpg?alt=media&token=203a6c4f-dcf3-4ee0-8805-3d010a1d0220",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-20%2Fwhite-4.jpg?alt=media&token=a5452ca2-6c98-450c-b891-32b92b1ce16b",
        ],
      },
      {
        type: "black",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-20%2Fblack-1.jpg?alt=media&token=505d88d7-e814-4f23-994d-5564d7070409",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-20%2Fblack-2.jpg?alt=media&token=6b99ce33-a8cd-44a4-b313-2e0f488b64d7",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-20%2Fblack-3.jpg?alt=media&token=3bdb2674-6658-4334-9e8f-b5e68198573a",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-20%2Fblack-4.jpg?alt=media&token=9e7a07cc-73b9-4150-ad89-24f0d0be5bc4",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-20%2Fthmb.jpg?alt=media&token=32779d1d-c39e-4725-8cd9-ae13d6cc47c6",
    policy: [
      { warranty: null, icon: "warranty" },
      { deliveryDate: { from: 4, to: 7 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "17.7'' H x 13.8'' x 51.2'' x 17.7'' x 13.8''",
      madeIn: "Việt Nam",
      material: ["Gỗ công nghiệp", "Thủy tinh"],
      belongings: null,
    },
  },
  {
    initialPrice: 3600000,
    title: "Bộ giường Matheney",
    category: { value: "bed-room", name: "Phòng ngủ" },
    productType: "bed",
    distributor: { name: "Chilai", search: "chilai" },
    tags: {
      new: false,
      bestSeller: false,
      discount: false,
      freeShip: false,
      gift: false,
    },
    promotion: [],
    sort: [
      {
        type: "color",
        defaultValue: "black",
        name: "Màu sắc",
        values: [
          { value: "black", name: "Đen", default: true },
          { value: "gold", name: "Vàng" },
        ],
      },
    ],
    images: [
      {
        type: "black",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-21%2Fblack-1.jpg?alt=media&token=0c965077-65a1-4c33-b312-8815dd357c79",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-21%2Fblack-2.jpg?alt=media&token=edebfdb4-7914-4914-9775-22824a9ecf30",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-21%2Fblack-3.jpg?alt=media&token=1b9e6890-bc0a-48f0-9e27-9806f676b664",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-21%2Fblack-4.jpg?alt=media&token=edc1cf31-6a2f-49fb-b1f2-61a0c50f82d4",
        ],
      },
      {
        type: "gold",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-21%2Fgold-1.jpg?alt=media&token=75247bf6-ff6d-4994-8526-0e5991431be9",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-21%2Fgold-2.jpg?alt=media&token=a77dde09-5d26-4b29-81b2-be25156571c7",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-21%2Fgold-3.jpg?alt=media&token=ab614883-b833-458c-836c-2b88079a59f8",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-21%2Fgold-4.jpg?alt=media&token=005659ef-c8a0-495e-b70e-09afa7ab41f7",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-21%2Fthmb.jpg?alt=media&token=de049351-fdbd-4caf-8ef0-b01f74ae32ff",
    policy: [
      { warranty: { time: 2, unit: "năm" }, icon: "warranty" },
      { deliveryDate: { from: 4, to: 7 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "16.65'' H x 15.75'' W x 15.85'' D",
      madeIn: "Việt Nam",
      material: ["Thép không gỉ"],
      belongings: "Bộ khung đỡ",
    },
  },
  {
    initialPrice: 3200000,
    title: "Bộ 2 ghế phòng ăn Brady Velvet",
    category: { value: "kitchen", name: "Nhà bếp" },
    productType: "chair",
    distributor: { name: "Phố Xinh", search: "pho-xinh" },
    tags: {
      new: false,
      bestSeller: true,
      discount: 25,
      freeShip: false,
      gift: false,
    },
    promotion: [],
    sort: [
      {
        type: "color",
        defaultValue: "rose",
        name: "Màu sắc",
        values: [
          { value: "rose", name: "Hồng", default: true },
          { value: "gray", name: "Xám" },
        ],
      },
    ],
    images: [
      {
        type: "rose",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-22%2Frose-1.jpg?alt=media&token=96af8481-92a2-4679-afff-d9f458b70f45",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-22%2Frose-2.jpg?alt=media&token=5bb1fb32-ac68-4aae-8edb-ec86a7c81d75",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-22%2Frose-3.jpg?alt=media&token=35092690-a1b3-480e-b6fc-ea2cf855ca65",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-22%2Frose-4.jpg?alt=media&token=937e8bcb-89f0-4bd7-aca7-f5e3fc6f5c7c",
        ],
      },
      {
        type: "gray",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-22%2Fgray-1.jpg?alt=media&token=ba69b95f-609d-4499-9df4-f30ae8cf3f3b",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-22%2Fgray-2.jpg?alt=media&token=f03637d1-ff1a-4a37-b47b-2fa64cf312da",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-22%2Fgray-3.jpg?alt=media&token=039c21af-b0bc-419d-9754-a4a11cbc0c2b",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-22%2Fgray-4.jpg?alt=media&token=3a646b10-cd9a-45fd-ab60-451f41eb49ea",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-22%2Fthmb.jpg?alt=media&token=00d73dee-fb82-497f-88a2-6806b404ec17",
    policy: [
      { warranty: null, icon: "warranty" },
      { deliveryDate: { from: 3, to: 5 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "31.5'' H x 20.1'' W x 21.7'' D",
      madeIn: "Việt Nam",
      material: ["Vải polyester", "Cao su", "Thép không gỉ"],
      belongings: null,
    },
  },
  {
    initialPrice: 7200000,
    title: "Ghế sofa Abbigale",
    category: { value: "living-room", name: "Phòng khách" },
    productType: "chair",
    distributor: { name: "Hòa Phát", search: "hoa-phat" },
    tags: {
      new: true,
      bestSeller: false,
      discount: false,
      freeShip: true,
      gift: false,
    },
    promotion: [],
    sort: [
      {
        type: "color",
        defaultValue: "black",
        name: "Màu sắc",
        values: [
          { value: "black", name: "Đen", default: true },
          { value: "brown", name: "Nâu" },
        ],
      },
    ],
    images: [
      {
        type: "black",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-23%2Fblack-1.jpg?alt=media&token=c5c3857d-48af-4025-a70f-fd197a58117c",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-23%2Fblack-2.jpg?alt=media&token=e924c0e0-dc2a-4579-802c-b31df01d51aa",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-23%2Fblack-3.jpg?alt=media&token=f0f3f464-8470-402e-9ca4-211f072b2148",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-23%2Fblack-4.jpg?alt=media&token=ded05adb-26da-4be7-9989-523fd9d93958",
        ],
      },
      {
        type: "brown",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-23%2Fbrown-1.jpg?alt=media&token=c701a80f-417c-43dc-a391-c19fa9c0c76d",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-23%2Fbrown-2.jpg?alt=media&token=5e13ed67-d8cd-4ab3-b5f8-e2cad3d5d2fb",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-23%2Fbrown-3.jpg?alt=media&token=59c39e2d-42c4-488f-b9b7-9eb1f59c7171",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-23%2Fbrown-4.jpg?alt=media&token=fa8903e6-1cb6-40ee-aaa0-52ae4d34a99f",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-23%2Fthmb.jpg?alt=media&token=967cee4c-8037-44fb-bb08-4d47b02021c2",
    policy: [
      { warranty: { time: 2, unit: "năm" }, icon: "warranty" },
      { deliveryDate: { from: 3, to: 5 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "23'' H x 65.8'' W x 36'' D",
      madeIn: "Việt Nam",
      material: ["Gỗ công nghiệp", "Cao su"],
      belongings: "Bộ 2 gối",
    },
  },
  {
    initialPrice: 4200000,
    title: "Bộ giường Gerardi",
    category: { value: "bed-room", name: "Phòng ngủ" },
    productType: "bed",
    distributor: { name: "Decox", search: "decox" },
    tags: {
      new: false,
      bestSeller: false,
      discount: false,
      freeShip: false,
      gift: false,
    },
    promotion: [],
    sort: [],
    images: [
      {
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-24%2F1.jpg?alt=media&token=a15de48d-fcaa-4f5d-93d2-742850c1c3d2",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-24%2F2.jpg?alt=media&token=869da1ea-8586-4b83-91e3-b319bb6635bc",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-24%2F3.jpg?alt=media&token=5ce47311-5628-43b9-9d60-08a3a2fd668a",
          "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-24%2F4.jpg?alt=media&token=10eb281d-9a29-4165-9730-5307c0505f04",
        ],
      },
    ],
    thmbImage:
      "https://firebasestorage.googleapis.com/v0/b/shop-house-b4d1e.appspot.com/o/products%2Fproducts%2Fp-24%2Fthmb.jpg?alt=media&token=eb42e4c4-794c-439a-9b4b-b311b7c61f5b",
    policy: [
      { warranty: { time: 2, unit: "năm" }, icon: "warranty" },
      { deliveryDate: { from: 4, to: 7 }, icon: "delivery" },
      { gift: false, icon: "gift" },
    ],
    specs: {
      size: "45'' H x 41'' W x 75'' L",
      madeIn: "Việt Nam",
      material: ["Thép không gỉ", "Gỗ công nghiệp"],
      belongings: "Bộ khung đỡ",
    },
  },
];
