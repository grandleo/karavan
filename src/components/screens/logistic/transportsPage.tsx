'use client'

import {Paper, Text} from "@mantine/core";
import PageWrapper from "@/components/ui/page/pageWrapper";
import PageContent from "@/components/ui/page/pageContent";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
const TransportsPage = () => {
    return (
        <>
            <PageWrapper>
                <PageContent fullHeight>
                    <Paper shadow="xs" p="xl">
                        <Text>Нет транспорта</Text>
                        <Text>Для подбора заявок необходимо добавить информацию о ваших транспортных средствах, так как автомобиль для доставки медикаментов должен соответствовать определенным требованиям</Text>
                        <PrimaryBtn>Добавить транспорт</PrimaryBtn>
                    </Paper>
                </PageContent>
            </PageWrapper>
        </>
    )
}

export default TransportsPage;