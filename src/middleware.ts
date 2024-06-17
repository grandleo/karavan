import {NextRequest, NextResponse} from "next/server";
import {getSession} from "@/helpers/auth";

interface ISession {
    user: {
        role: string;
        accessToken: string;
    },
    expires: number;
    iat: number;
    exp: number;
}

export async function middleware(request: NextRequest) {
    const public_url = process.env.NEXT_PUBLIC_URL + '/'

    const session : ISession | null  = await getSession();

    const role = session?.user.role;
    const accessToken = session?.user.accessToken;

    // If role is not set and trying to access protected routes, redirect to public_url
    if (!role && (request.nextUrl.pathname.startsWith('/admin') ||
        request.nextUrl.pathname.startsWith('/client') ||
        request.nextUrl.pathname.startsWith('/logistic') ||
        request.nextUrl.pathname.startsWith('/supplier'))) {
        return NextResponse.redirect(new URL(public_url, request.url));
    }

    if(role) {
        if ((request.nextUrl.href === public_url) && accessToken) {
            return NextResponse.redirect(new URL('/'+role, request.url))
        }

        if (request.nextUrl.pathname.startsWith('/admin') && role !== 'admin') {
            return NextResponse.redirect(new URL('/'+role, request.url))
        }

        if (request.nextUrl.pathname.startsWith('/client') && role !== 'client') {
            return NextResponse.redirect(new URL('/'+role, request.url))
        }

        if (request.nextUrl.pathname.startsWith('/logistic') && role !== 'logistic') {
            return NextResponse.redirect(new URL('/'+role, request.url))
        }

        if (request.nextUrl.pathname.startsWith('/supplier') && role !== 'supplier') {
            return NextResponse.redirect(new URL('/'+role, request.url))
        }
    }

    // If none of the conditions match, proceed with the request
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/admin/:path*",
        "/client/:path*",
        "/logistic/:path*",
        "/supplier/:path*",
    ]
}