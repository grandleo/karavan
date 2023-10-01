import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        role: string;
        surname: string;
        patronymic: string;
        accessToken: string;
    }

    interface Session extends DefaultSession {
        user?: User;
    }
}