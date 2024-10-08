import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import 'react-complex-tree/lib/style-modern.css';

import '@/styles/global.css';

import type {Metadata} from 'next'
import {Manrope} from 'next/font/google'
import Providers from "@/providers/providers";

const manrope = Manrope({
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
    weight: ['300', '400', '500', '600', '700', '800'],
    variable: '--font-manrope',
});

export const metadata: Metadata = {
    title: 'Karavan.bz',
    description: 'Легкая оптовая торговля',
    icons: [
        {rel: 'icon', url: '/favicon.svg'}
    ],
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={manrope.className}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}