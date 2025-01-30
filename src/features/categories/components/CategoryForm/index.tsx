import React, { useEffect, useState } from "react";
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
    Image,
    Popover,
    Switch,
    ScrollArea,
    NumberInput,
    Select
} from "@mantine/core";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconUpload } from "@tabler/icons-react";
import { serialize } from "object-to-formdata";

import classes from "./CategoryForm.module.css";
import {
    useCreateCategoryMutation,
    useLazyFetchFormDataQuery,
    useUpdateCategoryMutation
} from "@/features/categories/api/categoriesApi";

import { SortableList } from "@/components/SortableList";
import CategorySpecification from "@/features/categories/components/CategoryForm/components/CategorySpecification/CategorySpecification";

interface CategoryFormProps {
    opened: boolean;
    close: () => void;
    categoryId?: string | null;
    parentId?: string | null;
}

const CategoryForm = ({ opened, close, categoryId, parentId }: CategoryFormProps) => {
    // 1. Загружаем данные через RTK Query (groups, specifications, category)
    const [triggerFetchFormData, { data, error, isLoading }] = useLazyFetchFormDataQuery();
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    // 2. Состояния для загрузки изображения (Dropzone)
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    // 3. Инициализируем react-hook-form
    const methods = useForm({
        defaultValues: {
            name: {
                ru: "",
                en: ""
            },
            app_title: {
                ru: "",
                en: ""
            },
            min_p2p_quantity: 0,
            max_p2p_percent: 0,
            required_period_validity: false,
            display_type_app: "list",
            // Массив всех спецификаций, каждая обязательно содержит group_id
            specifications: [] as any[],
            image: null
        }
    });
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { isSubmitting }
    } = methods;

    // 4. useFieldArray для работы с массивом "specifications"
    const { fields, append, remove } = useFieldArray({
        control,
        name: "specifications"
    });

    // 5. При открытии Drawer тянем данные
    useEffect(() => {
        if (opened) {
            if (categoryId) {
                triggerFetchFormData({ id: categoryId });
            } else {
                triggerFetchFormData({});
            }
        }
    }, [opened, categoryId, triggerFetchFormData]);

    // 6. Заполняем форму, когда данные получены
    useEffect(() => {
        if (data && data.category) {
            // Если редактируем существующую категорию
            setValue("name.ru", data.category.name.ru);
            setValue("name.en", data.category.name.en);
            setValue("app_title.ru", data.category.app_title.ru);
            setValue("app_title.en", data.category.app_title.en);
            setValue("min_p2p_quantity", data.category.min_p2p_quantity);
            setValue("max_p2p_percent", data.category.max_p2p_percent);
            setValue("required_period_validity", data.category.required_period_validity);
            setValue("display_type_app", data.category.display_type_app || "list");
            setImagePreview(data.category.image_url || "");

            // Заполняем "specifications" из бэка,
            // они тоже должны содержать group_id (если бэк так хранит)
            setValue("specifications", data.category.specifications || []);
        } else {
            // Если новая категория
            reset();
            setImagePreview("");
        }
    }, [data, setValue, reset]);

    // 7. Закрыть Drawer + сброс формы
    const handleClose = () => {
        reset({
            name: { ru: "", en: "" },
            app_title: { ru: "", en: "" },
            min_p2p_quantity: 0,
            max_p2p_percent: 0,
            required_period_validity: false,
            display_type_app: "list",
            specifications: []
        });
        setImagePreview("");
        close();
    };

    // 8. Dropzone: обработка выбранного файла
    const handleDrop = (files: File[]) => {
        const file = files[0];
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    // 9. Ищем глобальную группу (define = "global")
    const globalGroup = data?.groups?.find((g) => g.define === "global");
    const globalGroupId = globalGroup?.id;

    /**
     * --------------------------
     * ФУНКЦИЯ УДАЛЕНИЯ (общая)
     * --------------------------
     * Если удаляем в global => удаляем во ВСЕХ группах
     * Иначе только в текущей группе
     */
    const removeSpecification = (groupId: number, specId: number) => {
        const allSpecs = watch("specifications");

        if (groupId === globalGroupId) {
            // Удаляем все вхождения данного specId
            const indicesToRemove = allSpecs
                .map((item, idx) => [item, idx])
                .filter(([item]) => (item as any).specification_id === specId)
                .map(([_, idx]) => idx);

            indicesToRemove.sort((a, b) => b - a).forEach((i) => remove(i));
        } else {
            // Удаляем только одно вхождение в текущей группе
            const indexToRemove = allSpecs.findIndex(
                (item) => item.group_id === groupId && item.specification_id === specId
            );
            if (indexToRemove !== -1) {
                remove(indexToRemove);
            }
        }
    };

    /**
     * --------------------------
     * ФУНКЦИЯ ДОБАВЛЕНИЯ (общая)
     * --------------------------
     */
    const addSpecification = (groupId: number, spec: any) => {
        append({
            specification_id: spec.id,
            group_id: groupId,
            name: spec.name, // Можете передавать name.ru / name.en, как хотите
            is_filterable: false,
            is_trade_feature: false,
            is_required: false,
            is_title_part: false,
            is_multiple: false,
            is_displayed_in_product_card: false
        });
    };

    /**
     * --------------------------
     * КЛИК ПО Switch
     * --------------------------
     * Если есть в группе => убираем
     * Если нет => добавляем
     * Если убираем в global => везде
     */
    const handleToggleSpecification = (groupId: number, spec: any) => {
        const currentSpecs = watch("specifications");
        const exists = currentSpecs.find(
            (item) => item.specification_id === spec.id && item.group_id === groupId
        );

        if (exists) {
            removeSpecification(groupId, spec.id);
        } else {
            addSpecification(groupId, spec);
        }
    };

    /**
     * --------------------------
     * УДАЛЕНИЕ по кнопке в SortableList
     * --------------------------
     */
    const handleRemoveFromList = (groupId: number, specId: number) => {
        removeSpecification(groupId, specId);
    };

    /**
     * --------------------------
     * Изменение порядка (SortableList)
     * --------------------------
     * Получаем новые items для ТЕКУЩЕЙ группы
     * Надо объединить с остальными
     */
    const handleGroupItemsChange = (groupId: number, newGroupItems: any[]) => {
        const all = watch("specifications");
        // убираем характеристики этой группы
        const filtered = all.filter((item) => item.group_id !== groupId);
        // прибавляем новые (сортированные)
        const merged = [...filtered, ...newGroupItems];
        setValue("specifications", merged);
    };

    // 10. Сабмит формы
    const onSubmit = async (formData: any) => {
        console.log('FORM DATA:', formData);
        try {
            // Посмотрите в консоль, чтобы убедиться, что group_id есть у каждого элемента
            console.log("~ Final form data:", formData);

            // Преобразуем formData в FormData (multipart/form-data)
            const fd = serialize(formData, {
                booleansAsIntegers: true,
                indices: true
            });

            // Добавляем файл, если выбран
            if (selectedImage) {
                fd.append("image", selectedImage);
            }

            if (parentId) {
                fd.append("parent_id", parentId);
            }
            if (categoryId) {
                fd.append("id", categoryId);
            }

            // Отправляем на сервер
            if (categoryId) {
                await updateCategory(fd).unwrap();
            } else {
                await createCategory(fd).unwrap();
            }

            // Закрываем по успешному сабмиту
            close();
        } catch (error) {
            console.error("Ошибка при отправке формы:", error);
        }
    };

    return (
        <Drawer
            opened={opened}
            onClose={handleClose}
            padding={0}
            scrollAreaComponent={ScrollArea.Autosize}
            title={categoryId ? "Редактировать категорию" : "Добавить категорию"}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" style={{ minHeight: "calc(100vh - 60px)" }}>
                    <Tabs defaultValue="information" style={{ flexGrow: 1 }}>
                        <Tabs.List>
                            <Tabs.Tab value="information">Основная информация</Tabs.Tab>
                            <Tabs.Tab value="specs-by-groups">Характеристики по группам</Tabs.Tab>
                        </Tabs.List>

                        {/* ======================= Вкладка 1: Основная информация ======================= */}
                        <Tabs.Panel value="information">
                            <Box className={classes.sectionForm}>
                                <Controller
                                    name="name.ru"
                                    control={control}
                                    render={({ field }) => (
                                        <TextInput
                                            label="Название на русском"
                                            placeholder="Введите название (RU)"
                                            mb={8}
                                            {...field}
                                        />
                                    )}
                                />
                                <Controller
                                    name="name.en"
                                    control={control}
                                    render={({ field }) => (
                                        <TextInput
                                            label="Название на английском"
                                            placeholder="Введите название (EN)"
                                            {...field}
                                        />
                                    )}
                                />
                            </Box>

                            <Divider />

                            <Box className={classes.sectionForm}>
                                <Controller
                                    name="app_title.ru"
                                    control={control}
                                    render={({ field }) => (
                                        <TextInput
                                            label="Название блока (RU)"
                                            placeholder="В приложении (RU)"
                                            mb={8}
                                            {...field}
                                        />
                                    )}
                                />
                                <Controller
                                    name="app_title.en"
                                    control={control}
                                    render={({ field }) => (
                                        <TextInput
                                            label="Название блока (EN)"
                                            placeholder="В приложении (EN)"
                                            {...field}
                                        />
                                    )}
                                />
                            </Box>

                            <Divider />

                            <Box className={classes.sectionForm}>
                                <Text>Trade</Text>
                                <Controller
                                    name="min_p2p_quantity"
                                    control={control}
                                    render={({ field }) => (
                                        <NumberInput
                                            label="Мин. кол-во для торга"
                                            placeholder="Введите..."
                                            allowNegative={false}
                                            hideControls
                                            {...field}
                                        />
                                    )}
                                />
                                <Controller
                                    name="max_p2p_percent"
                                    control={control}
                                    render={({ field }) => (
                                        <NumberInput
                                            label="Макс. % скидки"
                                            placeholder="Введите..."
                                            allowNegative={false}
                                            allowDecimal={false}
                                            hideControls
                                            max={100}
                                            {...field}
                                        />
                                    )}
                                />
                            </Box>

                            <Divider />

                            <Box className={classes.sectionForm} style={{ flexGrow: 1 }}>
                                <Controller
                                    name="required_period_validity"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            label="Указывать срок годности обязательно"
                                        />
                                    )}
                                />

                                <Controller
                                    name="display_type_app"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            label="Отображение в приложении"
                                            placeholder="Выберите тип"
                                            data={[
                                                { value: "list", label: "Список" },
                                                { value: "tile", label: "Плитка" }
                                            ]}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </Box>

                            <Box className={classes.sectionForm}>
                                <Text>Изображение категории</Text>
                                <Dropzone onDrop={handleDrop} accept={[MIME_TYPES.svg]} maxFiles={1}>
                                    <Flex
                                        direction="column"
                                        align="center"
                                        justify="center"
                                        style={{ height: 100 }}
                                    >
                                        <IconUpload size={24} />
                                        <Text>Перетащите файл или кликните</Text>
                                    </Flex>
                                </Dropzone>
                                {imagePreview && (
                                    <Box mt={16}>
                                        <Text>Предпросмотр:</Text>
                                        <Image src={imagePreview} alt="Preview" radius="md" width={200} />
                                    </Box>
                                )}
                            </Box>
                        </Tabs.Panel>

                        {/* ======================= Вкладка 2: Характеристики по группам ======================= */}
                        <Tabs.Panel value="specs-by-groups" style={{ padding: 16 }}>
                            {data?.groups?.map((group) => {
                                // Для каждой группы - собственный блок
                                const groupFields = fields.filter((f) => f.group_id === group.id);

                                // Какие спецификации показываем в поповере?
                                let popoverSpecs = data?.specifications || [];
                                // Если группа не глобальная - показываем только те, что уже выбраны в global
                                if (group.define !== "global" && globalGroupId) {
                                    const chosenInGlobal = fields.filter(
                                        (f) => f.group_id === globalGroupId
                                    );
                                    const chosenIds = chosenInGlobal.map((f) => f.specification_id);
                                    popoverSpecs = popoverSpecs.filter((spec) =>
                                        chosenIds.includes(spec.id)
                                    );
                                }

                                return (
                                    <Box key={group.id} mb={24}>
                                        <Flex align="center" justify="space-between" mb={10}>
                                            <Text fw={700} fz="lg">
                                                {group.name}
                                            </Text>

                                            <Popover position="bottom" offset={0} shadow="md">
                                                <Popover.Target>
                                                    <Button variant="light">Выбрать</Button>
                                                </Popover.Target>
                                                <Popover.Dropdown>
                                                    <ScrollArea style={{ height: 250 }}>
                                                        {popoverSpecs.map((spec) => {
                                                            const isActive = groupFields.some(
                                                                (gf) => gf.specification_id === spec.id
                                                            );
                                                            return (
                                                                <Switch
                                                                    key={spec.id}
                                                                    label={spec.name?.ru || "Без названия"}
                                                                    checked={isActive}
                                                                    onChange={() => handleToggleSpecification(group.id, spec)}
                                                                />
                                                            );
                                                        })}
                                                    </ScrollArea>
                                                </Popover.Dropdown>
                                            </Popover>
                                        </Flex>

                                        {/* Список выбранных (SortableList) */}
                                        <ScrollArea style={{ maxHeight: 400 }}>
                                            <SortableList
                                                items={groupFields}
                                                onChange={(newItems) => handleGroupItemsChange(group.id, newItems)}
                                                renderItem={(field, index) => (
                                                    <CategorySpecification
                                                        key={field.id /* уникальный ключ из useFieldArray */}
                                                        field={field}
                                                        index={index}
                                                        control={control}
                                                        // При нажатии "Удалить"
                                                        remove={() => {
                                                            // Вызываем нашу функцию, которая учитывает global / неглобал
                                                            handleRemoveFromList(field.group_id, field.specification_id);
                                                        }}
                                                    />
                                                )}
                                            />
                                        </ScrollArea>
                                    </Box>
                                );
                            })}
                        </Tabs.Panel>
                    </Tabs>

                    <Divider />

                    {/* Кнопки "Отменить" и "Добавить/Обновить" */}
                    <Box className={classes.sectionForm}>
                        <Flex gap={16}>
                            <Button variant="outline" fullWidth onClick={handleClose}>
                                Отменить
                            </Button>
                            <Button type="submit" variant="filled" fullWidth loading={isSubmitting}>
                                {categoryId ? "Обновить" : "Добавить"}
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
            </form>
        </Drawer>
    );
};

export default CategoryForm;