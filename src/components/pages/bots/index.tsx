'use client'

import {FormProvider, useForm} from "react-hook-form";
import {
    useCreateBotApiMutation,
    useDeleteBotApiMutation,
    useGetBotsApiQuery,
    useUpdateBotApiMutation
} from "@/store/api/bots.api";
import {useActions} from "@/hooks/useActions";
import {useDisclosure} from "@mantine/hooks";
import {useSelector} from "react-redux";
import {getBotApiSliceState} from "@/store/slices/botsApiSlice";
import {useEffect} from "react";
import {Button} from "@mantine/core";
import SimplePage from "@/components/simplePage";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {BotApiForm, BotsApiList} from "@/components/botsApi";


const defaultValues = {
    id: '',
    name: '',
    api: ''
}

const ApiBots = () => {
    const methods = useForm({defaultValues});
    const {data: botsApi = [], isLoading} = useGetBotsApiQuery('');
    const [createBotApi] = useCreateBotApiMutation();
    const [updateBotApi] = useUpdateBotApiMutation();
    const [deleteBotApi] = useDeleteBotApiMutation();
    const {resetBotApiFormValues} = useActions();

    const [opened, {open, close}] = useDisclosure(false);
    const {editValues} = useSelector(getBotApiSliceState)


    useEffect(() => {
        if ((!isLoading && botsApi.length === 0) || editValues) {
            open();
        }
    }, [isLoading, botsApi, editValues]);

    const handleAddBotApi = (data: IWarehouse) => {
        createBotApi(data).unwrap().then((payload) => {
            SuccessNotifications(payload);
            methods.reset();
            close();
        }).catch((error) => ErrorNotifications(error));
    }

    const handleEditBotApi = (data:  IBotType) => {
        updateBotApi(data).unwrap().then((payload) => {
            SuccessNotifications(payload);
            methods.reset();
            resetBotApiFormValues('');
            close();
        }).catch((error) => ErrorNotifications(error));
    }

    const handleDeleteBotApi = (data:  IBotType) => {
        deleteBotApi(data).unwrap().then((payload) => {
            SuccessNotifications(payload);
        }).catch((error) => ErrorNotifications(error));
    }

    return (
        <SimplePage
            title="Список api"
            isLoading={isLoading}
            headerChildren={() => {
                return (
                    <Button onClick={() => open()}>Добавить api</Button>
                )
            }}
        >
            <BotsApiList
                apiBots={botsApi}
                onDelete={handleDeleteBotApi}/>

            <FormProvider {...methods}>
                <BotApiForm
                    isOpen={opened}
                    onClose={close}
                    onAddApiBot={handleAddBotApi}
                    onEditApiBot={handleEditBotApi}/>
            </FormProvider>
        </SimplePage>
    )
}

export default ApiBots;