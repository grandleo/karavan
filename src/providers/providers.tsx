'use client'

import {MantineProvider} from "@mantine/core";
import {ModalsProvider} from "@mantine/modals";
import {Notifications} from '@mantine/notifications';
import 'dayjs/locale/ru';
import {DatesProvider} from "@mantine/dates";
import {LanguageProvider} from "@/providers/LanguageProvider";
import {WarehouseProvider} from "@/features/warehouses/providers/WarehouseProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import Theme from "@/styles/theme";

interface Props {
    children: React.ReactNode
}

export default function Providers({children}: Props) {
    return (
        <MantineProvider theme={Theme}>
            <LanguageProvider>
                <WarehouseProvider>
                    <DatesProvider settings={{locale: 'ru'}}>
                        <ModalsProvider>
                            <Notifications/>
                            <ReduxProvider>
                                {children}
                            </ReduxProvider>
                        </ModalsProvider>
                    </DatesProvider>
                </WarehouseProvider>
            </LanguageProvider>
        </MantineProvider>
    )
}