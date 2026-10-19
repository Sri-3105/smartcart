export const users = [
  { id: 1, name: "Sri", gmail: "sri@gmail.com", password: "1234", phno: 123, address: "Kalakad" },
  { id: 2, name: "Dev", gmail: "dev@gmail.com", password: "abcd", phno: 456, address: "Chennai" },
  { id: 3, name: "Nivi", gmail: "nivi@gmail.com", password: "5678", phno: 789, address: "Tirunelveli" },
];

// ---------- Product names by category ----------
const productNames = {
  women: {
    dresses: [
      "A-Line Cotton Dress", "Off-Shoulder Maxi Dress",
      "Denim Shirt Dress", "Printed Summer Dress", "Bodycon Party Dress",
      "Puff Sleeve Dress", "Polka Dot Midi Dress", "Velvet Evening Dress",
      "Striped Casual Dress"
    ],
    sarees: [
      "Kanchipuram Silk Saree", "Banarasi Silk Saree", "Chiffon Printed Saree",
      "Cotton Handloom Saree", "Georgette Party Saree", "Bandhani Print Saree",
      "Linen Casual Saree", "Organza Embroidered Saree", "Tussar Silk Saree",
      "Net Sequin Saree"
    ],
    tops: [
      "Ruffle Sleeve Top", "Crop Top", "Peplum Top", "Denim Shirt Top",
      "Printed Blouse Top", "Halter Neck Top", "Off-Shoulder Top", "Wrap Top",
      "Tunic Top", "Sleeveless Casual Top"
    ],
    footwear: [
      "Wedge Heels", "Flat Sandals", "Block Heel Sandals", "Ballet Flats",
      "Ankle Strap Heels", "Casual Sneakers", "Ethnic Juttis", "Platform Heels",
      "Slip-On Loafers", "Strappy Sandals"
    ]
  },
  men: {
    shirts: [
      "Formal White Shirt", "Checked Casual Shirt", "Denim Shirt",
      "Linen Summer Shirt", "Striped Office Shirt", "Printed Hawaiian Shirt",
      "Slim Fit Shirt", "Cotton Kurta Shirt", "Plain Pastel Shirt",
      "Full Sleeve Formal Shirt"
    ],
    tshirts: [
      "Round Neck T-Shirt", "Polo T-Shirt", "Graphic Print T-Shirt",
      "V-Neck T-Shirt", "Full Sleeve T-Shirt", "Striped T-Shirt",
      "Oversized T-Shirt", "Henley T-Shirt", "Sports T-Shirt",
      "Plain Cotton T-Shirt"
    ],
    trousers: [
      "Formal Trousers", "Slim Fit Chinos", "Cargo Trousers", "Denim Jeans",
      "Track Pants", "Cotton Casual Trousers", "Pleated Formal Pants",
      "Jogger Pants", "Corduroy Trousers", "Linen Trousers"
    ],
    footwear: [
      "Formal Leather Shoes", "Casual Sneakers", "Loafers",
      "Sports Running Shoes", "Sandals", "Canvas Shoes", "Boat Shoes",
      "Ankle Boots", "Slip-On Shoes", "Flip Flops"
    ]
  },
  boys: {
    shirts: [
      "Checked Casual Shirt", "Printed Cotton Shirt", "Denim Shirt",
      "Formal White Shirt", "Striped Shirt", "Half Sleeve Shirt",
      "Party Wear Shirt", "Plain Shirt"
    ],
    tshirts: [
      "Cartoon Print T-Shirt", "Round Neck T-Shirt", "Polo T-Shirt",
      "Graphic T-Shirt", "Striped T-Shirt", "Sports T-Shirt",
      "Full Sleeve T-Shirt", "Plain Cotton T-Shirt"
    ],
    shorts: [
      "Denim Shorts", "Cargo Shorts", "Sports Shorts", "Printed Shorts",
      "Cotton Shorts", "Checked Shorts", "Track Shorts", "Casual Shorts"
    ]
  },
  girls: {
    frocks: [
      "Floral Print Frock", "Party Wear Frock", "Cotton Casual Frock",
      "Net Frilly Frock", "Printed A-Line Frock", "Polka Dot Frock",
      "Sleeveless Frock", "Embroidered Frock"
    ],
    tops: [
      "Printed Top", "Ruffle Top", "Crop Top", "Sleeveless Top",
      "Peplum Top", "Floral Top", "Denim Top", "Casual Cotton Top"
    ],
    skirts: [
      "Pleated Skirt", "Denim Skirt", "Tutu Skirt", "A-Line Skirt",
      "Printed Skirt", "Frilled Skirt", "Cotton Skirt", "Party Wear Skirt"
    ]
  },
  jewellery: {
    necklace: [
      "Gold Plated Necklace", "Pearl Necklace", "Kundan Necklace",
      "Choker Necklace", "Antique Temple Necklace", "Beaded Necklace",
      "Diamond Look Necklace", "Layered Necklace"
    ],
    earrings: [
      "Jhumka Earrings", "Stud Earrings", "Hoop Earrings",
      "Chandelier Earrings", "Pearl Drop Earrings", "Kundan Earrings",
      "Oxidised Earrings", "Danglers"
    ],
    bangles: [
      "Gold Plated Bangles", "Glass Bangles Set", "Oxidised Bangles",
      "Kundan Bangles", "Metal Bangles", "Beaded Bangles",
      "Temple Design Bangles", "Colorful Bangles Set"
    ],
    rings: [
      "Gold Plated Ring", "Kundan Ring", "Adjustable Ring",
      "Stone Studded Ring", "Oxidised Ring", "Pearl Ring",
      "Statement Ring", "Minimal Band Ring"
    ]
  },
  homeDecor: {
    kitchen: [
      "Non-Stick Cookware Set", "Wooden Chopping Board", "Ceramic Dinner Set",
      "Stainless Steel Container Set", "Glass Storage Jars",
      "Kitchen Organizer Rack", "Electric Kettle", "Wooden Spoon Set",
      "Insulated Casserole", "Kitchen Towel Set"
    ],
    lighting: [
      "LED Wall Lamp", "Fairy String Lights", "Table Lamp",
      "Hanging Pendant Light", "Decorative Lantern", "Night Lamp",
      "Chandelier Light", "Study Lamp", "Solar Garden Light",
      "Ceiling Light Fixture"
    ],
    wallDecor: [
      "Wall Clock", "Framed Wall Art", "Wooden Wall Shelf", "Wall Mirror",
      "Photo Frame Set", "Wall Sticker Decal", "Macrame Wall Hanging",
      "Wall Mounted Plant Holder", "Canvas Painting", "Metal Wall Art"
    ],
    furniture: [
      "Wooden Coffee Table", "Bean Bag", "Folding Study Table", "Bookshelf",
      "Wooden Stool", "Shoe Rack", "TV Console Unit", "Storage Ottoman",
      "Wooden Bench", "Side Table"
    ],
    usefulProducts: [
      "Multi-Purpose Storage Box", "Laundry Basket", "Door Mat Set",
      "Umbrella Stand", "Wall Hooks Set", "Shoe Organizer", "Curtain Set",
      "Cushion Cover Set", "Bedsheet Set", "Table Runner"
    ]
  },
  electronics: {
    mobiles: [
      "5G Smartphone 128GB", "Budget Android Phone", "Flagship Camera Phone",
      "Gaming Smartphone", "Dual SIM Smartphone", "AMOLED Display Phone",
      "Compact Smartphone", "Foldable Smartphone", "5G Smartphone 256GB",
      "Slim Bezel-less Phone"
    ],
    laptops: [
      "Slim Business Laptop", "Gaming Laptop", "Student Laptop",
      "2-in-1 Touchscreen Laptop", "Ultrabook Thin Laptop", "MacBook Style Laptop",
      "Budget Laptop", "High Performance Laptop", "Convertible Laptop",
      "15-inch Full HD Laptop"
    ],
    accessories: [
      "Wireless Mouse", "Wired Optical Mouse", "Bluetooth Headphones",
      "Wired Earphones", "Wireless Earbuds", "Fast Charger 20W",
      "Type-C Charging Cable", "Power Bank 10000mAh", "Bluetooth Speaker",
      "Smartwatch", "Laptop Bag", "Keyboard & Mouse Combo",
      "USB Hub Adapter", "Phone Cover & Case", "Screen Protector Glass"
    ]
  },
  toys: {
    toys: [
      "Remote Control Car", "Building Blocks Set", "Soft Teddy Bear",
      "Action Figure Set", "Puzzle Game Board", "Musical Toy Piano",
      "Doll House Set", "Toy Kitchen Set", "Battery Operated Robot",
      "Rubik's Cube", "Toy Train Set", "Water Gun", "Kids Tricycle",
      "Building Blocks Mega Set", "Toy Helicopter", "Board Game Family Pack",
      "Soft Plush Animal", "Kids Drawing Board", "Toy Bike", "Bubble Gun Toy"
    ]
  },
  books: {
    books: [
      "Mystery Thriller Novel", "Romance Fiction Book", "Fantasy Adventure Novel",
      "Crime Thriller Book", "Classic Literature Novel", "Science Fiction Book",
      "Historical Fiction Novel", "Short Stories Collection", "Self-Help Book",
      "Biography Book", "Motivational Book", "Personal Finance Book",
      "Business Strategy Book", "Psychology Book", "Health & Wellness Book",
      "Competitive Exam Guide", "Programming Language Book", "General Knowledge Book",
      "English Grammar Book", "Interview Preparation Book"
    ]
  }
};

