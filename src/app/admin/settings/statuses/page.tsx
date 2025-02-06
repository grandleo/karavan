'use client'

import {Button} from "@mantine/core";
import {useEffect, useState} from "react";
import StatusList from "@/features/statuses/components/StatusList";
import SimplePage from "@/components/simplePage";
import {useDisclosure} from "@mantine/hooks";
import StatusForm from "@/features/statuses/components/StatusForm";
import {useFetchOrderStatusesQuery} from "@/features/statuses/api/statusesApi";

export default function Page () {
    const [opened, { open, close }] = useDisclosure(false);
    const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
    const { data: statuses, error, isLoading } = useFetchOrderStatusesQuery('');

    const openStatusForm = (statusId?: string) => {
        setEditingStatusId(statusId || null);
        open();
    };

    const closeStatusForm = () => {
        setEditingStatusId(null);
        close();
    };

    // Добавляем задержку 200мс для симуляции загрузки
    const [delayedLoading, setDelayedLoading] = useState(true);

    useEffect(() => {
        if (delayedLoading !== isLoading) {
            const timer = setTimeout(() => {
                setDelayedLoading(isLoading);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [isLoading, delayedLoading]);

    return (
        <>
            <SimplePage
                title="Статусы заказов"
                isLoading={delayedLoading}
                headerChildren={() => (
                    <Button onClick={() => openStatusForm()}>Добавить статус</Button>
                )}
            >
                <StatusForm
                    opened={opened}
                    onClose={closeStatusForm}
                    statusId={editingStatusId}
                />
                <StatusList statuses={statuses} onEditStatus={(statusId) => openStatusForm(statusId)}/>
            </SimplePage>
        </>
    )
}