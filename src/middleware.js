import { NextResponse } from "next/server";
import { isValidToken } from "../utils/jwt";

export async function middleware(req, event) {

    if (req.nextUrl.pathname.startsWith('/checkout')) {
        console.log("req pathname", req.nextUrl)
        console.log("checkout middleware")
        return await validateUser(req);
    }

    return NextResponse.next()

}

export const config = {
    matcher: '/checkout/:path*',
}


const validateUser = async (req) => {

    let token = req.cookies.get('token')?.value
    let isValid = false;

    console.log("req middleware", req.nextUrl.pathname)
    try {
        await isValidToken(token)
        isValid = true;
        return NextResponse.next()
    } catch (error) {
        console.log("error catch", error);
        isValid = false;
        console.log(req.nextUrl.pathname)
        return NextResponse.redirect(new URL(`/auth/login?p=${req.nextUrl.pathname}`, req.url))
    }
}
