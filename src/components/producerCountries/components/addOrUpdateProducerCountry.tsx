import {Box, Button, Drawer, Flex, TextInput} from "@mantine/core";
import {DropzoneUploader} from "@/components/inputs";
import {Controller, useForm} from "react-hook-form";
import {
    useAddProducerCountryMutation,
    useUpdateProducerCountryMutation
} from "@/store/api/admin/producerCountry.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useEffect} from "react";
import {IAddOrUpdateProducerCountryTypes, ICountry} from "@/components/producerCountries/types";

const AddOrUpdateProducerCountry = ({opened = false, open, close, editValues, setEditValues} : IAddOrUpdateProducerCountryTypes) => {
    const [addProducerCountry] = useAddProducerCountryMutation();
    const [updateProducerCountry] = useUpdateProducerCountryMutation();

    const {
        handleSubmit,
        formState: {errors},
        setError,
        clearErrors,
        setValue,
        control,
        reset,
        watch
    } = useForm<ICountry>({
        defaultValues: {
            id: 0,
            name: '',
            image: [],
            image_url: ''
        }
    })

    const image_url = watch('image_url');

    useEffect(() => {
        if(editValues){
            setValue('id', editValues.id);
            setValue('name', editValues.name);
            setValue('image_url', editValues.image_url);
        }
    }, [editValues]);

    const onSubmit = async (data: ICountry) => {

        if(data.image.length === 0 && !data.image_url) {
            setError('image',  { type: 'custom', message: 'Изображение обязательное' })

            return;
        }

        const formData = new FormData();
        formData.append("id", data.id.toString());
        formData.append("name", data.name);

        data.image.forEach((image, index) => {
            formData.append(`image[${index}]`, image);
        });

        const request = editValues ? updateProducerCountry(formData) : addProducerCountry(formData);

        request.unwrap().then((payload) => {
            reset();
            close();
            setEditValues(undefined)
            SuccessNotifications(payload)
        }).catch((error) => ErrorNotifications(error))
    }

    return (
        <>
            <Button onClick={open}>Добавить страну</Button>
            <Drawer
                opened={opened}
                onClose={() => {
                    reset();
                    setEditValues(undefined)
                    close();
                }}
                position="right"
                title={editValues ? "Редактирование страны" : "Добавление страны"}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex direction="column" justify="space-between" gap={15} h="calc(100vh - 80px)">
                        <Box>
                            <Controller
                                name="name"
                                rules={{
                                    required: "Поле обязательно для заполнения",
                                    maxLength: {value: 100, message: "Максимальное кол-во символов 100"}
                                }}
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        label="Название страны"
                                        placeholder="Введите значение"
                                        onBlur={onBlur}
                                        onChange={(event) => {
                                            onChange(event.currentTarget.value);
                                        }}
                                        value={value}
                                        error={errors?.name?.message}
                                    />
                                )}/>

                            <DropzoneUploader setValue={setValue} image={image_url} error={errors.image?.message} clearErrors={clearErrors}/>
                        </Box>

                        <Button type="submit">{editValues ? "Обновить" : "Добавить"}</Button>
                    </Flex>
                </form>

            </Drawer>
        </>
)
}

export default AddOrUpdateProducerCountry;