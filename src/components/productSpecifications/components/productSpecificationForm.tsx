import {Box, Button, Checkbox, Drawer, Flex, ScrollArea, Select, TextInput} from "@mantine/core";
import {Controller, FormProvider, useForm} from "react-hook-form";
import SpecificationValues from "@/components/productSpecifications/components/specificationValues";
import {ISpecificationTypes, ProductSpecificationFormProps} from "@/components/productSpecifications/types";
import {useEffect, useRef} from "react";
import {customAlphabet} from "nanoid/non-secure";
import {useCreateSpecificationMutation, useUpdateSpecificationMutation} from "@/store/api/admin/specifications.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";

const ProductSpecificationForm = ({
                                      opened = false,
                                      open,
                                      close,
                                      editValues,
                                      setEditValues
                                  }: ProductSpecificationFormProps) => {
    const nanoid = customAlphabet('1234567890', 16);

    const [createSpecification] = useCreateSpecificationMutation();
    const [updateSpecification] = useUpdateSpecificationMutation();

    const methods = useForm({
        defaultValues: {
            id: 0,
            name: {
                ru: '',
                en: '',
            },
            values: [
                {id: Number(nanoid()), value: ''},
            ]
        }
    });

    useEffect(() => {
        if (editValues) {
            methods.setValue('id', editValues.id)
            methods.setValue("name.ru", editValues.name.ru)
            methods.setValue("name.en", editValues.name.en)
            methods.setValue('values', editValues.values)
        }
    }, [editValues]);

    const onSubmit = (data: ISpecificationTypes) => {
        const request = editValues ? updateSpecification(data) : createSpecification(data);

        request.unwrap()
            .then((payload) => {
                closeForm()
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error))
    };

    const specificationValuesRef = useRef<{ resetValues: () => void } | null>(null);

    const closeForm = () => {
        setEditValues(undefined);
        methods.reset();
        if (specificationValuesRef.current) {
            specificationValuesRef.current.resetValues();
        }
        close();
    };

    return (
        <>
            <Button onClick={open}>Добавить характеристику</Button>
            <Drawer
                opened={opened}
                onClose={closeForm}
                position="right"
                scrollAreaComponent={ScrollArea.Autosize}
                title={editValues ? "Редактирование характеристики" : "Добавление характеристики"}>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <Box style={{flexGrow: 1}}>
                                <Controller
                                    name="name.ru"
                                    control={methods.control}
                                    rules={{
                                        required: "Поле обязательно для заполнения",
                                        minLength: {
                                            value: 3,
                                            message: "Минимальная длина поля - 3 символа",
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "Максимальная длина поля - 50 символов",
                                        },
                                    }}
                                    render={({field, fieldState: {error}}) => (
                                        <TextInput
                                            label="Название"
                                            value={field.value}
                                            error={error?.message}
                                            onChange={(event) => {
                                                field.onChange(event.currentTarget.value.trimStart());
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="name.en"
                                    control={methods.control}
                                    rules={{
                                        minLength: {
                                            value: 3,
                                            message: "Минимальная длина поля - 3 символа",
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "Максимальная длина поля - 50 символов",
                                        },
                                    }}
                                    render={({field, fieldState: {error}}) => (
                                        <TextInput
                                            label="Название en"
                                            value={field.value}
                                            error={error?.message}
                                            onChange={(event) => {
                                                field.onChange(event.currentTarget.value.trimStart());
                                            }}
                                        />
                                    )}
                                />

                                <SpecificationValues ref={specificationValuesRef}/>
                            </Box>

                            <Button type="submit">{editValues ? "Обновить" : "Добавить"}</Button>
                    </form>
                </FormProvider>
            </Drawer>
        </>
    )
}

export default ProductSpecificationForm;