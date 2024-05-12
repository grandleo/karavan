import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getCategoriesState} from "@/store/slices/categorySlice";
import {useGetCategorySpecificationsQuery} from "@/store/api/admin/categories.api";
import {useCreateProductMutation, useGetProductQuery, useUpdateProductMutation} from "@/store/api/admin/products.api";
import {Controller, useForm} from "react-hook-form";
import _ from "lodash";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {Button, Drawer, Select, Textarea, TextInput} from "@mantine/core";
import SelectSpecification from "@/components/ui/products/SelectSpecification";
import classes from "@/components/ui/products/productsList.module.css";
import {IconPlus} from "@tabler/icons-react";
import {getProductsState} from "@/store/slices/productSlice";
import {useActions} from "@/hooks/useActions";
import {useGetProducerCountriesQuery} from "@/store/api/admin/producerCountry.api";

interface Props {
    showButton?: boolean,
    opened: boolean,
    open: () => void,
    close: () => void
}

const ProductForm = ({showButton = false, opened = false, open, close} : Props) => {
    const [selectSpecifications, setSelectSpecifications] = useState<IValue[]>([]);
    const {selectedCategory} = useSelector(getCategoriesState);
    const {data: categorySpecifications} = useGetCategorySpecificationsQuery(selectedCategory);
    const {product_id} = useSelector(getProductsState)

    const {data: product, refetch} = useGetProductQuery(product_id, {
      skip: product_id === 0,
    });
    const {setProductId} = useActions();

    const {data: countries} = useGetProducerCountriesQuery('');
    const transformedCountries = countries?.map(country => {
        return {
            value: String(country.id),
            label: country.name
        };
    });

    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: 0,
            name: '',
            article: '',
            description: '',
            category_id: 0,
            specifications: [],
            producer_country_id: ''
        }
    });

    useEffect(() => {
        if (product_id !== 0) {
            refetch();
        }
    }, [product_id]);

    useEffect(() => {
        if(product) {
            setValue('id', product.id)
            setValue('name', product.name)
            setValue('article', product.article)
            setValue('description', product.description)
            setValue('specifications', product.specifications)
            setValue('producer_country_id', String(product.producer_country_id))
            setSelectSpecifications(product.specifications)
        }
    }, [product]);

    useEffect(() => {
        setValue('category_id', selectedCategory);

        const filteredSelectSpecifications = selectSpecifications?.filter(spec => {
            const correspondingCategorySpec = categorySpecifications?.find((catSpec: { id: boolean; }) => catSpec.id === spec.specification_id);
            return correspondingCategorySpec && correspondingCategorySpec.use_product_name === 1;
        });

        const mergedArray = _.map(filteredSelectSpecifications, (values) => {
            const values2 = _.find(categorySpecifications, {id: values.specification_id});

            if (values2) {
                return _.assign({}, values, { specification_order: values2.order_column });
            }

            return values;
        });

        const groupSorted = _(mergedArray).groupBy('specification_order')
            .mapValues(group => _.sortBy(group, ['order_column']))
            .value();

        const resultString = Object.values(groupSorted)
            .map(arr => arr.map(obj => obj.value).join(' '))
            .join(' ');

        setValue('name', resultString)
        setValue('specifications', selectSpecifications)

    }, [selectSpecifications, selectedCategory]);

    const onSubmit = async (data: any) => {
        const request = product ? updateProduct(data) : createProduct(data);

        try {
            const payload = await request.unwrap();
            close();
            reset();
            setSelectSpecifications([]);
            setProductId(0)
            SuccessNotifications(payload);
        } catch (error) {
            ErrorNotifications(error);
        }
    }

    return (
        <>
            {showButton && (
                <Button variant="filled" onClick={open}
                        disabled={selectedCategory === 0}
                        className={classes.addProductItemBtn}>
                    <IconPlus size={22}/>
                </Button>
            )}

            <Drawer
                title={product ? 'Редактирование товара' : 'Добавление товара'}
                position="right"
                opened={opened}
                onClose={() => {
                    close();
                    setProductId(0);
                    setSelectSpecifications([]);
                    reset();
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно для заполнения. Для заполнения названия выбери характеристики",
                            minLength: {
                                value: 3,
                                message: "Минимальная длина поля - 3 символа",
                            },
                            maxLength: {
                                value: 250,
                                message: "Максимальная длина поля - 250 символов",
                            },
                        }}
                        render={({ field }) => (
                            <TextInput
                                label="Название товара"
                                value={field.value}
                                error={errors?.name?.message}
                                disabled={true}
                            />
                        )}
                        name="name"
                    />

                    <Controller
                        control={control}
                        rules={{
                            required: "Поле обязательно для заполнения. Для заполнения названия выбери характеристики",
                            minLength: {
                                value: 3,
                                message: "Минимальная длина поля - 3 символа",
                            },
                            maxLength: {
                                value: 50,
                                message: "Максимальная длина поля - 50 символов",
                            },
                        }}
                        render={({ field }) => (
                            <TextInput
                                label="Артикул"
                                value={field.value}
                                required={true}
                                error={errors?.article?.message}
                                onChange={(event) => {
                                    field.onChange(event.currentTarget.value);
                                }}
                            />
                        )}
                        name="article"
                    />

                    <Controller
                        control={control}
                        rules={{
                            maxLength: {
                                value: 500,
                                message: "Максимальная длина поля - 500 символов",
                            },
                        }}
                        render={({ field }) => (
                            <Textarea
                                label="Описание товара"
                                value={field.value}
                                error={errors?.description?.message}
                                onChange={(event) => {
                                    field.onChange(event.currentTarget.value);
                                }}
                                mb={24}
                            />
                        )}
                        name="description"
                    />

                    <Controller
                        control={control}
                        name="producer_country_id"
                        render={({ field }) => (
                            <Select
                                label="Страна производства"
                                placeholder="Выберите значение"
                                searchable
                                required
                                value={field.value}
                                onChange={(event) => {
                                    setValue('producer_country_id', event)
                                }}
                                data={transformedCountries ?? []}
                                mb={24}
                            />
                        )}/>

                    {categorySpecifications?.map((specification: ISpecification, index: number) => {
                        return (
                            <SelectSpecification
                                key={index}
                                specification={specification}
                                selectSpecifications={selectSpecifications}
                                setSelectSpecifications={setSelectSpecifications}
                            />
                        )
                    })}

                    <Button type="submit">{product ? 'Обновить' : 'Добавить'}</Button>

                </form>
            </Drawer>
        </>
    )
}

interface ISpecification {
    id: number,
    name: string,
    required: boolean,
    use_product_name: boolean,
    active: boolean,
    type_choice: string,
    order_column: number,
    trading_feature: boolean,
    selected: boolean,
    values: IValue[]
}

interface IValue {
    id: number,
    specification_id: boolean,
    value: string,
    order_column: boolean,
}

export default ProductForm;