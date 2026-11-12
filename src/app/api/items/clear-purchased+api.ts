// for clicking clear completed itesm button
// get action from server>db>actions
import { clearPurchasedItems } from "@/src/lib/server/db-actions";
export async function POST() {
  try {
    await clearPurchasedItems();
    return Response.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to clear completed items";
    return Response.json({ error: message }, { status: 500 });
  }
}
