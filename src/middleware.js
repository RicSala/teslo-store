import { NextResponse } from "next/server";
import { isValidToken } from "../utils/jwt";

export async function middleware(req, event) {

    if(req.nextUrl.pathname.startsWith('/checkout')) {
        return await validateUser(req);
    }

    return NextResponse.next()

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/checkout/:path*',
  }


const validateUser = async (req) => {
    const { token = '' } = req.cookies;
    let isValid = false;

    console.log("req middleware", req.nextUrl.pathname)
    try {
        await isValidToken(token)
        isValid = true;
        return NextResponse.next()
    } catch (error) {
        console.log("error", error);
        isValid = false;
        console.log(req.nextUrl.pathname)
        return NextResponse.redirect(new URL(`/auth/login?p=${req.nextUrl.pathname}`, req.url))
    }
}
