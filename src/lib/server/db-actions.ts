// for db cruds
// querys and mutations
import { desc, eq } from "drizzle-orm";
import { db } from "./db/client";
import { groceryItems } from "./db/schema";

export const listGroceryItems = async () => {
  // from data base select grocieryItems table decending order by time updated
  // read - aka get
  const rows = await db
    .select()
    .from(groceryItems)
    .orderBy(desc(groceryItems.updated_at));
  return rows;
};

// create
export const createGroceryItem = (input: {
  name: string;
  category: string;
  quantity: number;
  priority: string;
}) => {
  const rows = await db
    .insert(groceryItems)
    .values({
      id: crypto.randomUUID(),
      name: input.category,
      quantity: Math.max(1, input.quantity),
      purchased: false,
      priority: input.priority,
      updated_at: Date.now(),
    })
    .returning();
  return rows[0];
};
// update

// delete
