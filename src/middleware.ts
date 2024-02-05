import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";
import {setToken} from "@/config/http";
import {getSession} from "next-auth/react";

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    async function middleware(req) {
        const token = await getToken({ req })
        const isAuth = !!token

        if(!isAuth && (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/client') || req.nextUrl.pathname.startsWith('/logistic') || req.nextUrl.pathname.startsWith('/supplier'))){
            return NextResponse.redirect(new URL('/', req.url))
        }

        // if (isAuth && req.nextUrl.pathname.startsWith('/login')) {
        //     return NextResponse.redirect(new URL('/'+req.nextauth.token?.role, req.url))
        // }

        // if (isAuth && req.nextUrl.pathname.startsWith('/registration')) {
        //     return NextResponse.redirect(new URL('/'+req.nextauth.token?.role, req.url))
        // }

        if (req.nextUrl.pathname.startsWith('/admin') && req.nextauth.token?.role !== 'admin') {
            return NextResponse.redirect(new URL('/'+req.nextauth.token?.role, req.url))
        }

        if (req.nextUrl.pathname.startsWith('/client') && req.nextauth.token?.role !== 'client') {
            return NextResponse.redirect(new URL('/'+req.nextauth.token?.role, req.url))
        }

        if (req.nextUrl.pathname.startsWith('/supplier') && req.nextauth.token?.role !== 'supplier') {
            return NextResponse.redirect(new URL('/'+req.nextauth.token?.role, req.url))
        }

        if (req.nextUrl.pathname.startsWith('/logistic') && req.nextauth.token?.role !== 'logistic') {
            return NextResponse.redirect(new URL('/'+req.nextauth.token?.role, req.url))
        }


    },
    {
        pages: {
            signIn: '/'
        },
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    },
)

export const config = { matcher: ["/login/:path*", "/client/:path*", "/supplier/:path*", "/logistic/:path*", "/admin/:path*"] }