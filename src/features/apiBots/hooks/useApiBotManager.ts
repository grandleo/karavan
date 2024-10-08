import { useState, useEffect } from 'react';
import {
    useFetchApiBotsQuery,
    useLazyFetchApiBotQuery,
    useToggleApiBotMutation,
} from '@/features/apiBots/api/apiBotsApi';

const useApiBotManager = () => {
    const { data: apiBots, isLoading } = useFetchApiBotsQuery('');
    const [toggleApiBot, { isLoading: isToggling }] = useToggleApiBotMutation();
    const [triggerFetchApiBot, { data: selectedApiBot, isFetching: isFetchingApiBot }] =
        useLazyFetchApiBotQuery();

    // Управление состоянием открытия формы
    const [opened, setOpened] = useState(false);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    const [selectedApiBotId, setSelectedApiBotId] = useState<number | null>(null);

    // Управление состоянием загрузки с задержкой 300 мс
    const [isLoadingWithDelay, setIsLoadingWithDelay] = useState(false);

    // useEffect для управления состоянием загрузки с задержкой 300 мс
    useEffect(() => {
        if (isLoading || isToggling) {
            setIsLoadingWithDelay(true);
        } else {
            const timer = setTimeout(() => {
                setIsLoadingWithDelay(false);
            }, 300); // Задержка 300 мс

            return () => clearTimeout(timer);
        }
    }, [isLoading, isToggling]);

    const handleToggle = async (id: number) => {
        try {
            await toggleApiBot(id).unwrap();
        } catch (error) {
            console.error('Ошибка при переключении ApiBot:', error);
        }
    };

    const openAddForm = () => {
        setFormMode('add');
        setSelectedApiBotId(null);
        setOpened(true);
    };

    const openEditForm = (id: number) => {
        setFormMode('edit');
        setSelectedApiBotId(id);
        triggerFetchApiBot(id);
        setOpened(true);
    };

    const closeForm = () => {
        setOpened(false);
        setSelectedApiBotId(null);
    };

    return {
        apiBots,
        isLoadingWithDelay,
        opened,
        formMode,
        selectedApiBotId,
        selectedApiBot,
        handleToggle,
        openAddForm,
        openEditForm,
        closeForm,
    };
};

export default useApiBotManager;