import { NextResponse } from "next/server";

export function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/api/entries/")) {
    const id = req.nextUrl.pathname.replace("/api/entries/", "");
    console.log({ id });

    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    if (!checkMongoIDRegExp.test(id)) {
      const url = req.nextUrl.clone();
      url.pathname = "/api/bad-request";
      url.search = `?message=Invalid ID ${id}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: "/api/entries/:path*",
};
