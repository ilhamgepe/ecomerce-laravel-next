import { getToken } from "next-auth/jwt";
import {} from "next-auth/middleware";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

function matchPathName(url: NextURL, pathname: string[]) {
  return pathname.some((stringUrl) => url.pathname === stringUrl);
}
export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request });
  const url = request.nextUrl.clone();
  if (matchPathName(url, ["/dashboard", "/user"]) && !session) {
    return NextResponse.redirect(
      new URL("http://localhost:3000/api/auth/signin", request.url)
    );
  }

  if (matchPathName(url, ["/api/auth/signin"]) && session) {
    return NextResponse.redirect(
      new URL("http://localhost:3000/dashboard", request.url)
    );
  }

  // return NextResponse.next();
}
