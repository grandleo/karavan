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