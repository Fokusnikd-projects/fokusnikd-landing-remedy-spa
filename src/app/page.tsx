import { redirect } from "next/navigation";

/** Middleware chooses /en or /vi from Accept-Language. This is the no-middleware fallback. */
export default function RootPage() {
  redirect("/en");
}