// ---------- Real image links (key = "category|productName" to avoid name clashes) ----------
const imageOverrides = {
  // ===== WOMEN - Dresses =====
  "women|A-Line Cotton Dress": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT1z_Mk5f6-PWsyTI2uCxIfS3CbOgTPhLxc4vP2qAuCRsXuxfob7N2qEo40sSKqgfNG7-qPtsYtX6L7HwUgIWpbWepFvnughWMG21DtcpWrP7EVj2aJT5WxQg",
  "women|Off-Shoulder Maxi Dress": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTylDbFHI6t077juABGL5CrEpR9tDttMNUSZW9RNx2C3Q&s=10",
  "women|Denim Shirt Dress": "https://m.media-amazon.com/images/I/81gK+EtCoJL._AC_UY1100_.jpg",
  "women|Printed Summer Dress": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSDdHtN_B-OwzDOUz4aeCUFjA0Pp1KdsvCVGAdGlSfyw&s=10",
  "women|Bodycon Party Dress": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1c2QacybKco2t-byQ5fDDnndZeXnQ9usrXKKLOy5Nfg&s",
  "women|Puff Sleeve Dress": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2XhHk_Mn9OQoKoxjlqf6yfz3XAMYI34UbekQaf7jI-g&s=10",
  "women|Polka Dot Midi Dress": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYDiSbsPHOXy4a8_q9rzfiKQQJ-vEbTQxXLdRJftxGpQ&s=10",
  "women|Velvet Evening Dress": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZjH0zhEbC8sBM3qujGVVxb8b9UC43t1A4TUxNebl7Aw&s=10",
  "women|Striped Casual Dress": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDdRlSsYJKfRwNLT2U_4cCO5njyBSO-ob_8pawctygxQ&s=10",

  // ===== WOMEN - Sarees =====
  "women|Kanchipuram Silk Saree": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEJHWQS026_My9vxl7sW8ilrAAR4nzE1qtuNhb9uEdt3oEkpirXeXqdK0&s=10",
  "women|Banarasi Silk Saree": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSwuY21PC_rbW9Lmd6VaZc2g9FGTRNV_tYm0W1_oI0pw&s=10",
  "women|Chiffon Printed Saree": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2TPRru2qnyyWkY4MRHofA8Ml7Bn0-TOmysvixmXhM5Q&s=10",
  "women|Cotton Handloom Saree": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6rj1ITTvH9kUF0g9WbPREdBIQ1Ir3nyrBPsn0VU_rMQ&s=10",
  "women|Georgette Party Saree": "https://i.etsystatic.com/12647384/r/il/eafed2/4927034911/il_570xN.4927034911_5t4p.jpg",
  "women|Bandhani Print Saree": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdLmwWTQicbTn_GCa4bp_2VeREC74yiAvM6JvsL-Tfwg&s=10",
  "women|Linen Casual Saree": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGLIxvBrsvEo3_-zQgo-7YAlRspP9i_8kj1V4VVtB09A&s=10",
  "women|Organza Embroidered Saree": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm5fnipDHCuoP5KQvSDUBSylaJ5I6unMfhgKrgI0aWNQ&s=10",
  "women|Tussar Silk Saree": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShk07UJUXzb8MdDb1x_elm-ieUPXzLebjN9g30P-f5jw&s=10",
  "women|Net Sequin Saree": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxlfHXWLNtzSc0_mKnrohpsVrUHgDzFv987W3Lf1p9_g&s=10",

  // ===== WOMEN - Tops =====
  "women|Ruffle Sleeve Top": "https://assets.myntassets.com/w_412,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2026/FEBRUARY/3/WCagpOJw_1804d5e8718b4eb8adbc325bd34eb61e.jpg",
  "women|Crop Top": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8LObOx-15uX6gqtJqL-Tz8sZSp8Lfl-Zuqa-bbafS3A&s=10",
  "women|Peplum Top": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ReUN5h2qg_IjwWG8Taxhsa5TuWnRp644BZa5QKLLMQ&s=10",
  "women|Denim Shirt Top": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLjhtWuZkEopdlzFUMoIw72yKZl0GUTPRaNP_KJRiO1A&s=10",
  "women|Printed Blouse Top": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFVRR3viHsY3HU6pHAc7nLd_hqMItzoIN2wis_NgA-Qg&s=10",
  "women|Halter Neck Top": "https://assets.ajio.com/medias/sys_master/root1/20260408/Cqjc/69d619379e784a25d5c98023/-473Wx593H-466853178-maroon-MODEL.jpg",
  "women|Off-Shoulder Top": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw37vg4eWOz3c_p5V3pZ-VRPDjOxmvGHxu-CzyP_j2wA&s=10",
  "women|Wrap Top": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4glRpPFsRQPecexD099KAgLOO-v2qpAQ8ulQoamFe9Q&s=10",
  "women|Tunic Top": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdS46xJwfmjrAE5jKbqL82ecI1xOJx5Dt_wP3Dy7YvFg&s=10",
  "women|Sleeveless Casual Top": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfk3hyuX51SpwipbccfXtN7E9is4qioEr79dPk_qKqsQ&s=10",

  // ===== WOMEN - Footwear =====
  "women|Wedge Heels": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDsP2Ir7f2yRnMJJG8N9S8BNOsLbfnBJ9F1TmZ77rbWg&s=10",
  "women|Flat Sandals": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-G-taakrDZ-fhttKj8rhc0wqzwrk-_z1GaQOBRcPGiQ&s=10",
  "women|Block Heel Sandals": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp37f0pCq0TonI4VNVSF0mpM_iGg-43w5TFWo22ppgUQ&s=10",
  "women|Ballet Flats": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpbIhMoMocFx3_zXzDMgWKC8qsnIRzT3QyZLeT-P99_w&s=10",
  "women|Ankle Strap Heels": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAYk1k6RYxTp--uE7pAM_SUIyoaF_Sfse4iuqn4lmyRw&s=10",
  "women|Casual Sneakers": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxMCLQ64PUzjAilXRrmmbok8vjKjIOpXjOMejnOq3J9w&s=10",
  "women|Ethnic Juttis": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTzawVR7z763zY59EhuIR7a277W9Pn9wGTwdHxgnSNwA&s=10",
  "women|Platform Heels": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV6i_PCsrThX-UR_n7vRuN62wpksD4xZ9I6qCA_nuCdQ&s=10",
  "women|Slip-On Loafers": "https://warehousestore.in/cdn/shop/files/pomelli_photoshoot_image_1_1_0531_14.jpg?v=1780223782",
  "women|Strappy Sandals": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm8CT9vJ6G0lH76X2V6BHAMhYenS7R1_wcNw4BKiyhVg&s=10",

  // ===== MEN - Shirts =====
  "men|Formal White Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMO8TJQu14ePSK7n65alP2MvDNXv4p3rmkP58YeM-z0A&s=10",
  "men|Checked Casual Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIHn0Hi9veZjTilJAiYOhwMeFd47H6V4PLXyJz2L2ww&s",
  "men|Denim Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE0wGT6yc7mo6L1CAp3ArzjMCE6EOHq58IfOgjQjyHhQ&s=10",
  "men|Linen Summer Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfP2n35wubbCpG-MDBbqsin9mJc-d-rQ9uoAX5-AiL_w&s=10",
  "men|Striped Office Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN84M8vLCdZ8gokb34iPsUZl1id3Q_VPrfPBwjqQIQ6Q&s=10",
  "men|Printed Hawaiian Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxIzid264EX5uovu5ZRmbFjlFieJqnrkHtyr1E6-rjA&s=10",
  "men|Slim Fit Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0A017Ipf1krmhfqE2ZtwuNSn1G3iXlWRWMCG0DUgVAg&s=10",
  "men|Cotton Kurta Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuw_OIGHGMlwQUr5SkxJKxyZi4rWk7AF48ALoA1Gz7wg&s=10",
  "men|Plain Pastel Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjF66IFKrXbEb1cFc_82lHXJsMuFxQxZrsA51qVtp2cg&s=10",
  "men|Full Sleeve Formal Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoroxf4RRAY_wh8Z7il3G592dckRBj8zTdzY6tIogACQ&s=10",

  // ===== MEN - T-Shirts =====
  "men|Round Neck T-Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiy6fO1R8I_Q3UzspIRTN2vVkB01Rl_jj9oVEcNIksEw&s=10",
  "men|Polo T-Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmBBZHFDfvv85Su2k2FB1Ut8Alcqhdm214f7_OmI0lUw&s=10",
  "men|Graphic Print T-Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDGU-Ji5Ek_1niduBbenrGlQSb4rh1-7L8sUc4bZiXpQ&s=10",
  "men|V-Neck T-Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbcnJGLQv3e3OZLKegAibJ4k8tCYC2gzUSm6GTI8uatw&s=10",
  "men|Full Sleeve T-Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR54VHqALicFTF2XSW8_0_PwIOQnetiUn5DiI5qFxGNMw&s=10",
  "men|Striped T-Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMUvQ0sz6_OzKpACMfvY3dTUUVvVS1zBqLl9oNkslMuQ&s=10",
  "men|Oversized T-Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8H2oycoRHbTTJ-vIyB4KxAWP4mcpS73U1E85OD42FNg&s=10",
  "men|Henley T-Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrBKYn7vqn2hHJRRNSCxwAy2rDtBxXIXii_Rv75e4KSw&s=10",
  "men|Sports T-Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTooE_Sp77eqfwe6pfDCJv_70i9aymlY9UXeG1vX8dVLA&s=10",
  "men|Plain Cotton T-Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFZ_W0NjYD9rwKwsn7U4yIr24PnL8BU2tPE3MoZk4m7Q&s=10",

  // ===== MEN - Trousers =====
  "men|Formal Trousers": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2_kx4jZfvZPvR7VN-Ga3106KoowVo1PlRoR8ZiW2t5A&s=10",
  "men|Slim Fit Chinos": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhOfURwjdUK4eotPZcX5fFZSnMOJVHMNWW4Q4o3z1TVg&s=10",
  "men|Cargo Trousers": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUXx8or06uLqcKEuwFDrdFo62tAXhDn-9HmTJ-D39F3w&s=10",
  "men|Denim Jeans": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2GMKjdj9dyqaRt8kcEVFbyHhn6H5EQRdxWKOSpK43Lw&s=10",
  "men|Track Pants": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZko-4Tv42E5x0M8UWfd0HZ-AmM-gUao5uVEUbgnRAqg&s=10",
  "men|Cotton Casual Trousers": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOUTMQaZqI_KKhwoTogx1GRorVLLNnasfeah-PscahcQ&s=10",
  "men|Pleated Formal Pants": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvu3Oa9oxzkK2VpGhPCUNNED0iHSHlyROLwD_PeS68CQ&s=10",
  "men|Jogger Pants": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfM-h3T_Ux-vZB2TByxLA41gftHFMwWuT2ogI-1l0rTQ&s=10",
  "men|Corduroy Trousers": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnrp1gQPjHOmJUdkFQTfJykbTeXCpqOIDjOb-mvr5kw&s=10",
  "men|Linen Trousers": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqcOrttBAa6iSYKoGvECKPAmdWKO3sB4pYjdOgmUlxhA&s=10",

  // ===== MEN - Footwear =====
  "men|Formal Leather Shoes": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Krpm14O7jl4RAy23Vljhmrvs9U_eayxoKlabo1ugfA&s=10",
  "men|Casual Sneakers": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSegYJdv3YE7ULDNQuFzojyNKSgk8MgbE34Q0ZI1fGw&s=10",
  "men|Loafers": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrX1fWXLBc970WytZINn7vYqU8NV5JPrikRUkF4KvPEA&s",
  "men|Sports Running Shoes": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEEE2k8BObOZ9Kf8NFJtSWJdtPCYvjNRnJpIfgc5iVQA&s=10",
  "men|Sandals": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1XJwaS6oKgb1gQeGbzxwJF2i7wP8CG8__sM7y6SBR6g&s=10",
  "men|Canvas Shoes": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCxTMszeE6rWBS7trTUtv8zDSo8Q0qe9XWQCL4aknKrw&s=10",
  "men|Boat Shoes": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfm5DX4eSqcmA9qSDiNuM9iBIa5exl5vg4alvHvj8GoQ&s=10",
  "men|Ankle Boots": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFvGs-Jomyuyp4wv1WB-_RiBU5l4vuqCzaoDOt8b4tFQ&s=10",
  "men|Slip-On Shoes": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-6RU0lgV5Pespb8OxkWM76-tkfW1u0OAF1hO7y0p77g&s=10",
  "men|Flip Flops": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT_z-B3qLk2nXLu7Td3c4IDXssy5upJpLdonxNFlVx2g&s=10",

  // ===== BOYS - Shirts =====
  "boys|Checked Casual Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8T81mUrxyMP7Gct6JUszf1WEdZ2ey_2MoZPq_8XxS5A&s",
  "boys|Printed Cotton Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJT_1mdLddQFzhW3ds1ipwLE6IsMEsMcgPg0oKgX7RoQ&s=10",
  "boys|Denim Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ6h-DtVfEg4rQMxnxi9mrDISJVlkcAjYFBCSL0a4GJg&s",
  "boys|Formal White Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3eEIuDVJeo_-b9KUsCGByCDitHimS6LO3sIAw4jsRCA&s=10",
  "boys|Striped Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbwG_WguY4l1zurfAjvA6uz8TNyb8shYmUY3wtnw6VLg&s",
  "boys|Half Sleeve Shirt": "https://polkatots.in/cdn/shop/files/1_43efeeec-f047-4fb8-965c-cac60f3a7959.jpg?v=1780903037&width=1000",
  "boys|Party Wear Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRlGy9WmGe-rVniSbIDwicQUWWwUwvJk1I8m8EXRFHaw&s=10",
  "boys|Plain Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUtktAzv9cxPKWMsqGdrz6iyeLwEJ-eZnFZj4EEncm_w&s=10",

  // ===== BOYS - T-Shirts =====
  "boys|Cartoon Print T-Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8T81mUrxyMP7Gct6JUszf1WEdZ2ey_2MoZPq_8XxS5A&s",
  "boys|Round Neck T-Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJT_1mdLddQFzhW3ds1ipwLE6IsMEsMcgPg0oKgX7RoQ&s=10",
  "boys|Polo T-Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwEqyXZ0AjeujSsUSUWj96DoX8jSMijgISOTkFRT_CBw&s=10",
  "boys|Graphic T-Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3eEIuDVJeo_-b9KUsCGByCDitHimS6LO3sIAw4jsRCA&s=10",
  "boys|Striped T-Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxS5xmKOAW2GbPBaFGFEzKjtAz9GqB3yhr2umBblmDJg&s=10",
  "boys|Sports T-Shirt": "https://polkatots.in/cdn/shop/files/1_43efeeec-f047-4fb8-965c-cac60f3a7959.jpg?v=1780903037&width=1000",
  "boys|Full Sleeve T-Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjaYjv8_-gwtACldquLS57URaOLq71KC4RWizL6eE8g&s",
  "boys|Plain Cotton T-Shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGHovPkHT7TKQKJSJpQ5LxIf9KunaJh07mwim-S69XKA&s=10",

  // ===== BOYS - Shorts =====
  "boys|Denim Shorts": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwFHeq5bbLii-OjSblE3xj6k0Ig7cmUDU6qfr7uoHqdw&s=10",
  "boys|Cargo Shorts": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkNTuq2c4U7Ckcqbkhz7Wap7SuwM5IdNnn_M-BW0Slnw&s=10",
  "boys|Sports Shorts": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-IXOzznG7RYjENwo5t5V9aFPNvbrEa98wsdSibr7u8g&s=10",
  "boys|Printed Shorts": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7VAHoOFatjfIrd6S2lnrXlwLWS42xpS8I_Tiwu4yKWw&s=10",
  "boys|Cotton Shorts": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3dkpLtqek0-Pu_teEZKCWQMz7TTu3cvy3VowCNbIeyg&s",
  "boys|Checked Shorts": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS02FkroXt69p9mxnGdt0li3fRCzWk0lrXnV8QW5rWslg&s=10",
  "boys|Track Shorts": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSwjC5AcYMUQ6s0D_8SCliDEX-7SgfUvKZRgcNxqH23w&s=10",
  "boys|Casual Shorts": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvG2ot1zKTAoqs_KfNu3xRHLrlg_P-MbyZLC2O7iFDQQ&s",

  // ===== GIRLS - Frocks =====
  "girls|Floral Print Frock": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaXSSv82EH-4T1JRxGDsTKERRh1VSDMgVhDVz8c6RvhA&s=10",
  "girls|Party Wear Frock": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHzmG25dxg9OWo4oq9oflW8q_hjp_fdiznR3Pv2ceYGQ&s=10",
  "girls|Cotton Casual Frock": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6UX7xMiPUmTLBv1QEmOBHI2-aIU0nGmOXHntZLSdqKw&s=10",
  "girls|Net Frilly Frock": "https://stanwellskids.in/cdn/shop/files/1_11092d10-8d0e-4b3a-97a7-5d789a3aca0a.jpg?v=1765619181&width=1080",
  "girls|Printed A-Line Frock": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTd8sXp-Su3cirJIf9wSlOYrpRwV0mj_sVpEYjKwgkQg&s",
  "girls|Polka Dot Frock": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6rG8oa44syJq2L2NMutu9CM9oGCKJAZp2pydx29L0j8TEHbQysBz_8VA&s=10",
  "girls|Sleeveless Frock": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbeO6VKgQUUe-9xDt4RZZ10xX0MH0Euhi6i7gayu2sHg&s=10",
  "girls|Embroidered Frock": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS50GZCBEotjradSBYkmXTEsNy84eLNVmeeSiubHqa-tw&s=10",

  // ===== GIRLS - Tops =====
  "girls|Printed Top": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Bkbza95HPqHQyecGBYCnQcyPaHN2KJNiiWCA14sFRQ&s=10",
  "girls|Ruffle Top": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqXMG7tG6j1cUVP-kTtoNHWipdUlL4lGhyUPuSg17CUg&s",
  "girls|Crop Top": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjNkAM8-ByWow5bQbW5tTT46DNfxUqz_H-ffQJvG8loA&s=10",
  "girls|Sleeveless Top": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_e8Bf3U7jKLC4WERHMKc4Plu7eAOtSByiNsTINsHzIw&s=10",
  "girls|Peplum Top": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnYtuHjuk7GE--m0iCR4nNMLzW0DwuF6Uw6RKUfYwILg&s=10",
  "girls|Floral Top": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxAeuvck61Std7Ah5X6CfNLsFf3zWGQdTlKYJWJdiGJw&s=10",
  "girls|Denim Top": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh-29TqbSAyK3gQCseziUgPiCksWqbTBLYZ0mkZWfKew&s=10",
  "girls|Casual Cotton Top": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ucam7_tRAPJ7rB9obr3UwrYM7AUr-kwXqakfkWSIGg&s",

  // ===== GIRLS - Skirts =====
  "girls|Pleated Skirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROXgIqnlmJKa98bDeNEbolS4FzEQ61v1bdZ4t1FZ_lkA&s=10",
  "girls|Denim Skirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ieoqGhxgdanUWitwpgzjzh7BViZwF9NfgA06xBbR5Q&s=10",
  "girls|Tutu Skirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs7nfC_ZIzGaxz7xDeW66grkLr4TzPDZE9u5ms5yg2-Q&s",
  "girls|A-Line Skirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Qu1_jkQ6ZfpsDpRo8VC-Q_KULhRRGGOGa_fa18JP5Q&s",
  "girls|Printed Skirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ6Ks34sOg2qMV3qxYm1Y4flG_hl6Ny88wZ__IsWbWTA&s",
  "girls|Frilled Skirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTGOzbfHI7MrMPYJvwxtBW7qvcJu7i7_wFfjFjU-w4yw&s=10",
  "girls|Cotton Skirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2PGDyuaTohv80tWwMhwzCWymKcbO5qSkGitxRAYJ4vw&s=10",
  "girls|Party Wear Skirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZvOouSeyYaxcTmhhKIw517zvvY7gNKJ11-1_65p02A&s=10",

  // ===== JEWELLERY - Necklace =====
  "jewellery|Gold Plated Necklace": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzppmGtF4Auf4-AX7G8JRyXmw8hz4Ge0lEcrvmZIDrww&s=10",
  "jewellery|Pearl Necklace": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-g2l7DeiZj04bLb1aJnbSEQ9T1RNIvuoaJcJqsTKP0Q&s=10",
  "jewellery|Kundan Necklace": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ67zn1JVtA1yj1ZI2q7kkxLWv0cDV9TJU6yIgvgRkf0A&s=10",
  "jewellery|Choker Necklace": "https://jumkey.com/cdn/shop/files/Red3-1.jpg?v=1777546310",
  "jewellery|Antique Temple Necklace": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlvvbgxwSSm5vefVskiYdQe-iB4zIK3Am5CLUF6jHUOQ&s=10",
  "jewellery|Beaded Necklace": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYNvLE8MGf75i14nXhKZCWxvwGuq81G3vbNqtVRa-3rA&s=10",
  "jewellery|Diamond Look Necklace": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwTXUGarb1X-OfZ4loHNyr4T7LV9eoBF70b9oPKuHrOw&s=10",
  "jewellery|Layered Necklace": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfrSO-CSdP5rwF2m0kHrXF00DQZZOEzqnbHXxiiJ-MVw&s=10",

  // ===== JEWELLERY - Earrings =====
  "jewellery|Jhumka Earrings": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTr3BOroyIxubrBZxBBQJCaTwM1XzzinFRSFFjLo-8Fg&s=10",
  "jewellery|Stud Earrings": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb_GC5Hcl8nLTQ2hYEUZwaPyqaLYvT5h_aJUIOfNhcTQ&s=10",
  "jewellery|Hoop Earrings": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_KvrpSnTFA5DVjt_5eIGRqFkvgAxRoNykaWhfum3ENg&s=10",
  "jewellery|Chandelier Earrings": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZ58TDjxZ6Q5Y65ef2bvEgInpKNIVvlyAdfwp5zpJVA&s=10",
  "jewellery|Pearl Drop Earrings": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA51rtXLYwzIJh-9IwKQ6Y8OzpBnP0J6X8_EZDme8MHw&s=10",
  "jewellery|Kundan Earrings": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzyyLIRREh6gVVUQf2HB_MCv3_s761IKR-vcWjrMlQFw&s=10",
  "jewellery|Oxidised Earrings": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkRgMGgDGtDW6DWbktQuP6HypWm1nIweQ2rl6IZTAa8w&s=10",
  "jewellery|Danglers": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAVgzaxnLB2ApXtnw5_md5RXfIgaa2duZtKMz5rH6rYg&s=10",

  // ===== JEWELLERY - Bangles =====
  "jewellery|Gold Plated Bangles": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_e-_UUXlmyDRUY-ZBELrSIcQBJB0Fb2Y91SPaLPGPw&s=10",
  "jewellery|Glass Bangles Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd8S1AR3hDbdvSirtgAxJZa9XCWHoZafbn-VlNbzMTxw&s=10",
  "jewellery|Oxidised Bangles": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZL3PEegs4cytdXNNv3UAVxMVCS4fB1QxhMMvZPB2tww&s=10",
  "jewellery|Kundan Bangles": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLEJJzPJkUEOVUTD7V5G5tcbHuedj6255PrG0Tbv0N1w&s=10",
  "jewellery|Metal Bangles": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvAThsx6SIXMWSlyx8ulmKtL_BOToDHUIBM-Q3jTB_AA&s=10",
  "jewellery|Beaded Bangles": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVRuoFvWdm7-5miLlevHivQxnF6uUmevjHSDL3cmWVEw&s=10",
  "jewellery|Temple Design Bangles": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVHnhxTcXZ9L4BYcv06NKCFNHFVriDe-K9VliiHoOmng&s=10",
  "jewellery|Colorful Bangles Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiEqpFBs44VoL0c5nPE8x38Ry10fdrnM1A-Tkm-L0njA&s=10",

  // ===== JEWELLERY - Rings =====
  "jewellery|Gold Plated Ring": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSirTpZYzKL6PsiOSdXsP0mOcu26eEY-aJZ6sZJ_RuG4Q&s=10",
  "jewellery|Kundan Ring": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfiS4jV4MDGJXuZG7bCei8fHJC9AeMxwbADqnCxGuiBQ&s=10",
  "jewellery|Adjustable Ring": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu1LeGE2HusU8vRXeEK3NwmJ60lhp8AFtUsn-kjju7oA&s=10",
  "jewellery|Stone Studded Ring": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWAqgccNn5KF8bdzGO0aWWttnKZKC_lGAEKLcsVx6yyA&s=10",
  "jewellery|Oxidised Ring": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuuYGHwyMFVJBYTzRjYNjRmm0FwTcgHGwQ-Yw2Eb0JAg&s=10",
  "jewellery|Pearl Ring": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyVZzamf6aOVUxuUh5TsbmoQnhCZ7e4kMGfP0gQR86Ag&s=10",
  "jewellery|Statement Ring": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnYU9_P7oVekdtDfssiLcCLolMDkpu2wtwhZwEHXQeWA&s=10",
  "jewellery|Minimal Band Ring": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYYCwZqX3OlLllHBFPeF65j_37JEBHv6Dehzbi7uDGuQ&s=10",

  // ===== HOME DECOR - Kitchen =====
  "homeDecor|Non-Stick Cookware Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGMhrOFmKwHEyVASetugSTAoLdmL78q_yBljVd5HjmmQ&s=10",
  "homeDecor|Wooden Chopping Board": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzQeUHgbZ0SmQZSS8juAz87nDFKeVRVRTvWaB9QC0a6A&s=10",
  "homeDecor|Ceramic Dinner Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE32Wv7O4kYKNIUIqIUR7T_4OXx7gSORoaEd5RNHmfCw&s=10",
  "homeDecor|Stainless Steel Container Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRocbM8mM0Iqx44km-rIBGp7-l6c-F99msnVMKKChi8xw&s=10",
  "homeDecor|Glass Storage Jars": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJDU1lHKaNuuZg8ZA-dMQlQWD3U95I9GSP0e7EtZy9PA&s=10",
  "homeDecor|Kitchen Organizer Rack": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW5soZwpswx1E-uY197RePkIVp69darfUirWgpn2qsLQ&s=10",
  "homeDecor|Electric Kettle": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuKst0CHoT2pNwDqXIO4N-giO6-PLk3HUjVZlSsjuulw&s=10",
  "homeDecor|Wooden Spoon Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJmvZquq9DBW1MePhq-ttk8tYKj2aaQJLeHlGip1zTjw&s",
  "homeDecor|Insulated Casserole": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqHuY_LAlAnRkWFWrSWpzZGuzbmOCfrZgOYiQINV0mtg&s=10",
  "homeDecor|Kitchen Towel Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_P96QnmJDoMTwZc0-GzfZIzLNZYXCK7qglP9mG5CSEA&s",

  // ===== HOME DECOR - Lighting =====
  "homeDecor|LED Wall Lamp": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsVJ-H2_Wnt2qexNhvh3O7HofZH4Wfw9p6GIEoG7MbVA&s=10",
  "homeDecor|Fairy String Lights": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMIl7qlq2afW6FLzDQYEoujGR0AtbXoaqvXQqu0cMkgQ&s=10",
  "homeDecor|Table Lamp": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0uoZf_KQtqCPswUzmpjz3VD3aldayNZNxGD0a6umLLg&s",
  "homeDecor|Hanging Pendant Light": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRveo5o_Hw3qrEiAxKRN1kgUflYaZw7tIQ1trjZeP5nLA&s=10",
  "homeDecor|Decorative Lantern": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYQW36CBCJeNbXKg562tAgp_2euLfHsqQ-7le7Vx9b9g&s=10",
  "homeDecor|Night Lamp": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4VRDIuibbgLB-geekuWHvkl_73Uhi4mtV8iqOKOlFWg&s=10",
  "homeDecor|Chandelier Light": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSefffKtmIrfDfX2yJhPx3ggwHSkavr3EWHbzYz1VoaCw&s=10",
  "homeDecor|Study Lamp": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqQLNcwLN6Ydg2N_mhS4BkX6Tg-_c9V18cvvuuaOII2w&s=10",
  "homeDecor|Solar Garden Light": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe4zS-2yCYUaQHIixptsaCFBCKxtXmiqdTF-jCjZli-g&s=10",
  "homeDecor|Ceiling Light Fixture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg1gvZZ3mAC2xxJ4UGxeSosFjOKmw05VC1AOkJbUiCkA&s",

  // ===== HOME DECOR - Wall Decor =====
  "homeDecor|Wall Clock": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT24VgxBTSiNxfvkD8HXprnjSVlEfERVitQ47XGxuKlNg&s=10",
  "homeDecor|Framed Wall Art": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmEItR9p_n5ykMem4eMcJBYpJu55jsSgm-rsD5MT0u8g&s=10",
  "homeDecor|Wooden Wall Shelf": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbPRyXGEHKjqCmObejvSDpnZGG9lKxdHa3svb_ndDuhg&s=10",
  "homeDecor|Wall Mirror": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX5z8NzsrGsupXpWlPgD1lUITYgi5easnLfkcwHsi9KA&s=10",
  "homeDecor|Photo Frame Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbYTJ4pfmbLpvlccQo2vJlJeRen89vGbTI3l5oF8Qn2g&s",
  "homeDecor|Wall Sticker Decal": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC1RhJVlvI2AQtGMAB3SblOlHvefc5qlR6pK97saNKQA&s=10",
  "homeDecor|Macrame Wall Hanging": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRAYUxgSmVdpABhK43j7BUqR1M4MHEnmJ_E5LSUvEU2g&s=10",
  "homeDecor|Wall Mounted Plant Holder": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStNfJ_JreAOMgTtKIEdbt4YFeNdBiADioXxCgBIektpg&s=10",
  "homeDecor|Canvas Painting": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwHt8N0VK0UEBmyngi5RB0Ni4DYo8wbQvlqXSZwRWlBg&s=10",
  "homeDecor|Metal Wall Art": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwJnxmYoADf9YgPwqUigC1NSqfQKnMKqN8mmvtXxltsA&s=10",

  // ===== HOME DECOR - Furniture =====
  "homeDecor|Wooden Coffee Table": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsSQ2L2WPYmLPXcwGZt0iJhRB04DhrywdEZUEBAQy--Q&s=10",
  "homeDecor|Bean Bag": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy5BncFwNZyyZr6TtFt_EX-p67ufetnNn9NqQCjfJ_Ng&s",
  "homeDecor|Folding Study Table": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ90vxtv2OnnD7fAVdVDm0cPkitG95z0KWJx2ak_Z2Fw&s=10",
  "homeDecor|Bookshelf": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6lW1SJyHsXel3qUr3-xTmZS0hJOGY8Jdj4PBuseXZjw&s=10",
  "homeDecor|Wooden Stool": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfAqZ0C7Qas9-vCXNOUTq8be9YPO_BSuumb8pxWRotcw&s=10",
  "homeDecor|Shoe Rack": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeHFO6l7dbKYaZBevDLT6tjJJC9wb5guc_THojHx_hag&s=10",
  "homeDecor|TV Console Unit": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREm1PotULoqJencZ5jE7Mh62F3f4MTz6Gt295l_0Al6w&s=10",
  "homeDecor|Storage Ottoman": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKq7Lgg0RIZcwLeor88JGgK-vY9sW2SDd1oIlrzT6pJw&s",
  "homeDecor|Wooden Bench": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4n9GDVq5jFjvwtlAALD98w3ykgAN4KcTqxKOHurN3uQ&s=10",
  "homeDecor|Side Table": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBoB8pRvS6vgw3lyV1b6Ccz9accuHRp6wUeTIzOWiIgA&s=10",

  // ===== HOME DECOR - Useful Products =====
  "homeDecor|Multi-Purpose Storage Box": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy_nP6CgpwXNE57OPu1gGGtAsvMlESoGH2bLqJYwo9Nw&s=10",
  "homeDecor|Laundry Basket": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrlORuznFnY2141D92qH8r2G3woIWfaMiAA4lEbf34tw&s=10",
  "homeDecor|Door Mat Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaOBz4dnchlJRW8OV9vRFCGnbAlxvy_XIlCVdd6Ly-WQ&s",
  "homeDecor|Umbrella Stand": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBAVEzamXszlcY2BY8zG116IogFxavfs03teyipJJlIA&s=10",
  "homeDecor|Wall Hooks Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJMe2svRaWCgpE5q6okp1sOclLmgQyfaxwwn6cnThrbg&s",
  "homeDecor|Shoe Organizer": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWCwpx_JiynnEbNIMJFCZjXi57zEiYMPXVRzPePiFCkw&s=10",
  "homeDecor|Curtain Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ41z4GDbgWErv-jV8J8CD5ikFGVs0Th9d3WFbIqwX7FQ&s=10",
  "homeDecor|Cushion Cover Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM9PSpgihi894fFrg3yD7Du_F-aYk695UwXGEkPehjFQ&s",
  "homeDecor|Bedsheet Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs-2P-oXhQpHqcaTKewrBQgYy2nEF3hFkGIz6Dn_CbyA&s=10",
  "homeDecor|Table Runner": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5YIg9YefJUzEp4l4Lz7Elkw-IqL1Jwy3u8LSk4ieqQQ&s=10",

  // ===== ELECTRONICS - Mobiles =====
  "electronics|5G Smartphone 128GB": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEIKPsdlUcO42oxP1k1TbbahVGVQECfpXJZaje6tVxBw&s=10",
  "electronics|Budget Android Phone": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7UxuPpPUOc8KBzayEbGE-i9Xkle24XZOBT0LdMY3Y4Q&s=10",
  "electronics|Flagship Camera Phone": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiqoex5QawH_uh9kLmbnm4tX7eQppzm0y1LygwP2glfA&s=10",
  "electronics|Gaming Smartphone": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoJcbCSCWw2T1O_cRV4IRMvSPXxKiiC51YM67jSnVnpA&s=10",
  "electronics|Dual SIM Smartphone": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdpS3MHw5SoZVTP0TD5NbiflBY_ArqXDHWk8AaBIwnWQ&s=10",
  "electronics|AMOLED Display Phone": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDhDj75LYWiR5RagdQcGHcwqRB40lK9-dB2nXlfHOPLg&s=10",
  "electronics|Compact Smartphone": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtG-P-32zF2YBYfK1d15KtyGw5kQ0h1fgGJte985J6PQ&s=10",
  "electronics|Foldable Smartphone": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP9iazSH7JX2ZIABPu_ZVLtnPC6045kfv9OxLmiltQQQ&s=10",
  "electronics|5G Smartphone 256GB": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6pBhDErdgKjcf_q48UZCa67Upza6JBvEkRJbz3iIsA&s=10",
  "electronics|Slim Bezel-less Phone": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLjnKYJGKibMsWPwzreTY9_ssudb-NNKRSR-YfZ_rJw&s=10",

  // ===== ELECTRONICS - Laptops =====
  "electronics|Slim Business Laptop": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpXMV8EPwF4XsAYXdj5nb7vXjHvL3l4DSbmcNccZRNTw&s=10",
  "electronics|Gaming Laptop": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDALRXOT87uY-GZ1UkE9LCK0ilpriw-7SIEE__g9PQGQ&s=10",
  "electronics|Student Laptop": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNdetnab2VQi06plS8g5bS5i1-pMKZ1SwW11Z55lkiSA&s=10",
  "electronics|2-in-1 Touchscreen Laptop": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbC0a5qWDVkUJ-KYX3oIZBlt62yV14H8xfxtSHbNF9jw&s=10",
  "electronics|Ultrabook Thin Laptop": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRduQnjeko9fLAN3LQ0fBEBoAdg_7tpRcJpTq5lWQg6vg&s=10",
  "electronics|MacBook Style Laptop": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsthQsnPU6yjwM4PLL1U9oXmady4g9vk_Z9IB2A5rZEg&s=10",
  "electronics|Budget Laptop": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3RdjeU6k8mMmKbQpTw-qEVuNsDiJsb9NLBQaKAN9SHA&s=10",
  "electronics|High Performance Laptop": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRl41udwX_us5lrWaP9bZq6U99PqUc6er7UGLZQUUNRg&s",
  "electronics|Convertible Laptop": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRklw22cDPrekQ_a8kvrWIthe-SIgtpqhynFK38RkMCzg&s",
  "electronics|15-inch Full HD Laptop": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbXHtK3-u4n3b3DtnuQ-OLrk9S3Yd2Knd0GUZPlX3A2g&s=10",

  // ===== ELECTRONICS - Accessories =====
  "electronics|Wireless Mouse": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6us97EmJOlQKUypYTIRalXzpp5wkrF5y6vOAM5ojJBA&s=10",
  "electronics|Wired Optical Mouse": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9jevA2SxE_A4LyqXjl9VqSS3zBotLCA47uH25mg-ijA&s=10",
  "electronics|Bluetooth Headphones": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3TKBfBa5ffR0Dh3l2Cr3l6crCx6khkwlgmTeIKA90AQ&s=10",
  "electronics|Wired Earphones": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3TKBfBa5ffR0Dh3l2Cr3l6crCx6khkwlgmTeIKA90AQ&s=10",
  "electronics|Wireless Earbuds": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZs8iyv5EJhkcqD24-Zssz4r2Xo2DydJSIT7TUBG_O9Q&s=10",
  "electronics|Fast Charger 20W": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl-9A-JkKeVJNEIT3xqU-8198Vxqk0udxrzJxcXEgONg&s=10",
  "electronics|Type-C Charging Cable": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8m3zW0Ti9cyMaboIj2JN_opt72UJw-EjgQzwTv7rJoA&s=10",
  "electronics|Power Bank 10000mAh": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAtfo3KSA5Y7ejFpXvKIAlUjjXr7ZAWwNTOK4w5wwf5Q&s=10",
  "electronics|Bluetooth Speaker": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReSb_zsHxkgPTETNMMFN8vzA7ZZ1RL_U62AtpVZpK3tQ&s=10",
  "electronics|Smartwatch": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmTqNcZCSucuE5qGawavGdisXV0Lwe-5Snfmmz2o1k3A&s",
  "electronics|Laptop Bag": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOmNpVq2sqXZyLrn42plpgl63EPpGJFCUpe6vW28QQRA&s=10",
  "electronics|Keyboard & Mouse Combo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXYC9HC1kfbGvtrJbPD-JmHzSbgHjlpxSLSI-irW4YVw&s=10",
  "electronics|USB Hub Adapter": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZraScffZsE17xeBMIZBJ3NEucRgw5giu1Khzv-8DFvQ&s=10",
  "electronics|Phone Cover & Case": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE1ZB3gkjbYwHN0Zc44uuvdPSK9QU43dw27tMZVzM77g&s=10",
  "electronics|Screen Protector Glass": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSJ8lb6LvO5X3aae_00FQtA7-UFeYfpnIMGI5LxSYvpw&s=10",

  // ===== TOYS =====
  "toys|Remote Control Car": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnjGJNH7eXsMF_qQhcVQIkMNth6NzLZlsRj23ynApIbQ&s",
  "toys|Building Blocks Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB2LOFwYfOUzeGw-iKZHx3eLsquQWkHgOfoAOetAKG2w&s=10",
  "toys|Soft Teddy Bear": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZoEHPSCAl2eNS3WRGhIKFveNOA2PeNkvKFttzB8xB_w&s=10",
  "toys|Action Figure Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkasT1wdiRmr5FgLslko5gTneQWFyEkPQ_sPmhRo8l9A&s=10",
  "toys|Puzzle Game Board": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0c6i3XEixAm2NLA6eF9RXMXM-wL5dltQmTXjbYh4MLQ&s=10",
  "toys|Musical Toy Piano": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpau4V8_B_s8a4rEuLV52le9wgyXLizmveQ7Vk9LMxjw&s=10",
  "toys|Doll House Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAO-UT5piMkWTJj5Qk2D6XrKTVhkgzA6-OCvpPqO7HtA&s=10",
  "toys|Toy Kitchen Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa_h4ICHDHLqZbjxYpFn6v6OwKuJven3og93FUOG0Ezg&s=10",
  "toys|Battery Operated Robot": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRr9eGgyjGfvWuzseKCjqzvLnLmpo1w_EL-bbr0fPurQ&s",
  "toys|Rubik's Cube": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBHcj3UcnE0XDOXxFLSlxzpCTg-BNL_OW1dDeyomlz8g&s",
  "toys|Toy Train Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpjvh5gDC9hZi6M6iKnJSxvJ3Jamf793qe_1HofgCBOQ&s=10",
  "toys|Water Gun": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZ7CTvpA6_6Nb4FTHcn4h-gDUS3g_miBu1w9baV54EA&s=10",
  "toys|Kids Tricycle": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD51EgMAs8puscdj6wnr5hUMf78p9vzEfhXZePTRP4wQ&s=10",
  "toys|Building Blocks Mega Set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4jtxLN5ha5F94VU9BWhO1dpy5-1U5NwbzDnZE8Vfy2Q&s=10",
  "toys|Toy Helicopter": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1MI5hPz4ve39R1qvhPUc3Aa-ylLIuswx0bbcy2WTYIw&s=10",
  "toys|Board Game Family Pack": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeTPfEMaMAf9JNpz-ieHjKz6qxO0E0FW8o4fnwQhOqwQ&s",
  "toys|Soft Plush Animal": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoDLe12SUHx5LAjYEVeZaF2g5BMHMOxIxn2FB-s0ejpQ&s=10",
  "toys|Kids Drawing Board": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1gBoeoiyuWvTpXnTaJ4JUMXJd3HuWtnkIvh-SGiGm2w&s=10",
  "toys|Toy Bike": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN8wke2_1_YiC-xXUveUFkujTQ7W8gHpxlCrVYbDn4nQ&s=10",
  "toys|Bubble Gun Toy": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkIL5zUPj7gCBQ0ppFcihbVxn-5BLDsRnTh8OiogNkrQ&s=10",

  // ===== BOOKS =====
  "books|Mystery Thriller Novel": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9XSs_m72N25pyXgwWPEtK3T_ojVUe6oV5sSl7MAgSAA&s=10",
  "books|Romance Fiction Book": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeOFKrMoIfkq8Hz3rI3cGI2yTn3okKjs1-q9SVP4yYvg&s=10",
  "books|Fantasy Adventure Novel": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5PLuFOT6J_gAt_g86LsX0_B2OYeijxuKZYM9FBco0Q&s=10",
  "books|Crime Thriller Book": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPtBXvYhlgWWt6FFavQLetzlQDRiDtErAyU769Ir_Nqg&s=10",
  "books|Classic Literature Novel": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQHI-XjjjLbhFDF0Pra-tlQu6HN5CVoETbzbpqXzQAVg&s=10",
  "books|Science Fiction Book": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKFN10tFZrS2AnZqdNPwbrfRn3jF6wYpmyFH6n2G21Rg&s=10",
  "books|Historical Fiction Novel": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVlP5mnOqabwqaRHdy4nQhEjTK-sMWHWtHjCC7XHTq_w&s=10",
  "books|Short Stories Collection": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaQvz-eu_AHOsb73OjXQHBinH64Q9hY1wi8mfPDG_MmQ&s=10",
  "books|Self-Help Book": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXeNCuFIwlxjC53SzmAcjfWiFuOBuUpmiaQ7iWNbn5PQ&s=10",
  "books|Biography Book": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRkDQ3VYZRbr3djtSsquTVhVgUcOQUTFR_KMzyei4F-Q&s=10",
  "books|Motivational Book": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpxWP4oqC6f7J9gXDdrkmCYfsB_eMpGdBp6pZIsinp0Q&s=10",
  "books|Personal Finance Book": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW7EMSLGPEILubHFZ2fluGRLMrS9-gIAAPUkRQCp8jnQ&s=10",
  "books|Business Strategy Book": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA2nfRUHTnbhHB_FAv6kxgLE9Jdr0kLepnM5_3spE7wg&s",
  "books|Psychology Book": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWwpLYK-tTOsOfZzgGWPdtzerdYwV6Z9sYNbFRIH8XLg&s=10",
  "books|Health & Wellness Book": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCRI2ohxxIn8xDMju9TTjQNFLxSC-MMeXx30gLWlHJXA&s=10",
  "books|Competitive Exam Guide": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI3_QlN5gefmwd_5V-T4EvxBdJu_din7Z-35eg8uOgaA&s=10",
  "books|Programming Language Book": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Ibu1ow0CrPM2in0bpBoJxcx0NC3Rzoc7AOo8WDb2fA&s=10",
  "books|General Knowledge Book": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7a0MN1w7DJwmA5FmyqubsDJX_Nm7CEf5NgdQ9RQmwPQ&s=10",
  "books|English Grammar Book": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsPrfHsrdBaT2rwUyDtTnhN3UIcjgXD0GsLf5cdGFr2g&s=10",
  "books|Interview Preparation Book": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLY0ObOP44Nx1NPJY120UUPbxvntvJwFUhO9ADH3FeTw&s=10",
};

