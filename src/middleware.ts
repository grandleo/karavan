import {NextRequest, NextResponse} from "next/server";
import {getSession} from "@/helpers/auth";
import {getUser} from "@/features/auth/utils/userUtil";

export async function middleware(request: NextRequest) {
    const { pathname, origin } = request.nextUrl;
    const user = await getUser(true, request);

    const unauthenticatedPaths = ['/'];
    const rolePaths = ['/admin', '/supplier', '/client', '/logistic']; // Добавьте другие роли, если необходимо

    // Если пользователь не аутентифицирован
    if (!user) {
        if (unauthenticatedPaths.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/', origin));
        }
    }

    // Если пользователь аутентифицирован
    if (pathname === '/') {
        return NextResponse.redirect(new URL(`/${user.role}`, origin));
    }

    // Проверяем, соответствует ли путь роли пользователя
    if (pathname.startsWith(`/${user.role}`)) {
        return NextResponse.next();
    } else if (rolePaths.includes(pathname)) {
        // Если пользователь пытается получить доступ к пути другой роли
        return NextResponse.redirect(new URL(`/${user.role}`, origin));
    }

    // Для всех остальных случаев
    return NextResponse.next();

    // const public_url = process.env.NEXT_PUBLIC_URL + '/'
    //
    // const session : ISession | null  = await getSession();
    //
    // const role = session?.user.role;
    // const accessToken = session?.user.accessToken;
    //
    // // If role is not set and trying to access protected routes, redirect to public_url
    // if (!role && (request.nextUrl.pathname.startsWith('/admin') ||
    //     request.nextUrl.pathname.startsWith('/client') ||
    //     request.nextUrl.pathname.startsWith('/logistic') ||
    //     request.nextUrl.pathname.startsWith('/supplier'))) {
    //     return NextResponse.redirect(new URL(public_url, request.url));
    // }

    // if(role) {
    //     if ((request.nextUrl.href === public_url) && accessToken) {
    //         return NextResponse.redirect(new URL('/'+role, request.url))
    //     }
    //
    //     if (request.nextUrl.pathname.startsWith('/admin') && role !== 'admin') {
    //         return NextResponse.redirect(new URL('/'+role, request.url))
    //     }
    //
    //     if (request.nextUrl.pathname.startsWith('/client') && role !== 'client') {
    //         return NextResponse.redirect(new URL('/'+role, request.url))
    //     }
    //
    //     if (request.nextUrl.pathname.startsWith('/logistic') && role !== 'logistic') {
    //         return NextResponse.redirect(new URL('/'+role, request.url))
    //     }
    //
    //     if (request.nextUrl.pathname.startsWith('/supplier') && role !== 'supplier') {
    //         return NextResponse.redirect(new URL('/'+role, request.url))
    //     }
    // }

    // If none of the conditions match, proceed with the request
    // return NextResponse.next();
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