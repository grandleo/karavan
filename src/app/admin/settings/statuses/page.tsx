'use client'

import {useFetchOrderStatusesQuery} from "@/store/api/admin/settings.api";
import PageWrapper from "@/components/simplePage/pageWrapper";
import PageHeader from "@/components/simplePage/pageHeader";
import PageContent from "@/components/simplePage/pageContent";
import {Paper, Radio, Table} from "@mantine/core";
import {useEffect, useState} from "react";

interface Status {
    id: number;
    name: string;
    role_id: number;
    role: string;
    choose_logistics: number;
    edit_invoice: number;
    required_dimension: number;
    required_payment: number;
    order_column: number;
}

export default function Page () {
    const {data: statuses} = useFetchOrderStatusesQuery('');

    return (
        <>
            <PageWrapper>
                <PageHeader title="Статусы заказов"/>
                <PageContent>
                    <Paper>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th></Table.Th>
                                    <Table.Th>Название статуса</Table.Th>
                                    <Table.Th>Инициатор смены статуса</Table.Th>
                                    <Table.Th>Работа с накладной</Table.Th>
                                    <Table.Th>Гарабиты</Table.Th>
                                    <Table.Th>Выбор логиста</Table.Th>
                                    <Table.Th>Оплата</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {statuses?.map((status: Status, index: number) => {
                                    return (
                                        <Table.Tr key={index}>
                                            <Table.Td>{index+1}</Table.Td>
                                            <Table.Td>{status.name}</Table.Td>
                                            <Table.Td>{status.role}</Table.Td>
                                            <Table.Td>
                                                <RadioButton name="edit_invoice" option={status.edit_invoice}/>
                                            </Table.Td>
                                            <Table.Td>
                                                <RadioButton name="required_dimension" option={status.required_dimension}/>
                                            </Table.Td>
                                            <Table.Td>
                                                <RadioButton name="choose_logistics" option={status.choose_logistics}/>
                                            </Table.Td>
                                            <Table.Td>
                                                <RadioButton name="required_payment" option={status.required_payment}/>
                                            </Table.Td>
                                        </Table.Tr>
                                    )
                                })}
                            </Table.Tbody>
                        </Table>
                    </Paper>
                </PageContent>
            </PageWrapper>
        </>
    )
}

const RadioButton = ({name, option}) => {
    const [checked, setChecked] = useState(false);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if(option){
            setChecked(true)
        } else {
            setDisabled(true)
        }
    }, [option]);

    return (
        <>
            <Radio name={name} checked={checked} disabled={disabled} color="#227E88" onChange={(event) => setChecked(event.currentTarget.checked)}/>
        </>
    )

}

const RadioEditInvoice = ({edit_invoice}) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if(edit_invoice) setChecked(true)
    }, [edit_invoice]);

    return (
        <>
            <Radio name="edit_invoice" checked={checked} color="#227E88" onChange={(event) => setChecked(event.currentTarget.checked)}/>
        </>
    )
}

const RadioRequiredDimension = ({required_dimension}) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if(required_dimension) setChecked(true)
    }, [required_dimension]);

    return (
        <>
            <Radio name="required_dimension" checked={checked} color="#227E88" onChange={(event) => setChecked(event.currentTarget.checked)}/>
        </>
    )
}