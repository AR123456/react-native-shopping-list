// api routs - to match up with actions in the db-actions file
//export any of the following functions GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS from a server route
export function GET(request: Request) {
  return Response.json({ success: true });
}
