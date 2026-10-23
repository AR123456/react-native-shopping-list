// for db cruds
// querys and mutations
import { desc, eq } from "drizzle-orm";
import { db } from "./db/client";
import { groceryItems } from "./db/schema";

export const listGroceryItems = async () => {
  // from data base select grocieryItems table
  const rows = await db.select().from(groceryItems);
};
