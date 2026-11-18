//  for calling routes - global can be used in any components
import { create } from "zustand";
//  user choices for the category card in UI
export type GroceryCategory =
  "Produce" | "Dairy" | "Bakery" | "Pantry" | "Snacks";
export type GroceryPriority = "low" | "medium" | "high";
export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  purchased: boolean;
  priority: GroceryPriority;
};
export type CreateItemInput = {
  name: string;
  category: GroceryCategory;
  quantity: number;
  priority: GroceryPriority;
};
// response itemes
type ItemsResponse = { items: GroceryItem[] };
type ItemResponse = { items: GroceryItem };
// now store types
type GroceryStore = {
  items: GroceryItem[];
  isLoading: boolean;
  error: string | null;
  //load items method
  loadItems: () => Promise<void>;
  addItem: (input: CreateItemInput) => Promise<GroceryItem | void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
};

// return and object
export const useGroceryStore = create<GroceryStore>((set, get) => ({
  // this is global state
  // state name:["value of state"]
}));
