import { NextResponse } from "next/server";
import { isValidToken } from "../utils/jwt";
import { getToken } from "next-auth/jwt";

const validAdminAreaRoles = ['admin', 'editor', 'super'];

export async function middleware(req, event) {

    // REVIEW why are we using "getToken" instead of "getSession"?
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // useful info about the user
    // console.log({ session });

    // if (req.nextUrl.pathname.startsWith('/checkout')) {
    //     // console.log("req pathname", req.nextUrl)
    //     // console.log("checkout middleware")
    //     return await validateUser(req);
    // }


    if (req.nextUrl.pathname.startsWith('/admin')) {

        if (!session) {
            const destination = req.nextUrl.pathname;
            const url = req.nextUrl.clone();
            url.pathname = "/auth/login";
            url.searchParams.set("p", destination);
            return NextResponse.redirect(url);
        }
        // if it's validAdminAreaRoles, then we can continue
        if (!validAdminAreaRoles.includes(session.user.role)) {

            return NextResponse.redirect(new URL(`/`, req.url))
        }

    }

    // protect the api routes that start with /api/admin
    if (req.nextUrl.pathname.startsWith('/api/admin')) {

        if (!session) {
            // return a message not authorized
            return new Response(JSON.stringify({ message: "not authorized" }), {
                status: 401,
                statusText: "not authorized"
            })
        }
        // if it's not a validAdminAreaRoles, then return a message not authorized
        if (!validAdminAreaRoles.includes(session.user.role)) {

            // return a message not authorized
            return new Response(JSON.stringify({ message: "not authorized" }), {
                status: 401,
                statusText: "not authorized"
            })
        }
    }

    if (req.nextUrl.pathname.startsWith('/checkout')) {

        if (!session) {
            const destination = req.nextUrl.pathname;
            const url = req.nextUrl.clone();
            url.pathname = "/auth/login";
            url.searchParams.set("p", destination);

            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();

}

export const config = {
    // matcher: '/checkout/:path*',
    matcher: ['/checkout/address', '/checkout/summary', '/admin', '/admin/:path*', '/api/admin', '/api/admin/:path*']
}


// this is the old middleware
// const validateUser = async (req) => {

//     let token = req.cookies.get('token')?.value
//     let isValid = false;

//     // console.log("req middleware", req.nextUrl.pathname)
//     try {
//         await isValidToken(token)
//         isValid = true;
//         return NextResponse.next()
//     } catch (error) {
//         // console.log("error catch", error);
//         isValid = false;
//         // console.log(req.nextUrl.pathname)
//         return NextResponse.redirect(new URL(`/auth/login?p=${req.nextUrl.pathname}`, req.url))
//     }
// }
