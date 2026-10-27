import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function preferLocale(header: string): "en" | "vi" {
  const ranked = header
    .split(",")
    .map((part) => {
      const [tagRaw, ...params] = part.trim().split(";");
      const qParam = params.find((item) => item.trim().startsWith("q="));
      const q = qParam ? Number(qParam.trim().slice(2)) : 1;
      return { tag: (tagRaw ?? "").toLowerCase(), q: Number.isFinite(q) ? q : 0 };
    })
    .filter((item) => item.tag.length > 0)
    .sort((a, b) => b.q - a.q);

  for (const item of ranked) {
    if (item.tag.startsWith("vi")) return "vi";
    if (item.tag.startsWith("en")) return "en";
  }
  return "en";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const locale = preferLocale(request.headers.get("accept-language") ?? "");
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  const locale = pathname === "/vi" || pathname.startsWith("/vi/") ? "vi" : "en";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
