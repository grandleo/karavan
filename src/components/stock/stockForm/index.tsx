import {Button, Drawer, NumberInput, Select} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {
    useAddProductToSupplierStockMutation,
    useGetCategoriesWithProductsQuery,
    useLazyGetCategoryProductsQuery,
    useLazyGetSubCategoriesWithProductsQuery
} from "@/store/api/supplier/stockSupplier.api";
import {useState} from "react";
import SelectProduct from "@/components/stock/stockForm/selectProduct";
import _ from "lodash";
import {Controller, FormProvider, useForm, useFormContext} from "react-hook-form";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import SelectSubCategory from "@/components/stock/stockForm/selectSubCategory";
import {useParams} from "next/navigation";
import {IconCalendar} from "@tabler/icons-react";
import {DatePickerInput} from "@mantine/dates";

const StockForm = () => {
    const {id} = useParams<{ id: string; }>();

    const defaultValues = {
        product_id: undefined,
        new_price: '',
        quantity: '',
        warehouse_id: id,
        period_validity: null
    }

    const [opened, {open, close}] = useDisclosure(false);
    const methods = useForm({defaultValues});

    const [mainCategory, setMainCategory] = useState<string | null>('');
    const [selectedCategories, setSelectedCategories] = useState<ISelectCategory[]>();

    const [subCategories, setSubCategories] = useState<ISelectCategory[]>([]);
    const [products, setProducts] = useState<ISelectProduct[]>([]);

    const [showRestForm, setShowRestForm] = useState(false);
    const [showPeriodValidity, setShowPeriodValidity] = useState(false);

    const {data: categories} = useGetCategoriesWithProductsQuery('', {
        skip: !opened
    });

    const [triggerCategories] = useLazyGetSubCategoriesWithProductsQuery();
    const [triggerProducts] = useLazyGetCategoryProductsQuery();
    const [addProductToSupplierStock] = useAddProductToSupplierStockMutation();

    const updateCategory = (index: number, id: string) => {
        setSelectedCategories((prev) => {
            const updatedCategories = {...prev, [index]: id};

            const filteredCategories = _.pickBy(updatedCategories, (_value, key) => parseInt(key) <= index);

            return filteredCategories;
        });

        const updatedSubCategories = _.slice(subCategories, 0, index);
        setSubCategories(updatedSubCategories);
    }

    const fetchProducts = async (id: string | null) => {
        await triggerProducts({category_id: id}).then(({data}) => {
            setProducts(data)
        })
    }

    const fetchSubCategories = async (id: string) => {
        await triggerCategories(id).then(({data}) => {
            setSubCategories(prevSubCategories => [...prevSubCategories, data]);
        })
    }

    const handleSelectCategory = async (id: string, index: number, optionSelectCategory: ISelectCategory) => {
        updateCategory(index, id)

        const {has_children, required_period_validity} = optionSelectCategory

        if (has_children) {
            await fetchSubCategories(id)
        } else {
            await fetchProducts(id)
            setShowPeriodValidity(required_period_validity)
            setShowRestForm(true)
        }
    }

    const onSubmit = async (data): Promise<void> => {
        addProductToSupplierStock(data).unwrap().then((payload) => {
            methods.reset()

            console.log('getValues', methods.getValues())

            SuccessNotifications(payload)
        }).catch((error) => ErrorNotifications(error));
    }

    return (
        <>
            <Button onClick={open}>Добавить товар</Button>

            <Drawer
                opened={opened}
                onClose={() => {
                    close()
                    methods.reset();
                    setSelectedCategories([])
                    setSubCategories([])
                    setProducts([])
                    setMainCategory('')
                    setShowPeriodValidity(false)
                    setShowRestForm(false)
                }}
                title="Добавить товар в сток"
                position="right"
            >
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <Select
                            checkIconPosition="right"
                            label="Категория"
                            placeholder="Выберите категорию"
                            allowDeselect={false}
                            searchable
                            nothingFoundMessage="Категории не найдено..."
                            data={categories ?? []}
                            value={mainCategory}
                            onChange={(id) => {
                                if (id) {
                                    const filteredCategory = _.find(categories, {'value': id});
                                    setMainCategory(id);
                                    handleSelectCategory(id, 0, filteredCategory);
                                }
                            }}
                        />

                        {subCategories.map((items, index) => {
                            return (
                                <SelectSubCategory
                                    key={index}
                                    index={index + 1}
                                    categories={items}
                                    handleSelectCategory={handleSelectCategory}
                                />
                            )
                        })}

                        {products.length > 0 && (
                            <SelectProduct products={products}/>
                        )}

                        {showRestForm && (
                            <>
                                {showPeriodValidity && (
                                    <PeriodValidity/>
                                )}
                                <QuantityInput/>
                                <PriceInput/>
                                <Button type="submit">Добавить товар</Button>
                            </>
                        )}
                    </form>
                </FormProvider>
            </Drawer>
        </>
    )
}

const PriceInput = () => {
    const {control, formState: {errors}} = useFormContext();

    return (
        <Controller
            name="new_price"
            control={control}
            rules={{
                required: "Цена товара обязательна",
            }}
            render={({field: {onChange, onBlur, value}}) => (
                <NumberInput
                    label="Цена товара"
                    placeholder="Укажите цену товара"
                    value={value}
                    onChange={(quantity) => {
                        onChange(quantity);
                    }}
                    rightSection="₽"
                    rightSectionPointerEvents="none"
                    min={0}
                    max={9999999}
                    thousandSeparator=" "
                    error={errors?.new_price?.message ? String(errors?.new_price?.message) : undefined}
                />
            )}
        />
    )
}

const QuantityInput = () => {
    const {control, formState: {errors}} = useFormContext();

    return (
        <Controller
            name="quantity"
            control={control}
            rules={{
                required: "Кол-во товара обязательно",
            }}
            render={({field: {onChange, value}}) => (
                <NumberInput
                    label="Кол-во товара"
                    placeholder="Укажите кол-во товара"
                    value={value}
                    onChange={(quantity) => {
                        onChange(quantity);
                    }}
                    rightSection="pc"
                    rightSectionPointerEvents="none"
                    min={0}
                    max={9999}
                    thousandSeparator=" "
                    error={errors?.quantity?.message ? String(errors?.quantity?.message) : undefined}
                />
            )}
        />
    )
}

const PeriodValidity = ( ) => {
    const {control, formState: {errors}} = useFormContext();
    let currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let day = currentDate.getDate();

    return (
        <Controller
            name="period_validity"
            control={control}
            rules={{
                required: "Срок годности обязателен",
            }}
            render={({field: {onChange, value}}) => (
                <DatePickerInput
                    label="Срок годности товара"
                    placeholder="Срок годности"
                    rightSection={<IconCalendar style={{ width: '60%', height: '60%' }} stroke={1} />}
                    rightSectionPointerEvents="none"
                    value={value}
                    onChange={(quantity) => {
                        onChange(quantity);
                    }}
                    minDate={new Date(year, month, day)}
                    valueFormat="DD.MM.YYYY"
                />
            )}
        />
    )
}

export default StockForm;