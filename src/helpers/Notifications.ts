import {notifications} from "@mantine/notifications";
import {AxiosResponse} from "axios";

interface ServerResponse {
    title: string;
    message: string;
}

interface ErrorResponse {
    data: ServerResponse;
    status: number
}

export function ErrorNotifications(error: ErrorResponse) {
    return notifications.show({
        color: 'red',
        title: error.data.title,
        message: error.data.message,
        // classNames: classes,
    })
}

export function SuccessNotifications(payload: ServerResponse){
    return notifications.show({
        color: 'teal',
        title: payload.title,
        message: payload.message,
        // classNames: classes,
    })
}