// seed file using cjs in case json is ever changed to type of module
const { neon } = require("@neondatabase/serverless");
const crypto = require("node:crypto");

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is required. Example: DATABASE_URL=... npm run seed:grocery",
  );
}

const sql = neon(databaseUrl);
const seedItems = [
  {
    name: "Bananas",
    category: "Produce",
    quantity: 6,
    priority: "medium",
    purchased: false,
  },
  {
    name: "Avocado",
    category: "Produce",
    quantity: 3,
    priority: "high",
    purchased: false,
  },
  {
    name: "Greek Yogurt",
    category: "Dairy",
    quantity: 2,
    priority: "medium",
    purchased: true,
  },
  {
    name: "Cheddar Cheese",
    category: "Dairy",
    quantity: 1,
    priority: "low",
    purchased: false,
  },
  {
    name: "Sourdough Bread",
    category: "Bakery",
    quantity: 1,
    priority: "high",
    purchased: false,
  },
  {
    name: "Pasta",
    category: "Pantry",
    quantity: 2,
    priority: "low",
    purchased: false,
  },
  {
    name: "Tomato Sauce",
    category: "Pantry",
    quantity: 2,
    priority: "medium",
    purchased: true,
  },
  {
    name: "Granola Bars",
    category: "Snacks",
    quantity: 5,
    priority: "medium",
    purchased: false,
  },
  {
    name: "Dark Chocolate",
    category: "Snacks",
    quantity: 2,
    priority: "low",
    purchased: false,
  },
  {
    name: "Eggs",
    category: "Dairy",
    quantity: 12,
    priority: "high",
    purchased: false,
  },
];
