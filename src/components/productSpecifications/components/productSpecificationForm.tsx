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
            name: '',
            required: false,
            use_product_name: false,
            use_product_card: false,
            type_choice: 'single',
            values: [
                {id: Number(nanoid()), value: ''},
            ]
        }
    });

    useEffect(() => {
        if (editValues) {
            methods.setValue('id', editValues.id)
            methods.setValue('name', editValues.name)
            methods.setValue('required', editValues.required)
            methods.setValue('use_product_name', editValues.use_product_name)
            methods.setValue('use_product_card', editValues.use_product_card)
            methods.setValue('type_choice', editValues.type_choice)
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
                                    control={methods.control}
                                    name="name"
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
                                    control={methods.control}
                                    name="required"
                                    render={({field: {value, onChange}}) => (
                                        <Checkbox
                                            checked={value}
                                            onChange={(e) => onChange(e.currentTarget.checked)}
                                            label="Обязательное поле"
                                        />
                                    )}
                                />

                                <Controller
                                    control={methods.control}
                                    name="use_product_name"
                                    render={({field: {value, onChange}}) => (
                                        <Checkbox
                                            checked={value}
                                            onChange={(e) => onChange(e.currentTarget.checked)}
                                            label="Участвует в формировании названия"
                                        />
                                    )}
                                />

                                <Controller
                                    control={methods.control}
                                    name="use_product_card"
                                    render={({field: {value, onChange}}) => (
                                        <Checkbox
                                            checked={value}
                                            onChange={(e) => onChange(e.currentTarget.checked)}
                                            label="Выводить в карточке товара"
                                        />
                                    )}
                                />

                                <Controller
                                    name="type_choice"
                                    control={methods.control}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            label="Тип выбора"
                                            data={[
                                                {value: 'single', label: 'Единичный выбор'},
                                                {value: 'multiple', label: 'Множественный выбор'},
                                            ]}
                                            mb={{base: 10}}
                                        />
                                    )}/>

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