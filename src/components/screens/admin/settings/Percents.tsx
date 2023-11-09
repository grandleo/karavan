'use client'

import {useEffect, useState} from "react";
import {useFetchPercentsQuery, useSetPercentMutation} from "@/store/api/admin/settings.api";
import {NumberInput, Table} from "@mantine/core";
import { IconPercentage } from '@tabler/icons-react';
import {Controller, useForm} from "react-hook-form";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import PageHeader from "@/components/ui/page/pageHeader";
import AddSpecificationItem from "@/components/ui/specifications/AddSpecificationItem";
import PageWrapper from "@/components/ui/page/pageWrapper";
import PageContent from "@/components/ui/page/pageContent";

interface Percent {
    id: number;
    name: string;
    percent: number;
}

const Percents = () => {
    const {data: percents, isLoading} = useFetchPercentsQuery('');

    return (
        <>
            <PageWrapper>
                <PageHeader title="Процент"/>
                <PageContent>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th></Table.Th>
                                <Table.Th>Категории</Table.Th>
                                <Table.Th>Процент</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {percents?.map((item: Percent, index: number) => {
                                return (
                                    <PercentItem key={index} item={item} index={index}/>
                                )
                            })}
                        </Table.Tbody>
                    </Table>
                </PageContent>
            </PageWrapper>
        </>
    )
}

interface IPercentItem {
    item: Percent;
    index: number;
}

const PercentItem = ({item, index}: IPercentItem) => {
    const [percent, setPercent] = useState<string | number>(item.percent);

    const [setPercentQuery] = useSetPercentMutation();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: item.id,
            percent: item.percent,
        }
    });

    useEffect(() => {
        setPercent(item.percent)
    }, [item.percent]);

    const onSubmit = (data: any) => {
        setPercentQuery(data).unwrap()
            .then((payload) => {
                SuccessNotifications(payload);
            })
            .catch((error) => ErrorNotifications(error))
    }

    return (
        <Table.Tr key={index}>
            <Table.Td>{index+1}</Table.Td>
            <Table.Td>{item.name}</Table.Td>
            <Table.Td>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="percent"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <NumberInput
                                placeholder="0"
                                decimalScale={2}
                                value={value}
                                onBlur={onBlur}
                                onChange={(value) => {
                                    onChange(value);
                                }}
                                rightSection={<IconPercentage/>}
                                min={0}
                                max={100}
                            />
                        )}
                    />
                </form>
            </Table.Td>
        </Table.Tr>
    )
}

export default Percents;