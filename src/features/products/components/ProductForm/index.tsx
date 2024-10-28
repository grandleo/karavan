import {
    Box,
    Button,
    Divider,
    Drawer,
    Flex,
    Select,
    Tabs,
    TextInput,
} from "@mantine/core";
import {
    useCreateProductMutation,
    useLazyFetchProductFormDataQuery,
    useUpdateProductMutation
} from "@/features/products/api/productsApi";
import {useEffect, useState} from "react";
import {Controller, useForm, useWatch} from "react-hook-form";
import classes from "./ProductForm.module.css";
import {
    useLazyFetchCategoriesByIdQuery, useLazyFetchCategoryPathQuery,
    useLazyFetchCategorySpecificationsQuery
} from "@/features/categories/api/categoriesApi";
import CategorySpecifications
    from "@/features/products/components/ProductForm/components/CategorySpecifications/CategorySpecifications";

interface Category {
    id: number;
    name: string;
    hasChildren: boolean;
}

interface SpecificationValue {
    id: number;
    value: string;
    order_column: number;
}

interface Specification {
    id: number;
    name: string;
    is_title_part: number;
    selection_type: "single" | "multiple";
    is_required: number;
    order_column: number;
    values: SpecificationValue[];
}

interface ProductFormProps {
    opened: boolean;
    close: () => void;
    categoryId?: string | null;
    editingProductId?: string | null;
}

