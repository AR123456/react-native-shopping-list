// api routs - to match up with actions in the db-actions file

import { listGroceryItems } from "@/src/lib/server/db-actions";

//export any of the following functions GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS from a server route
export async function GET() {
  try {
    throw new Error("test");
    // db call
    const items = await listGroceryItems();
    // return by value
    return Response.json({ items });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch items";
    //return the response to front end
    return Response.json({ error: message }, { status: 500 });
  }
}
