import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import {} from "next-auth/middleware";

export async function middleware(request: NextApiRequest) {
  const session = await getToken({ req: request });
  if (!session) {
    console.log({ session });

    return NextResponse.redirect(
      new URL("http://localhost:3000/api/auth/signin", request.url)
    );
  }
}

export const config = {
  matcher: ["/dashboard", "/me"],
};
