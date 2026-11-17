//  for calling routes - global can be used in any components
import { create } from "zustand";
//  user choices for the category card in UI
export type GroceryStore = "Produce" | "Dairy" | "Bakery" | "Pantry" | "Snacks";
export type GroceryPriority = "low" | "medium" | "high";
// return and object
export const useGroceryStore = create<GroceryStore>((set, get) => ({
  // this is global state
  // state name:["value of state"]
}));
