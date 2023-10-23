'use client'

import {MantineProvider} from "@mantine/core";
import Theme from "@/style/theme";
import AuthProvider from "@/provider/authProvider";
import ReduxProvider from "@/provider/reduxProvider";
import {ModalsProvider} from "@mantine/modals";
import { Notifications } from '@mantine/notifications';


interface Props {
    children: React.ReactNode
}

export default function Providers({children}: Props) {
    return (
        <AuthProvider>
            <MantineProvider theme={Theme}>
                <ModalsProvider>
                    <Notifications />
                    <ReduxProvider>
                        {children}
                    </ReduxProvider>
                </ModalsProvider>
            </MantineProvider>
        </AuthProvider>
    )
}