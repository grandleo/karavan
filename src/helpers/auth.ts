'use server'

import {jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import {http} from "@/config/http";
import {redirect} from 'next/navigation'

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

interface IPayload {
    [key: string]: string | number | any;
    user: IUserPayload;
    expires: number;
}

interface IUserPayload {
    role: string;
    accessToken: string;
}

export async function encrypt(payload: IPayload) {
    return await new SignJWT(payload).setProtectedHeader({alg: 'HS256'}).setIssuedAt().setExpirationTime(payload.expires).sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const {payload} = await jwtVerify(input, key, {
        algorithms: ['HS256']
    })

    return payload;
}

export async function login(email: string) {
    const {data} = await http.post('auth/login', {email: email});

    const user = {
        role: data.role,
        accessToken: data.accessToken
    }

    const expires = data.expiration;
    const session = await encrypt({user, expires})

    cookies().set('session', session, {expires, httpOnly: true});

    redirect(`/${data.role}`)
}

export async function getSession() {
    const session = cookies().get('session')?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function getRoleSession() {
    const session = cookies().get('session')?.value;
    if (!session) return null;

    const {user: {role}} = await decrypt(session);

    return role;
}

export async function getAccessToken() {
    const session = cookies().get('session')?.value;
    if (!session) return null;

    const {user: {accessToken}} = await decrypt(session);

    return accessToken;
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get('session')?.value;

    if (!session) return;

    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);

    const res = NextResponse.next();
    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}

export async function logout(deleteToken = false) {
    // if (deleteToken) {
    //     await http.get('auth/logout');
    // }
    cookies().delete('session');
    redirect('/');
}