const { v4: uuidv4 } = require("uuid");

const users = {};

const sessions = {};

const id1 = uuidv4();
const id2 = uuidv4();
const id3 = uuidv4();
const id4 = uuidv4();
const id5 = uuidv4();
const id6 = uuidv4();
const id7 = uuidv4();
const id8 = uuidv4();
const id9 = uuidv4();
const id10 = uuidv4();

const posts = {
  [id1]:{
    dishname:"Tomato and Egg Fried Rice",
    ingredients:"Eggs, Rice, Tomato, Green Onion, Soy Sauce, Salt",
    content:" Heat oil in a pan, scramble eggs, add diced tomatoes, stir, add cooked rice, and season with soy sauce and salt.",
    username:"Emma Thompson",
    id:id1,
},
[id2]:{
    dishname:"Braised Beef Noodles",
    ingredients:"Beef, Noodles, Carrot, Onion, Ginger, Cooking Wine, Soy Sauce",
    content:"Marinate beef with ginger and cooking wine, blanch in hot water, cook noodles, sauté onion and carrot, add marinated beef, and finally, mix with noodles.",
    username:"Alexander Johnson",
    id:id2,
},
[id3]:{
    dishname:"Spicy Hot Pot",
    ingredients:"Chicken, Beef, Beancurd, Potato, Peanuts, Green Onion, Garlic, Chili Sauce",
    content:"Cut meats and vegetables into chunks, stir-fry chili sauce and peanuts, add meat and vegetables, and season.",
    username:"Olivia Davis",
    id:id3,
},
[id4]:{
    dishname:"Garlic Broccoli",
    ingredients:"Broccoli, Garlic, Olive Oil, Salt",
    content:"Blanch broccoli, heat olive oil, sauté garlic, add broccoli, and season with salt.",
    username:"Ethan Miller",
    id:id4,
},
[id5]:{
    dishname:"Three-Cup Chicken",
    ingredients:"Chicken Thighs, Rice Wine, Soy Sauce, Peanut Oil, Garlic, Cilantro",
    content:"Marinate chicken, stir-fry garlic, add chicken, pour rice wine and soy sauce, and finish with cilantro.",
    username:"Sophia Harris",
    id:id5,
},
[id6]:{
    dishname:"Kung Pao Chicken",
    ingredients:"Chicken, Peanuts, Bell Pepper, Red Chili, Green Onion, Garlic, Sichuan Peppercorn, Cooking Wine, Soy Sauce",
    content:"Cut meat and vegetables, stir-fry Sichuan peppercorn and chili, add chicken and vegetables, and season.",
    username:"Jackson White",
    id:id6,
},
[id7]:{
    dishname:"Steamed Fish",
    ingredients:"Fish, Green Onion, Ginger, Soy Sauce, Cooking Wine, Water",
    content:"Clean fish, place ginger and green onion on top, pour soy sauce, cooking wine, and water, then steam.",
    username:"Ava Martin",
    id:id7,
},
[id8]:{
    dishname:"Cucumber Salad",
    ingredients:"Cucumber, Garlic, Soy Sauce, Vinegar, Sesame Oil",
    content:"Slice cucumber, mix with minced garlic, soy sauce, vinegar, and sesame oil.",
    username:"Noah Taylor",
    id:id8,
},
[id9]:{
    dishname:"Tomato and Egg Noodles",
    ingredients:"Tomato, Eggs, Noodles, Green Onion, Soy Sauce",
    content:"Sauté green onion, add diced tomatoes, stir, add beaten eggs, and finally mix with cooked noodles.",
    username:"Isabella Robinson",
    id:id9,
},
[id10]:{
    dishname:"Sweet and Sour Spare Ribs",
    ingredients:"Spare Ribs, Sugar, Vinegar, Soy Sauce, Cooking Wine, Ginger, Garlic",
    content:"Blanch ribs, heat oil, sauté ginger and garlic, add ribs, pour sugar, vinegar, soy sauce, and cooking wine, then cook until glazed.",
    username:"Liam Smith",
    id:id10,
},
};

const data = {
  users,
  sessions,
  posts,
};

module.exports = data;
