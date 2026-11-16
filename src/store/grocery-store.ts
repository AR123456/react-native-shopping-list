//  for calling routes - global can be used in any components
import { create } from "zustand";

// return and object
export const useGroceryStore = create((set, get) => ({
  // this is global state
  // state name:["value of state"]
  posts: ["first post", "second post"],
  isLoading: true,
}));
