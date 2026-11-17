//  for calling routes - global can be used in any components
import { create } from "zustand";
export type GroceryStore = "Produce" | "Dairy" | "Bakery" | "Pantry" | "Snacks";

// return and object
export const useGroceryStore = create<GroceryStore>((set, get) => ({
  // this is global state
  // state name:["value of state"]
}));