// ---------- Fallback keyword map (used ONLY if a product has no override) ----------
const keywordMap = {
  dresses: "dress", sarees: "saree", tops: "fashion-top", footwear: "footwear",
  shirts: "shirt", tshirts: "tshirt", trousers: "trousers", shorts: "shorts",
  frocks: "frock", skirts: "skirt",
  necklace: "necklace", earrings: "earrings", bangles: "bangles", rings: "ring",
  kitchen: "kitchenware", lighting: "lamp", wallDecor: "wall-decor",
  furniture: "furniture", usefulProducts: "home-storage",
  mobiles: "smartphone", laptops: "laptop", accessories: "electronics-accessory",
  toys: "toy", books: "book"
};

function generateProducts(names, category, subCategory, minPrice, maxPrice, startId) {
  const keyword = keywordMap[subCategory] || subCategory;

  return names.map((name, index) => {
    const overrideKey = `${category}|${name}`;
    return {
      id: startId + index,
      name: name,
      category: category,
      subCategory: subCategory,
      stock: Math.floor(Math.random() * 40) + 5,
      price: Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice,
      image: imageOverrides[overrideKey] || `https://loremflickr.com/300/300/${keyword}?lock=${startId + index}`,
    };
  });
}

let id = 1;
let products = [];

products = products.concat(generateProducts(productNames.women.dresses, "women", "dresses", 599, 2499, id));
id += productNames.women.dresses.length;
products = products.concat(generateProducts(productNames.women.sarees, "women", "sarees", 799, 4999, id));
id += productNames.women.sarees.length;
products = products.concat(generateProducts(productNames.women.tops, "women", "tops", 299, 1299, id));
id += productNames.women.tops.length;
products = products.concat(generateProducts(productNames.women.footwear, "women", "footwear", 499, 1999, id));
id += productNames.women.footwear.length;

