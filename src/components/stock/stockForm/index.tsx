import {Box, Button, Chip, Drawer, Flex, Group, NumberInput, Select, Text} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {
    useAddProductToSupplierStockMutation,
    useGetCategoriesWithProductsQuery,
    useLazyGetCategoryProductsQuery,
    useLazyGetSubCategoriesWithProductsQuery
} from "@/store/api/supplier/stockSupplier.api";
import {useEffect, useState} from "react";
import SelectProduct from "@/components/stock/stockForm/selectProduct";
import _ from "lodash";
import {Controller, FormProvider, useForm, useFormContext} from "react-hook-form";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import SelectSubCategory from "@/components/stock/stockForm/selectSubCategory";
import {IconCalendar} from "@tabler/icons-react";
import {DatePickerInput} from "@mantine/dates";
import classes from "@/components/stock/styles.module.css";
import {useWarehouse} from "@/features/warehouses/providers/WarehouseProvider";
import {useTranslation} from "@/hooks/useTranslation";

const StockForm = () => {
    const { trans } = useTranslation();
    const { selectedWarehouse } = useWarehouse();

    const defaultValues = {
        product_id: null,
        price: '',
        quantity: '',
        warehouse_id: selectedWarehouse,
        period_validity: null
    }

    const [opened, {open, close}] = useDisclosure(false);
    const methods = useForm({defaultValues});

    useEffect(() => {
        // Обновляем значение warehouse_id при изменении selectedWarehouse
        methods.setValue('warehouse_id', selectedWarehouse);
    }, [selectedWarehouse, methods]);

    const [mainCategory, setMainCategory] = useState<string | null>('');
    const [selectedCategories, setSelectedCategories] = useState<ISelectCategory[]>();

    const [filters, setFilters] = useState([]);
    const [productFilters, setProductFilters] = useState([]);

    const [subCategories, setSubCategories] = useState<ISelectCategory[]>([]);
    const [products, setProducts] = useState<ISelectProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ISelectProduct[]>([]);

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
        await triggerProducts(id).then(({data}) => {
            setProducts(data.products);
            setFilters(data.filters);
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

        setProducts([]);
        setShowRestForm(false);
        methods.setValue('product_id', null)

        if (has_children) {
            await fetchSubCategories(id)
        } else {
            await fetchProducts(id)
            setShowPeriodValidity(required_period_validity)
        }
    }

    const handleSelectFilter = (filterId: string, selectedValues: string[]) => {
        setProductFilters((prevFilters) => ({
            ...prevFilters,
            [filterId]: selectedValues
        }));
    };

    useEffect(() => {
        const filterProducts = () => {
            // Пройдемся по productFilters и найдем пересечения с product.filter
            const filtered = products.filter(product => {
                return Object.values(productFilters).every(filterValues => {
                    // Игнорируем пустые массивы фильтров
                    if (filterValues.length === 0) {
                        return true;
                    }
                    // Проверяем, есть ли пересечения значений
                    return filterValues.some(filterValue => product.filter.includes(filterValue));
                });
            });

            setFilteredProducts(filtered);
        };

        filterProducts();
    }, [products, productFilters]);

    const onSubmit = async (data): Promise<void> => {
        const { product_id, price, quantity } = data;

        if (product_id === null || price === '' || quantity === '') {
            ErrorNotifications('Заполните все поля');
            return;
        }

        addProductToSupplierStock(data).unwrap().then((payload) => {
            methods.reset()
            setShowRestForm(false);
            methods.setValue('warehouse_id', selectedWarehouse);
            SuccessNotifications(payload)
        }).catch((error) => ErrorNotifications(error));
    }

    const resetFormState = () => {
        close();
        methods.reset();
        methods.setValue('warehouse_id', selectedWarehouse);
        setSelectedCategories([]);
        setSubCategories([]);
        setProducts([]);
        setMainCategory('');
        setShowPeriodValidity(false);
        setShowRestForm(false);
    };

    return (
        <>
            <Button onClick={open}>{trans('stock', 'supplier.buttons.add')}</Button>

            <Drawer.Root
                opened={opened}
                onClose={resetFormState}
                position="right"
            >
                <Drawer.Overlay/>
                <Drawer.Content>
                    <Drawer.Header>
                        <Drawer.Title>{trans('stock', 'supplier.form.title')}</Drawer.Title>
                        <Drawer.CloseButton className={classes.drawerCloseButton}/>
                    </Drawer.Header>
                    <Drawer.Body className={classes.drawerBody}>
                        <FormProvider {...methods}>
                            <form
                                onSubmit={methods.handleSubmit(onSubmit)}
                            >
                                <Flex direction="column" style={{height: 'calc(100vh - 65px)'}}>
                                    <Box style={{flex: 1}}>

                                        <Box className={`${classes.bodyBlock} ${classes.categoriesBlock}`}>
                                            <Select
                                                checkIconPosition="right"
                                                label={trans('stock', 'supplier.form.inputs.category')}
                                                placeholder={trans('stock', 'supplier.form.placeholders.category')}
                                                allowDeselect={false}
                                                searchable
                                                nothingFoundMessage={trans('stock', 'supplier.form.search.category')}
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
                                        </Box>

                                        {products.length > 0 && (
                                            <Box className={`${classes.bodyBlock}`}>

                                                {filters?.length > 0 && (
                                                    filters.map((item, index) => {
                                                        return <ProductFilter filter={item} handleSelectFilter={handleSelectFilter} key={index}/>
                                                        })
                                                )}

                                                <SelectProduct products={filteredProducts} setShowRestForm={setShowRestForm}/>
                                            </Box>
                                        )}
                                        {showRestForm && (
                                            <Box className={`${classes.bodyBlock}`}>
                                                <Flex gap={8}>
                                                    {showPeriodValidity && (
                                                        <Box style={{flex: 1}}>
                                                            <PeriodValidity/>
                                                        </Box>
                                                    )}
                                                    <Box style={{flex: 1}}>
                                                        <QuantityInput/>
                                                    </Box>
                                                    <Box style={{flex: 1}}>
                                                        <PriceInput/>
                                                    </Box>
                                                </Flex>
                                            </Box>
                                        )}
                                    </Box>
                                    <Box>
                                        <Flex gap={16} className={`${classes.bodyBlock}`}>
                                            <Button variant="outline" fullWidth
                                                    onClick={resetFormState}>{trans('buttons', 'cancel')}</Button>
                                            <Button type="submit" fullWidth>{trans('stock', 'supplier.buttons.add')}</Button>
                                        </Flex>
                                    </Box>
                                </Flex>
                            </form>
                        </FormProvider>
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root>
        </>
    )
}

const ProductFilter = ({filter, handleSelectFilter}) => {
    const {id: filterId, name, values} = filter;
    const [value, setValue] = useState([]);

    const handleChange = (newValues: string[]) => {
        setValue(newValues);
        handleSelectFilter(filterId, newValues); // Передаем id фильтра и выбранные значения
    };

    return (
        <>
            <Text>{name}:</Text>
            <Chip.Group multiple value={value} onChange={handleChange}>
                <Group align="center">
                    {values.map((item, index) => {
                        return (
                            <Chip
                                value={item.id}
                                color="rgba(67, 108, 251, 0.8)"
                                size="xs"
                                radius="xs"
                                key={index}>
                                {item.name}
                            </Chip>
                        )
                    })}
                </Group>
            </Chip.Group>
        </>
    )
}

const PriceInput = () => {
    const { trans } = useTranslation();
    const {control, formState: {errors}} = useFormContext();

    return (
        <Controller
            name="price"
            control={control}
            rules={{
                required: "Цена товара обязательна",
                max: {
                    value: 9999999,
                    message: "Цена товара не может превышать 9999999"
                }
            }}
            render={({field: {onChange, onBlur, value}}) => (
                <NumberInput
                    label={trans('stock', 'supplier.form.inputs.price')}
                    placeholder="0"
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
    const { trans } = useTranslation();
    const {control, formState: {errors}} = useFormContext();

    return (
        <Controller
            name="quantity"
            control={control}
            rules={{
                required: "Кол-во товара обязательно",
                max: {
                    value: 9999,
                    message: "Кол-во товара не может превышать 9999"
                }
            }}
            render={({field: {onChange, value}}) => (
                <NumberInput
                    label={trans('stock', 'supplier.form.inputs.quantity')}
                    placeholder="0"
                    value={value}
                    onChange={(quantity) => {
                        onChange(quantity);
                    }}
                    rightSection="PC"
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

const PeriodValidity = () => {
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
                    label="Годен до:"
                    placeholder="ММ.ГГГГ"
                    rightSection={<IconCalendar style={{width: '60%', height: '60%'}} stroke={1}/>}
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