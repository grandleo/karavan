'use client'

import {MantineProvider} from "@mantine/core";
import Theme from "@/style/theme";
import AuthProvider from "@/provider/authProvider";
import ReduxProvider from "@/provider/reduxProvider";


interface Props {
    children: React.ReactNode
}

export default function Providers({children}: Props) {
    return (
        <AuthProvider>
            <MantineProvider theme={Theme}>
                <ReduxProvider>
                    {children}
                </ReduxProvider>
            </MantineProvider>
        </AuthProvider>
    )
}