products = products.concat(generateProducts(productNames.men.shirts, "men", "shirts", 499, 1999, id));
id += productNames.men.shirts.length;
products = products.concat(generateProducts(productNames.men.tshirts, "men", "tshirts", 299, 999, id));
id += productNames.men.tshirts.length;
products = products.concat(generateProducts(productNames.men.trousers, "men", "trousers", 599, 1999, id));
id += productNames.men.trousers.length;
products = products.concat(generateProducts(productNames.men.footwear, "men", "footwear", 599, 2999, id));
id += productNames.men.footwear.length;

products = products.concat(generateProducts(productNames.boys.shirts, "boys", "shirts", 299, 899, id));
id += productNames.boys.shirts.length;
products = products.concat(generateProducts(productNames.boys.tshirts, "boys", "tshirts", 199, 699, id));
id += productNames.boys.tshirts.length;
products = products.concat(generateProducts(productNames.boys.shorts, "boys", "shorts", 249, 799, id));
id += productNames.boys.shorts.length;

products = products.concat(generateProducts(productNames.girls.frocks, "girls", "frocks", 299, 1199, id));
id += productNames.girls.frocks.length;
products = products.concat(generateProducts(productNames.girls.tops, "girls", "tops", 199, 799, id));
id += productNames.girls.tops.length;
products = products.concat(generateProducts(productNames.girls.skirts, "girls", "skirts", 249, 899, id));
id += productNames.girls.skirts.length;

