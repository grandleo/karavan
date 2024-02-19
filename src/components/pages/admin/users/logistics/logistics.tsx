'use client'

import SimplePage from "../../../../simplePage";
import LogisticsFilter from "./componets/logisticsFilter";
import {Paper, Table} from "@mantine/core";
import {useSelector} from "react-redux";
import {getLogisticsState} from "@/store/slices/logisticSlice";
import {useGetUsersQuery} from "@/store/api/admin/users.api";
import EmptyData from "@/components/emptyData";
import LogisticRow from "@/components/pages/admin/users/logistics/componets/logisticRow";
import {useEffect} from "react";
import {useActions} from "@/hooks/useActions";
import {useDisclosure} from "@mantine/hooks";
import UpdateLogistic from "@/components/pages/admin/users/logistics/componets/updateLogistic";

const Logistics = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const {search} = useSelector(getLogisticsState);
    const {resetLogisticState} = useActions();

    const {data: logistics, isLoading} = useGetUsersQuery({
        role: 'logistic',
        search: search
    });

    useEffect(() => {
        return () => {
            resetLogisticState();
        }
    }, []);

    return (
        <SimplePage title="Логисты" isLoading={isLoading}>
            <LogisticsFilter/>
            <UpdateLogistic opened={opened} close={close}/>

            {logistics?.length > 0 ? (
                <Paper shadow="xs">
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th w={40}>ID</Table.Th>
                                <Table.Th>Имя логиста</Table.Th>
                                <Table.Th w={220}>Компания</Table.Th>
                                <Table.Th w={110}>Инн</Table.Th>
                                <Table.Th w={125}>Телефон</Table.Th>
                                <Table.Th w={220}>Email</Table.Th>
                                <Table.Th w={30}></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {logistics.map( (logistic: IUser, index: number) => {
                                return (
                                    <LogisticRow user={logistic} open={open} key={index}/>
                                )
                            })}
                        </Table.Tbody>
                    </Table>
                </Paper>
            ) : (
                <EmptyData height={400} text="Нет логистов"/>
            )}
        </SimplePage>
    )
}

export default Logistics;