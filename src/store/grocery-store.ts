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
type ItemResponse = { item: GroceryItem };
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
  addItem: async (input) => {
    set({ error: null });
    try {
      // with form submit
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: input.name,
          category: input.category,
          quantity: Math.max(1, input.quantity),
          priority: input.priority,
        }),
      });
      const payload = (await res.json()) as ItemResponse;
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      // this puts the newest, just added item at the top of list in ui
      set((state) => ({ items: [payload.item, ...state.items] }));
      return payload.item;
    } catch (error) {
      console.error("Error adding item:", error);
      set({ error: "Something went wrong" });
    }
  },
  // another Zustand action
  updateQuantity: async (id, quantity) => {
    //quantity should never be less than 0
    const nextQuantity = Math.max(1, quantity);
    // Zustands update store state- no error right now
    set({ error: null });
    try {
      // define response
      const res = await fetch(`/api/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: nextQuantity }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const payload = (await res.json()) as ItemResponse;
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? payload.item : item,
        ),
      }));
    } catch (error) {
      console.error("Error updating quantity", error);
      set({ error: "Something went wrong" });
    }
  },
  togglePurchased: async (id, quantity) => {
    const nextQuantity = Math.max(1, quantity);
    set({ error: null });
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: nextQuantity }),
      });
    } catch (error) {
      //
    }
  },
  removeItem: async () => {},
  clearPurchased: async () => {},
}));
