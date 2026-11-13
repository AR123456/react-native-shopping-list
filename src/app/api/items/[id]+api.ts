// dynamic route

import { deleteGroceryItem } from "@/src/lib/server/db-actions";

//delete one
export async function DELETE(_request: Request, { id }: { id: string }) {
  try {
    await deleteGroceryItem;
  } catch (error) {}
}
