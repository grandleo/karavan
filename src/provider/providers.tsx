'use client'

import {MantineProvider} from "@mantine/core";
import Theme from "@/style/theme";
import ReduxProvider from "@/provider/reduxProvider";
import {ModalsProvider} from "@mantine/modals";
import {Notifications} from '@mantine/notifications';
import 'dayjs/locale/ru';
import {DatesProvider} from "@mantine/dates";
import {LanguageProvider} from "@/provider/LanguageProvider";
import {WarehouseProvider} from "@/features/warehouses/providers/WarehouseProvider";

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