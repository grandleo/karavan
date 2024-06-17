import {notifications} from "@mantine/notifications";

interface ServerResponse {
    title: string;
    message: string;
}

interface ErrorResponse {
    data: ServerResponse;
    status: number
}

function isErrorResponse(error: unknown): error is ErrorResponse {
    return typeof error === 'object' && error !== null && 'data' in error && 'status' in error;
}

export function showNotification({ title, message }: ServerResponse, color: 'red' | 'teal') {
    notifications.show({
        color,
        title,
        message,
    });
}

export function ErrorNotifications(error: unknown) {
    if (isErrorResponse(error)) {
        showNotification(error.data, 'red');
    } else {
        showNotification({
            title: 'Ошибка',
            message: String(error)
        }, 'red');
    }
}

export function SuccessNotifications(payload: ServerResponse){
    showNotification(payload, 'teal');
}