products = products.concat(generateProducts(productNames.jewellery.necklace, "jewellery", "necklace", 299, 3999, id));
id += productNames.jewellery.necklace.length;
products = products.concat(generateProducts(productNames.jewellery.earrings, "jewellery", "earrings", 149, 1499, id));
id += productNames.jewellery.earrings.length;
products = products.concat(generateProducts(productNames.jewellery.bangles, "jewellery", "bangles", 199, 1999, id));
id += productNames.jewellery.bangles.length;
products = products.concat(generateProducts(productNames.jewellery.rings, "jewellery", "rings", 149, 1299, id));
id += productNames.jewellery.rings.length;

products = products.concat(generateProducts(productNames.homeDecor.kitchen, "homeDecor", "kitchen", 199, 2999, id));
id += productNames.homeDecor.kitchen.length;
products = products.concat(generateProducts(productNames.homeDecor.lighting, "homeDecor", "lighting", 149, 1999, id));
id += productNames.homeDecor.lighting.length;
products = products.concat(generateProducts(productNames.homeDecor.wallDecor, "homeDecor", "wallDecor", 199, 1499, id));
id += productNames.homeDecor.wallDecor.length;
products = products.concat(generateProducts(productNames.homeDecor.furniture, "homeDecor", "furniture", 799, 5999, id));
id += productNames.homeDecor.furniture.length;
products = products.concat(generateProducts(productNames.homeDecor.usefulProducts, "homeDecor", "usefulProducts", 149, 1299, id));
id += productNames.homeDecor.usefulProducts.length;

products = products.concat(generateProducts(productNames.electronics.mobiles, "electronics", "mobiles", 6999, 59999, id));
id += productNames.electronics.mobiles.length;
products = products.concat(generateProducts(productNames.electronics.laptops, "electronics", "laptops", 24999, 99999, id));
id += productNames.electronics.laptops.length;
products = products.concat(generateProducts(productNames.electronics.accessories, "electronics", "accessories", 149, 4999, id));
id += productNames.electronics.accessories.length;

products = products.concat(generateProducts(productNames.toys.toys, "toys", "toys", 149, 2499, id));
id += productNames.toys.toys.length;

products = products.concat(generateProducts(productNames.books.books, "books", "books", 99, 799, id));
id += productNames.books.books.length;

export { products };

// ---------- Carts & Wishlists ----------
export const carts = [
  { id: 1, user_id: 1, items: [] },
  { id: 2, user_id: 2, items: [] },
  { id: 3, user_id: 3, items: [] },
];

export const wishlists = [
  { id: 1, user_id: 1, items: [] },
  { id: 2, user_id: 2, items: [] },
  { id: 3, user_id: 3, items: [] },
];