// for clicking clear completed itesm button
// get action from server>db>actions
import { clearPurchasedItems } from "@/src/lib/server/db-actions";
export async function POST() {
  try {
    await clearPurchasedItems();
    return Response.json({ ok: true });
  } catch (error) {}
}
