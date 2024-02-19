import {Box, Button, Drawer, Flex, TextInput} from "@mantine/core";
import {DropzoneImages} from "@/components/inputs";
import {Controller, useForm} from "react-hook-form";
import {
    useAddProducerCountryMutation,
    useGetProducerCountryQuery, useUpdateProducerCountryMutation
} from "@/store/api/admin/producerCountry.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useSelector} from "react-redux";
import {getProducerCountriesState} from "@/store/slices/producerCountrySlice";
import {useEffect} from "react";
import {useActions} from "@/hooks/useActions";

const AddOrUpdateProducerCountry = ({opened = false, open, close} : AddOrUpdateProducerCountryTypes) => {
    const {producer_country_id} = useSelector(getProducerCountriesState);
    const {setProducerCountryId} = useActions();
    const [addProducerCountry] = useAddProducerCountryMutation();
    const [updateProducerCountry] = useUpdateProducerCountryMutation();

    const {data: country, refetch} = useGetProducerCountryQuery(producer_country_id, {
        skip: producer_country_id === 0,
    });

    const {
        handleSubmit,
        formState: {errors},
        setError,
        setValue,
        control,
        getValues,
        reset
    } = useForm<IForm>({
        defaultValues: {
            id: 0,
            name: '',
            image: [],
            uploaded_image: ''
        }
    })

    useEffect(() => {
        if(country){
            setValue('id', country.id);
            setValue('name', country.name);
            setValue('uploaded_image', country.uploaded_image);
        }
    }, [country]);

    useEffect(() => {
        if(producer_country_id !== 0) {
            refetch()
        }
    }, [producer_country_id]);

    const onSubmit = async (data: IForm) => {

        if(data.image.length === 0 && !data.uploaded_image) {
            setError('image',  { type: 'custom', message: 'Изображение обязательное' })

            return;
        }

        const formData = new FormData();
        formData.append("id", data.id.toString());
        formData.append("name", data.name);

        data.image.forEach((image, index) => {
            formData.append(`image[${index}]`, image);
        });

        const request = country ? updateProducerCountry(formData) : addProducerCountry(formData);

        request.unwrap().then((payload) => {
            reset();
            close();
            setProducerCountryId(0);
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
                    setProducerCountryId(0);
                    close();
                }}
                position="right"
                title={country ? "Редактирование страны" : "Добавление страны"}>

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

                            <DropzoneImages setValue={setValue} image={country?.uploaded_image} error={errors.image?.message}/>
                        </Box>

                        <Button type="submit">{country ? "Обновить" : "Добавить"}</Button>
                    </Flex>
                </form>

            </Drawer>
        </>
)
}

export default AddOrUpdateProducerCountry;