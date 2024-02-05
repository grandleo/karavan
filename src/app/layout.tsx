import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@/style/global.css';
import 'react-complex-tree/lib/style-modern.css';

import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Providers from "@/provider/providers";
import SessionLoader from "@/provider/sessionLoader";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Karavan.bz',
    description: 'Легкая оптовая торговля',
    icons: [
        {rel: 'icon', url: '/favicon.ico'}
    ],
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Providers>
            <SessionLoader>
                {children}
            </SessionLoader>
        </Providers>
        </body>
        </html>
    )
}