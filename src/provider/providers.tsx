'use client'

import {MantineProvider} from "@mantine/core";
import Theme from "@/style/theme";
import AuthProvider from "@/provider/authProvider";


interface Props {
    children: React.ReactNode
}

export default function Providers({children}: Props) {
    return (
        <AuthProvider>
            <MantineProvider theme={Theme}>
                {children}
            </MantineProvider>
        </AuthProvider>
    )
}