const ProductForm = ({opened, close, categoryId, editingProductId}: ProductFormProps) => {
    const [triggerFetchFormData, {isLoading: isLoadingFormData}] = useLazyFetchProductFormDataQuery();
    const [triggerFetchCategories] = useLazyFetchCategoriesByIdQuery();
    const [triggerFetchCategorySpecifications, {data: categorySpecifications = []}] = useLazyFetchCategorySpecificationsQuery();
    const [triggerCategoryPath, {data: categoryPath = []}] = useLazyFetchCategoryPathQuery();
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    const methods = useForm({
        defaultValues: {
            name: '',
            article: '',
            description: '',
            category_id: '',
            producer_country_id: '',
            specifications: {}
        }
    });

    const {control, handleSubmit, setValue, watch, reset} = methods;

    const [categoryLevels, setCategoryLevels] = useState<{ categories: Category[]; selectedCategory: Category | null }[]>([]);

    // Функция для загрузки категорий по ID
    const fetchCategories = async (category_id: number): Promise<Category[]> => {
        try {
            const result = await triggerFetchCategories({ category_id }).unwrap();
            return result;
        } catch (error) {
            console.error("Ошибка при загрузке категорий:", error);
            return [];
        }
    };


    useEffect(() => {
        if (opened) {
            if (editingProductId) {
                // Режим редактирования: загрузка данных товара
                triggerFetchFormData(editingProductId)
                    .unwrap()
                    .then(async (productData) => {

                        if (productData.category_id) {
                            // Запрос пути категории
                            const categoryPathData = await triggerCategoryPath(productData.category_id).unwrap();

                            // Проверяем структуру данных
                            if (Array.isArray(categoryPathData)) {
                                setCategoryLevels(categoryPathData);
                            } else {
                                console.error("Неправильная структура данных categoryPathData", categoryPathData);
                            }

                            // Запрос характеристик категории
                            await triggerFetchCategorySpecifications(productData.category_id).unwrap();
                        }

                        reset({
                            name: productData.name || "",
                            article: productData.article || "",
                            description: productData.description || "",
                            category_id: productData.category_id
                                ? productData.category_id.toString()
                                : "",
                            producer_country_id:
                                productData.producer_country_id || "",
                            specifications: productData.specifications || {}
                        });
                    })
                    .catch((err) => {
                        console.error("Ошибка при загрузке данных товара:", err);
                    });
            } else {
                // Режим добавления нового товара: загрузка корневых категорий
                fetchCategories(0)
                    .then((fetchedCategories) => {
                        setCategoryLevels([
                            { categories: fetchedCategories, selectedCategory: null }
                        ]);
                        setValue("category_id", ""); // Сброс category_id
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        } else {
            // Очистка состояния при закрытии модального окна
            setCategoryLevels([]);
            reset();
        }
    }, [
        opened,
        categoryId,
        editingProductId,
        triggerFetchFormData,
        triggerFetchCategories,
        triggerCategoryPath,
        triggerFetchCategorySpecifications,
        setValue,
        reset
    ]);

    const watchedSpecifications = useWatch({
        control,
        name: "specifications"
    });

    const onSubmit = async (formData) => {
        try {
            if (editingProductId) {
                // Режим редактирования
                await updateProduct({ id: editingProductId, ...formData }).unwrap();
            } else {
                // Режим добавления
                await createProduct(formData).unwrap();
            }
            // Закрыть форму после успешной отправки
            close();
        } catch (error) {
            console.error("Ошибка при отправке формы:", error);
            // Здесь можно добавить уведомление пользователю об ошибке
        }
    }

    // Функция для сброса характеристик при изменении категории
    const resetSpecifications = () => {
        setValue("specifications", {});
    };

    // Обработчик выбора категории на определенном уровне
    const handleCategorySelect = async (levelIndex: number, selectedValue: string | null) => {
        if (!selectedValue) return;

        const selectedCategory = categoryLevels[levelIndex].categories.find(cat => cat.id.toString() === selectedValue);
        if (!selectedCategory) return;

        // Создаем копию текущих уровней до выбранного
        const newLevels = categoryLevels.slice(0, levelIndex + 1);
        newLevels[levelIndex].selectedCategory = selectedCategory;

        // Устанавливаем обновленные уровни
        setCategoryLevels(newLevels);

        if (selectedCategory.hasChildren) {
            // Если есть подкатегории, загружаем их и добавляем новый уровень
            const subcategories = await fetchCategories(selectedCategory.id);
            if (subcategories.length > 0) {
                newLevels.push({ categories: subcategories, selectedCategory: null });
                setCategoryLevels(newLevels);
            }
            setValue("category_id", null);
        } else {
            // Если подкатегорий нет, устанавливаем category_id в форму и загружаем данные формы
            setValue("category_id", selectedCategory.id.toString());
            try {
                await triggerFetchCategorySpecifications(selectedCategory.id).unwrap();
            } catch (err) {
                console.error("Ошибка при загрузке данных формы:", err);
            }
        }

        // Сбрасываем характеристики при изменении категории
        resetSpecifications();
    };

    return (
        <Drawer
            opened={opened}
            onClose={close}
            title={editingProductId ? "Редактировать товар" : "Добавить товар"}
            padding={0}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" style={{minHeight: 'calc(100vh - 60px)'}}>
                    <Tabs defaultValue="information" style={{flexGrow: 1}}>
                        <Tabs.List>
                            <Tabs.Tab value="information">
                                Основная информация
                            </Tabs.Tab>
                            <Tabs.Tab value="specifications">
                                Характеристики
                            </Tabs.Tab>
                        </Tabs.List>
                        <Divider/>
                        <Tabs.Panel value="information">
                            <Box className={classes.sectionForm}>
                                {categoryLevels.map((level, index) => (
                                    <Select
                                        key={index}
                                        label={index === 0 ? "Выберите категорию" : "Выберите подкатегорию"}
                                        placeholder={index === 0 ? "Категория" : "Подкатегория"}
                                        data={level.categories.map(cat => ({ value: cat.id.toString(), label: cat.name }))}
                                        value={level.selectedCategory ? level.selectedCategory.id.toString() : null}
                                        onChange={(value) => handleCategorySelect(index, value)}
                                        searchable
                                        clearable={false}
                                        required={index === 0}
                                        mb="md"
                                    />
                                ))}
                            </Box>

                            <Box className={classes.sectionForm}>
                                <Controller
                                    name="article"
                                    control={control}
                                    render={({field}) => (
                                        <TextInput
                                            {...field}
                                            placeholder="Артикул"
                                        />
                                    )}
                                />
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({field}) => (
                                        <TextInput
                                            {...field}
                                            placeholder="Описание товара"
                                        />
                                    )}
                                />
                            </Box>
                        </Tabs.Panel>

                        <Tabs.Panel value="specifications">
                            <Box className={classes.sectionForm}>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({field}) => (
                                        <TextInput
                                            {...field}
                                            placeholder="Название товара"
                                            disabled
                                        />
                                    )}
                                />
                            </Box>
                            <Box className={classes.sectionForm}>
                                <CategorySpecifications
                                    categorySpecifications={categorySpecifications}
                                    control={control}
                                    setValue={setValue}
                                    watchedSpecifications={watchedSpecifications}
                                />
                            </Box>
                        </Tabs.Panel>
                    </Tabs>
                    <Divider/>
                    <Box className={classes.sectionForm}>
                        <Flex gap={16}>
                            <Button variant="outline" fullWidth>Отменить</Button>
                            <Button type="submit" variant="filled"
                                    fullWidth>
                                {editingProductId ? "Сохранить" : "Добавить"}
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
            </form>
        </Drawer>
    )
}

export default ProductForm;