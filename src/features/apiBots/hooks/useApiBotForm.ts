
import { useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import {
    useCreateApiBotMutation,
    useUpdateApiBotMutation,
    useDeleteApiBotMutation,
} from '@/features/apiBots/api/apiBotsApi';

interface FormValues {
    active: boolean;
    name: string;
    token: string;
    username_support: string;
    warehouses: number[];
}

interface UseApiBotFormProps {
    mode: 'add' | 'edit';
    apiBotId?: number | null;
    initialData?: any;
    onClose: () => void;
}

const useApiBotForm = ({ mode, apiBotId, initialData, onClose }: UseApiBotFormProps) => {
    const methods = useForm<FormValues>({
        defaultValues: {
            active: true,
            name: '',
            token: '',
            username_support: '',
            warehouses: [],
        },
    });

    // Мутации для создания, обновления и удаления ApiBot
    const [createApiBot, { isLoading: isCreating }] = useCreateApiBotMutation();
    const [updateApiBot, { isLoading: isUpdating }] = useUpdateApiBotMutation();
    const [deleteApiBot, { isLoading: isDeleting }] = useDeleteApiBotMutation();

    // Состояние для модального окна удаления
    const [modalOpened, setModalOpened] = useState(false);

    // Заполнение формы данными при редактировании
    useEffect(() => {
        if (initialData && mode === 'edit') {
            methods.reset({
                active: initialData.active,
                name: initialData.name,
                token: initialData.token,
                username_support: initialData.username_support ?? '',
                warehouses: initialData.warehouses.map((wh: any) => wh.id),
            });
        } else if (mode === 'add') {
            methods.reset({
                active: true,
                name: '',
                token: '',
                username_support: '',
                warehouses: [],
            });
        }
    }, [initialData, mode, methods]);

    // Функция обработки отправки формы
    const onSubmit = async (data: FormValues) => {
        try {
            if (mode === 'add') {
                await createApiBot(data).unwrap();
            } else if (mode === 'edit' && apiBotId !== null) {
                await updateApiBot({ id: apiBotId, ...data }).unwrap();
            }
            onClose();
        } catch (error) {
            console.error('Ошибка при сохранении ApiBot:', error);
        }
    };

    // Удаление ApiBot
    const handleDelete = () => {
        setModalOpened(true);
    };

    const confirmDelete = async () => {
        try {
            if (apiBotId) {
                await deleteApiBot({ id: apiBotId }).unwrap();
                setModalOpened(false);
                onClose();
            }
        } catch (error) {
            console.error('Ошибка при удалении ApiBot:', error);
        }
    };

    const cancelDelete = () => {
        setModalOpened(false);
    };

    return {
        methods,
        isCreating,
        isUpdating,
        isDeleting,
        modalOpened,
        handleDelete,
        confirmDelete,
        cancelDelete,
        onSubmit: methods.handleSubmit(onSubmit),
    };
};

export default useApiBotForm;