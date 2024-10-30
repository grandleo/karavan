import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

type NotificationType = 'success' | 'error';

export function notify(message: string, type: NotificationType = 'success', title?: string) {
    const isSuccess = type === 'success';

    showNotification({
        title: title || (isSuccess ? 'Успешно' : 'Ошибка'),
        message: message,
        color: isSuccess ? 'teal' : 'red',
        // icon: isSuccess ? <IconCheck size={16} /> : <IconX size={16} />,
        position: 'bottom-left',
        autoClose: 2500,
    });
}