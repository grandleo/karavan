import {
    Box,
    Button,
    Checkbox,
    Divider,
    Drawer,
    Flex,
    Tabs,
    TextInput,
    Text,
    Image, Popover, Switch, ScrollArea, NumberInput, Select
} from "@mantine/core";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import classes from "./CategoryForm.module.css";
import {
    useCreateCategoryMutation,
    useLazyFetchFormDataQuery,
    useUpdateCategoryMutation
} from "@/features/categories/api/categoriesApi";
import {useEffect, useState} from "react";
import {SortableList} from "@/components/SortableList";
import CategorySpecification
    from "@/features/categories/components/CategoryForm/components/CategorySpecification/CategorySpecification";
import {Dropzone, MIME_TYPES} from "@mantine/dropzone";
import {IconUpload} from "@tabler/icons-react";
import { serialize } from 'object-to-formdata';

interface CategoryFormProps {
    opened: boolean;
    close: () => void;
    categoryId?: string | null;
    parentId?: string | null;
}

const CategoryForm = ({opened, close, categoryId, parentId}: CategoryFormProps) => {

    const [triggerFetchFormData, { data, error, isLoading }] = useLazyFetchFormDataQuery();
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [selectedImage, setSelectedImage] = useState<File | null>(null); // Храним файл изображения
    const [imagePreview, setImagePreview] = useState<string>(""); // Храним URL для превью изображения

    useEffect(() => {
        if (opened) {
            if (categoryId) {
                triggerFetchFormData({ id: categoryId })
            } else {
                triggerFetchFormData({})
            }
        }
    }, [opened, categoryId, triggerFetchFormData]);

    const methods = useForm({
        defaultValues: {
            name: {
                ru: '',
                en: '',
            },
            app_title: {
                ru: '',
                en: '',
            },
            min_p2p_quantity: 0,
            max_p2p_percent: 0,
            required_period_validity: false,
            specifications: [],
            display_type_app: 'list',
            image: null, // Поле для загрузки изображения
        }
    });

    const { control, handleSubmit, setValue, watch, reset} = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "specifications",
    });

    const handleToggleSpecification = (spec) => {
        const currentSpecifications = watch("specifications");
        const exists = currentSpecifications.find(item => item.specification_id === spec.id);

        if (exists) {
            // Удаляем характеристику
            const index = fields.findIndex(item => item.specification_id === spec.id);
            if (index !== -1) {
                remove(index);
            }
        } else {
            // Добавляем характеристику
            append({
                id: '', // Можно задать уникальный ID, если требуется
                specification_id: spec.id,
                name: spec.name,
                is_filterable: false,
                is_trade_feature: false,
                is_required: false,
                is_title_part: false,
                is_multiple: false,
                is_displayed_in_product_card: false,
            });
        }
    };

    const onSubmit = async (data: any) => {
        try {

            // Преобразуем данные формы в FormData
            const formData = serialize(data, {
                booleansAsIntegers: true, // Преобразуем булевы значения в 0 или 1
                indices: true,
            });

            // Добавляем изображение, если оно выбрано
            if (selectedImage) {
                formData.append("image", selectedImage);
            }

            if (parentId) {
                formData.append("parent_id", parentId);
            }

            formData.append("id", categoryId);

            // Отправляем данные через RTK Query
            if (categoryId) {
                // Обновление категории
                await updateCategory(formData).unwrap();
            } else {
                // Создание новой категории
                await createCategory(formData).unwrap();
            }

            // Закрываем форму после успешной отправки
            close();
        } catch (error) {
            console.error("Ошибка при отправке формы:", error);
        }
    };

    useEffect(() => {
        if (data && data.category) {
            // Заполняем поля формы данными категории
            setValue("name.ru", data.category.name.ru);
            setValue("name.en", data.category.name.en);
            setValue("app_title.ru", data.category.app_title.ru);
            setValue("app_title.en", data.category.app_title.en);
            setValue("min_p2p_quantity", data.category.min_p2p_quantity);
            setValue("max_p2p_percent", data.category.max_p2p_percent);
            setValue("required_period_validity", data.category.required_period_validity);
            setValue("specifications", data.category.specifications || []);
            setValue("display_type_app", data.category.display_type_app || 'list');
            setImagePreview(data.category.image_url || "");
        } else {
            // Если добавление новой категории, сбрасываем форму
            reset();
        }
    }, [data, setValue, reset]);

    const handleItemsChange = (newItems) => {
        setValue('specifications', newItems);
    };

    const handleDrop = (files: File[]) => {
        const file = files[0];
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file)); // Предпросмотр выбранного файла
    };

    const handleClose = () => {
        reset({
            name: {
                ru: '',
                en: '',
            },
            app_title: {
                ru: '',
                en: '',
            },
            min_p2p_quantity: 0,
            max_p2p_percent: 0,
            required_period_validity: false,
            specifications: []
        }); // Сбрасываем форму
        setImagePreview("");
        close();
    };

    return (
        <Drawer
            opened={opened}
            onClose={handleClose}
            padding={0}
            scrollAreaComponent={ScrollArea.Autosize}
            title={categoryId ? "Редактировать категорию" : "Добавить категорию"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" style={{minHeight: 'calc(100vh - 60px)'}}>
                    <Tabs defaultValue="information" style={{flexGrow: 1}}>
                        <Tabs.List>
                            <Tabs.Tab value="information">
                                Основная информация
                            </Tabs.Tab>
                            <Tabs.Tab value="specifications">
                                Выбор характеристик
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="information">
                            <Box className={classes.sectionForm}>
                                <Controller
                                    name="name.ru"
                                    control={methods.control}
                                    render={({field}) => (
                                        <TextInput
                                            label="Название категории на русском"
                                            placeholder="Название категории на русском"
                                            mb={8}
                                            {...field}
                                        />
                                    )}
                                />
                                <Controller
                                    name="name.en"
                                    control={methods.control}
                                    render={({field}) => (
                                        <TextInput
                                            label="Название категории на английском"
                                            placeholder="Название категории на английском"
                                            {...field}
                                        />
                                    )}
                                />
                            </Box>
                            <Divider/>
                            <Box className={classes.sectionForm}>
                                <Controller
                                    name="app_title.ru"
                                    control={methods.control}
                                    render={({field}) => (
                                        <TextInput
                                            label="Название блока в приложении на русском"
                                            placeholder="Название блока в приложении на русском"
                                            mb={8}
                                            {...field}
                                        />
                                    )}
                                />
                                <Controller
                                    name="app_title.en"
                                    control={methods.control}
                                    render={({field}) => (
                                        <TextInput
                                            label="Название блока в приложении на английском"
                                            placeholder="Название блока в приложении на английском"
                                            {...field}
                                        />
                                    )}
                                />
                            </Box>
                            <Divider/>
                            <Box className={classes.sectionForm}>
                                <Text>P2p</Text>
                                <Controller
                                    name="min_p2p_quantity"
                                    control={methods.control}
                                    render={({field}) => (
                                        <NumberInput
                                            label="Минимальное кол-во для торга"
                                            placeholder="Введите кол-во"
                                            allowNegative={false}
                                            allowDecimal={false}
                                            hideControls={true}
                                            {...field}
                                        />
                                    )}
                                />
                                <Controller
                                    name="max_p2p_percent"
                                    control={methods.control}
                                    render={({field}) => (
                                        <NumberInput
                                            label="Макс процент скидки на товар"
                                            placeholder="Введите процент"
                                            allowNegative={false}
                                            decimalScale={2}
                                            hideControls={true}
                                            max={100}
                                            {...field}
                                        />
                                    )}
                                />
                            </Box>
                            <Divider/>

                            <Box className={classes.sectionForm} style={{flexGrow: 1}}>
                                <Controller
                                    name="required_period_validity"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            label="Указывать срок годности товаров обязательно"
                                        />
                                    )}
                                />



                                <Controller
                                    name="display_type_app"
                                    control={methods.control}
                                    defaultValue="list"
                                    render={({ field }) => (
                                        <Select
                                            label="Отображение для приложения"
                                            placeholder="Выберите тип отображения"
                                            data={[
                                                { value: "list", label: "Список" },
                                                { value: "tile", label: "Плитка" },
                                            ]}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </Box>

                            {/* Dropzone для загрузки изображения */}
                            <Box className={classes.sectionForm}>
                                <Text>Изображение категории</Text>
                                <Dropzone
                                    onDrop={handleDrop}
                                    accept={[MIME_TYPES.svg]}
                                    maxFiles={1}
                                >
                                    <Flex direction="column" align="center" justify="center" style={{ height: 100 }}>
                                        <IconUpload size={24} />
                                        <Text>Перетащите изображение сюда или нажмите для выбора</Text>
                                    </Flex>
                                </Dropzone>
                                {imagePreview && (
                                    <Box mt={16}>
                                        <Text>Предпросмотр изображения:</Text>
                                        <Image src={imagePreview} alt="Предпросмотр" radius="md" width={200} />
                                    </Box>
                                )}
                            </Box>
                        </Tabs.Panel>

                        <Tabs.Panel value="specifications">
                            <Box className={classes.sectionForm}>
                                <Flex align="center justify-between">
                                    <Text className={classes.specificationGroupTitle} style={{flexGrow: 1}}>Основные
                                        характеристики</Text>
                                    <Popover position="bottom" offset={0} shadow="md">
                                        <Popover.Target>
                                            <Button variant="light">Выбрать</Button>
                                        </Popover.Target>
                                        <Popover.Dropdown>
                                            <ScrollArea h={250}>
                                            {data?.specifications.map((item) => {
                                                const isActive = fields.some(field => field.specification_id === item.id);
                                                return (
                                                    <Switch
                                                        key={item.id}
                                                        label={item.name.ru}
                                                        checked={isActive}
                                                        onChange={() => handleToggleSpecification(item)}
                                                    />
                                                )
                                            })}
                                            </ScrollArea>
                                        </Popover.Dropdown>
                                    </Popover>
                                </Flex>
                                <ScrollArea h={400}>
                                    <SortableList
                                        items={fields}
                                        onChange={handleItemsChange}
                                        renderItem={(field, index) => (
                                            <CategorySpecification
                                                field={field}
                                                index={index}
                                                control={control}
                                                remove={remove}
                                            />
                                        )}
                                    />
                                </ScrollArea>
                            </Box>

                        </Tabs.Panel>
                    </Tabs>
                    <Divider/>
                    <Box className={classes.sectionForm}>
                        <Flex gap={16}>
                            <Button variant="outline" fullWidth onClick={handleClose}>Отменить</Button>
                            <Button type="submit" variant="filled" fullWidth>{categoryId ? "Обновить" : "Добавить"}</Button>
                        </Flex>
                    </Box>
                </Flex>
            </form>
        </Drawer>
    )
}

export default CategoryForm;