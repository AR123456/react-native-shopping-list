//  for calling routes - global can be used in any components
import { create } from "zustand";
import { clearPurchasedItems } from "../lib/server/db-actions";
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
  togglePurchased: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearPurchased: () => Promise<void>;
};

// return and object
export const useGroceryStore = create<GroceryStore>((set, get) => ({
  // this is global state
  // state name:["value of state"]
  items: [],
  isLoading: false,
  error: null,
  // store methods items to call to the backend
  loadItems: async () => {
    // loading state updated using set method
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/items");
      // type of any needs to be wrapped in parens
      const payload = (await res.json()) as ItemsResponse;
      // err handling
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      // update items array
      set({ items: payload.items });
    } catch (error) {
      console.error("Error loading items:", error);
      set({ error: "Something went wrong" });
    } finally {
      // put loasing state back to false
      set({ isLoading: false });
    }
  },
  addItem: async () => {
    set({ error: null });
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
    } catch (error) {
    } finally {
    }
  },
  updateQuantity: async () => {},
  togglePurchased: async () => {},
  removeItem: async () => {},
  clearPurchased: async () => {},
}));
