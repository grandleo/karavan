import {useDisclosure} from "@mantine/hooks";
import classes from "@/components/ui/products/productsList.module.css";
import {IconPlus} from "@tabler/icons-react";
import {Button, Drawer, Textarea, TextInput} from "@mantine/core";
import {useSelector} from "react-redux";
import {getCategoriesState} from "@/store/slices/categorySlice";
import {Controller, useForm} from "react-hook-form";
import {useGetCategorySpecificationsQuery} from "@/store/api/admin/categories.api";
import SelectSpecification from "@/components/ui/products/SelectSpecification";
import {useEffect, useState} from "react";
import _ from "lodash";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useCreateProductMutation} from "@/store/api/admin/products.api";

const AddProduct = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [selectSpecifications, setSelectSpecifications] = useState<IValue[]>([]);
    const {selectedCategory} = useSelector(getCategoriesState);
    const {data: categorySpecifications} = useGetCategorySpecificationsQuery(selectedCategory);
    const [createProduct] = useCreateProductMutation();

    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            article: '',
            description: '',
            category_id: selectedCategory,
            specifications: []
        }
    });

    useEffect(() => {
        const filteredSelectSpecifications = selectSpecifications.filter(spec => {
            const correspondingCategorySpec = categorySpecifications.find((catSpec: { id: boolean; }) => catSpec.id === spec.specification_id);
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

    }, [selectSpecifications, selectedCategory]);

    const onSubmit = async (data: any) => {
        createProduct(data).unwrap()
            .then((payload) => {
                close();
                reset();
                setSelectSpecifications([]);
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error))
    }

    return (
        <>
            <Button variant="filled" onClick={open} disabled={selectedCategory === 0} className={classes.addProductItemBtn}>
                <IconPlus size={22}/>
            </Button>

            <Drawer opened={opened} position="right" onClose={close} title="Добавление товара">
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
                            />
                        )}
                        name="description"
                    />

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

                    <Button type="submit">Добавить</Button>

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

export default AddProduct;