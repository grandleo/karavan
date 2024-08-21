import {useCreateProductMutation, useUpdateProductMutation} from "@/store/api/admin/nomenclature.api";
import {Controller, FormProvider, useForm, useWatch} from "react-hook-form";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {Box, Button, Drawer, Flex, Select, Textarea, TextInput} from "@mantine/core";
import ProductSelectSpecification from "@/components/nomenclature/components/productSelectSpecification";
import {useEffect} from "react";
import classes from "@/components/nomenclature/styles.module.css";

// Определите типы для формы
type Specification = {
    id: string | number;
    value: string | string[];
};

type FormValues = {
    id: number;
    name: string;
    article: string;
    description: string;
    category_id: number;
    specifications: Record<string, string | string[]>;
    producer_country_id: string;
};

const ProductForm = ({opened, close, activeCategory, transformedCountries, availableSpecifications, editValues, setEditValues}) => {
    const methods = useForm<FormValues>({
        defaultValues: {
            id: 0,
            name: '',
            article: '',
            description: '',
            category_id: 0,
            specifications: {},
            producer_country_id: ''
        }
    })

    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    const specifications = useWatch({
        control: methods.control,
        name: 'specifications'
    });

    useEffect(() => {
        const updateProductName = () => {
            let productName = availableSpecifications
                .filter(spec => spec.use_product_name)
                .map(spec => {
                    const specValue = specifications[spec.id];
                    if (specValue) {
                        if (Array.isArray(specValue)) {
                            return spec.values.filter(value => specValue.includes(String(value.id))).map(value => value.value).join(' ');
                        } else {
                            return spec.values.find(value => value.id === Number(specValue))?.value || '';
                        }
                    }
                    return '';
                })
                .join(' ');
            methods.setValue('name', productName);
        };

        updateProductName();
    }, [specifications, availableSpecifications, methods]);

    useEffect(() => {
        if(opened === true && activeCategory && !editValues) {
            methods.setValue('category_id', activeCategory.id)
        }
    }, [opened, activeCategory, editValues]);

    const onSubmit = (data) => {
        const request = editValues ? updateProduct(data) : createProduct(data);

        request.unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
                closeForm()
            })
            .catch((error) => ErrorNotifications(error))
    }

    const closeForm = () => {
        methods.reset();
        setEditValues(undefined)
        close();
    }

    const handleSpecificationChange = (id, value) => {
        const currentSpecifications = methods.getValues("specifications");
        if (value === null || (Array.isArray(value) && value.length === 0)) {
            const { [id]: _, ...updatedSpecifications } = currentSpecifications;
            methods.setValue("specifications", updatedSpecifications);
        } else {
            methods.setValue(`specifications.${id}`, value);
        }
    };

    useEffect(() => {
        if(editValues) {
            methods.setValue('id', editValues.id)
            methods.setValue('name', editValues.name)
            methods.setValue('article', editValues.article)
            methods.setValue('description', editValues.description ?? '')
            methods.setValue('category_id', editValues.category_id)
            methods.setValue('producer_country_id', String(editValues.producer_country_id))
            methods.setValue('specifications', editValues.specifications)
        } else {
            methods.setValue('specifications', {});
        }
    }, [editValues]);

    return (
        <>
            <Drawer
                opened={opened}
                onClose={closeForm}
                title={editValues ? 'Обновить товар' : 'Добавить товар'}
                size="lg"
                position="right">
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Flex direction="column" className={classes.flexProductForm}>
                            <Box style={{flexGrow: 1}}>
                                <Controller
                                    control={methods.control}
                                    rules={{
                                        required: "Поле обязательно для заполнения. Для заполнения названия выбери характеристики, которые участвую в названии товара",
                                        minLength: {
                                            value: 3,
                                            message: "Минимальная длина поля - 3 символа",
                                        },
                                        maxLength: {
                                            value: 250,
                                            message: "Максимальная длина поля - 250 символов",
                                        },
                                    }}
                                    render={({ field , fieldState: {error}}) => (
                                        <TextInput
                                            label="Название товара"
                                            value={field.value}
                                            error={error?.message}
                                            disabled={true}
                                        />
                                    )}
                                    name="name"
                                />

                                <Controller
                                    control={methods.control}
                                    rules={{
                                        required: "Поле обязательно для заполнения.",
                                        minLength: {
                                            value: 3,
                                            message: "Минимальная длина поля - 3 символа",
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "Максимальная длина поля - 50 символов",
                                        },
                                    }}
                                    render={({ field, fieldState: {error} }) => (
                                        <TextInput
                                            label="Артикул"
                                            value={field.value}
                                            error={error?.message}
                                            onChange={(event) => {
                                                field.onChange(event.currentTarget.value);
                                            }}
                                        />
                                    )}
                                    name="article"
                                />

                                <Controller
                                    control={methods.control}
                                    rules={{
                                        maxLength: {
                                            value: 500,
                                            message: "Максимальная длина поля - 500 символов",
                                        },
                                    }}
                                    render={({ field, fieldState: {error} }) => (
                                        <Textarea
                                            label="Описание товара"
                                            value={field.value}
                                            error={error?.message}
                                            onChange={(event) => {
                                                field.onChange(event.currentTarget.value);
                                            }}
                                        />
                                    )}
                                    name="description"
                                />

                                <Controller
                                    control={methods.control}
                                    rules={{
                                        required: "Поле обязательно для заполнения.",
                                    }}
                                    name="producer_country_id"
                                    render={({ field: {value, onChange, onBlur}, fieldState: {error} }) => (
                                        <Select
                                            label="Страна производства"
                                            placeholder="Выберите значение"
                                            searchable
                                            nothingFoundMessage="Ничего не найдено..."
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={(value) => {
                                                onChange(value);
                                            }}
                                            data={transformedCountries}
                                            error={error?.message}
                                        />
                                    )}/>

                                {availableSpecifications?.map((item, index: number) => {
                                    return (
                                        <ProductSelectSpecification
                                            key={index}
                                            name={`specifications.${item.id}`}
                                            item={item}
                                            onChange={handleSpecificationChange}
                                        />
                                    )
                                })}
                            </Box>
                            <Button type="submit">{editValues ? 'Обновить' : 'Добавить'}</Button>
                        </Flex>
                    </form>
                </FormProvider>
            </Drawer>
        </>
    )
}

export default ProductForm;