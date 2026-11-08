// api routs - to match up with actions in the db-actions file

import { listGroceryItems } from "@/src/lib/server/db-actions";

//export any of the following functions GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS from a server route
export async function GET() {
  try {
    // db call
    const items = await listGroceryItems();
    // return by value
    return Response.json({ items });
  } catch (error) {}
}
