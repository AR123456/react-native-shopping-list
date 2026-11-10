// api routs - to match up with actions in the db-actions file

import {
  createGroceryItem,
  listGroceryItems,
} from "@/src/lib/server/db-actions";

//export any of the following functions GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS from a server route
export async function GET() {
  try {
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
// post for the create action
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // user passing - quantity is not required since default is min of 1
    const { name, category, quantity, priority } = body;
    // check to make sure all are provided
    if (!name || !category || !priority) {
      return Response.json(
        { error: "Please provide all required fields." },
        { status: 400 },
      );
    }
    // call mutation
    const item = await createGroceryItem({
      name,
      category,
      quantity,
      priority,
    });
    // return item or error
    return Response.json({ item }, { status: 201 });
  } catch (error) {}
}
