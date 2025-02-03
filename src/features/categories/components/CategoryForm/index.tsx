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
    Select,
} from "@mantine/core";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconUpload } from "@tabler/icons-react";
import { serialize } from "object-to-formdata";

import classes from "./CategoryForm.module.css";
import {
    useCreateCategoryMutation,
    useLazyFetchFormDataQuery,
    useUpdateCategoryMutation,
} from "@/features/categories/api/categoriesApi";

import { SortableList } from "@/components/SortableList";
import CategorySpecification
    from "@/features/categories/components/CategoryForm/components/CategorySpecification/CategorySpecification";

interface CategoryFormProps {
    opened: boolean;
    close: () => void;
    categoryId?: string | null;
    parentId?: string | null;
}

const CategoryForm = ({ opened, close, categoryId, parentId }: CategoryFormProps) => {
    // 1. Загружаем данные через RTK Query
    const [triggerFetchFormData, { data }] = useLazyFetchFormDataQuery();
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
                en: "",
            },
            app_title: {
                ru: "",
                en: "",
            },
            min_p2p_quantity: 0,
            max_p2p_percent: 0,
            required_period_validity: false,
            display_type_app: "list",
            // Массив спецификаций
            specifications: [] as any[],
            image: null,
        },
    });
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { isSubmitting },
    } = methods;

    // Подключаем useFieldArray на "specifications"
    const { fields, append, remove } = useFieldArray({
        control,
        name: "specifications",
    });

    // 4. При открытии Drawer тянем данные
    useEffect(() => {
        if (opened) {
            if (categoryId) {
                triggerFetchFormData({ id: categoryId });
            } else {
                triggerFetchFormData({});
            }
        }
    }, [opened, categoryId, triggerFetchFormData]);

    // 5. Заполняем форму, когда данные получены
    useEffect(() => {
        if (data && data.category) {
            // Редактируем существующую категорию
            setValue("name.ru", data.category.name.ru);
            setValue("name.en", data.category.name.en);
            setValue("app_title.ru", data.category.app_title.ru);
            setValue("app_title.en", data.category.app_title.en);
            setValue("min_p2p_quantity", data.category.min_p2p_quantity);
            setValue("max_p2p_percent", data.category.max_p2p_percent);
            setValue("required_period_validity", data.category.required_period_validity);
            setValue("display_type_app", data.category.display_type_app || "list");
            setImagePreview(data.category.image_url || "");

            // Характеристики
            setValue("specifications", data.category.specifications || []);
        } else {
            // Новая категория
            reset();
            setImagePreview("");
        }
    }, [data, setValue, reset]);

    // 6. Закрыть Drawer + сброс формы
    const handleClose = () => {
        reset({
            name: { ru: "", en: "" },
            app_title: { ru: "", en: "" },
            min_p2p_quantity: 0,
            max_p2p_percent: 0,
            required_period_validity: false,
            display_type_app: "list",
            specifications: [],
        });
        setImagePreview("");
        setSelectedImage(null);
        close();
    };

    // 7. Dropzone: обработка выбранного файла
    const handleDrop = (files: File[]) => {
        const file = files[0];
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    // Для удобства
    const globalGroup = data?.groups?.find((g) => g.define === "global");
    const globalGroupId = globalGroup?.id;

    /**
     * -------------------------------------------------------------------
     * Функция УДАЛЕНИЯ характеристики (по group_id и specification_id)
     * -------------------------------------------------------------------
     */
    const removeSpecification = (groupId: number, specId: number) => {
        const allSpecs = watch("specifications");

        if (groupId === globalGroupId) {
            // Удаляем все вхождения этого specification_id
            const indicesToRemove = allSpecs
                .map((item, idx) => [item, idx])
                .filter(([item]) => (item as any).specification_id === specId)
                .map(([_, idx]) => idx);

            // Удаляем с конца, чтобы индексы не сдвигались
            indicesToRemove.sort((a, b) => b - a).forEach((i) => remove(i));
        } else {
            // Удаляем только из конкретной группы
            const indexToRemove = allSpecs.findIndex(
                (item) => item.group_id === groupId && item.specification_id === specId
            );
            if (indexToRemove !== -1) {
                remove(indexToRemove);
            }
        }
    };

    /**
     * -------------------------------------------------------------------
     * Функция ДОБАВЛЕНИЯ новой характеристики
     * -------------------------------------------------------------------
     */
    const addSpecification = (groupId: number, spec: any) => {
        append({
            specification_id: spec.id,
            group_id: groupId,
            name: spec.name,
            is_filterable: false,
            is_trade_feature: false,
            is_required: false,
            is_title_part: false,
            is_multiple: false,
            is_displayed_in_product_card: false,
        });
    };

    /**
     * -------------------------------------------------------------------
     * Выбор (включение/отключение) характеристики в группе
     * -------------------------------------------------------------------
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
     * -------------------------------------------------------------------
     * Сортировка внутри группы (SortableList)
     * -------------------------------------------------------------------
     */
    const handleGroupItemsChange = (groupId: number, newGroupItems: any[]) => {
        const all = watch("specifications");

        // Убираем все спецификации этой группы
        const filtered = all.filter((item) => item.group_id !== groupId);

        // Прибавляем новые (сортированные)
        const merged = [...filtered, ...newGroupItems];
        setValue("specifications", merged);
    };

    /**
     * -------------------------------------------------------------------
     * Логика "is_filterable" - можно только один фильтруемый в группе
     * -------------------------------------------------------------------
     * Если это не global и пользователь включил флажок -> сбрасываем
     * у остальных в той же группе
     */
    const handleFilterableChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldItem: any, // сам объект specification
        groupDefine?: string
    ) => {
        // Если снимаем галочку или это "global", ничего не делаем
        if (!e.target.checked || groupDefine === "global") return;

        const currentSpecs = watch("specifications");
        const updated = currentSpecs.map((spec) => {
            // Если это та же группа, но другая спецификация
            if (
                spec.group_id === fieldItem.group_id &&
                spec.specification_id !== fieldItem.specification_id
            ) {
                return { ...spec, is_filterable: false };
            }
            return spec;
        });

        setValue("specifications", updated);
    };

    // 8. Сабмит формы (создание/обновление)
    const onSubmit = async (formData: any) => {
        try {
            const fd = serialize(formData, {
                booleansAsIntegers: true,
                indices: true,
            });
            if (selectedImage) {
                fd.append("image", selectedImage);
            }
            if (parentId) {
                fd.append("parent_id", parentId);
            }
            if (categoryId) {
                fd.append("id", categoryId);
            }

            if (categoryId) {
                await updateCategory(fd).unwrap();
            } else {
                await createCategory(fd).unwrap();
            }

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
                                                { value: "tile", label: "Плитка" },
                                            ]}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </Box>

                            <Box className={classes.sectionForm}>
                                <Text>Изображение категории</Text>
                                <Dropzone
                                    onDrop={handleDrop}
                                    accept={[MIME_TYPES.svg]}
                                    maxFiles={1}
                                >
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
                                        <Image
                                            src={imagePreview}
                                            alt="Preview"
                                            radius="md"
                                            width={200}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Tabs.Panel>

                        {/* ======================= Вкладка 2: Характеристики по группам ======================= */}
                        <Tabs.Panel value="specs-by-groups" style={{ padding: 16 }}>
                            {data?.groups?.map((group) => {
                                // Отбираем характеристики, принадлежащие этой группе
                                const groupFields = fields.filter((f) => f.group_id === group.id);

                                // Какие спецификации показывать в поповере?
                                let popoverSpecs = data?.specifications || [];
                                if (group.define !== "global" && globalGroupId) {
                                    // Если группа не глобальная, показываем только те, что выбраны в global
                                    const chosenInGlobal = fields.filter((f) => f.group_id === globalGroupId);
                                    const chosenIds = chosenInGlobal.map((f) => f.specification_id);
                                    popoverSpecs = popoverSpecs.filter((spec) => chosenIds.includes(spec.id));
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

                                        {/* Список выбранных с SortableList */}
                                        <ScrollArea style={{ maxHeight: 400 }}>
                                            <SortableList
                                                items={groupFields}
                                                onChange={(newItems) => handleGroupItemsChange(group.id, newItems)}
                                                renderItem={(field, groupIndex) => {
                                                    // Ищем глобальный индекс в общем массиве specifications
                                                    const allSpecs = watch("specifications");
                                                    const absoluteIndex = allSpecs.findIndex(
                                                        (item) =>
                                                            item.group_id === field.group_id &&
                                                            item.specification_id === field.specification_id
                                                    );

                                                    return (
                                                        <CategorySpecification
                                                            key={field.id}
                                                            field={field}
                                                            control={control}
                                                            groupDefine={group.define}
                                                            // Передаём глобальный индекс, чтобы правильно связаться с RHF
                                                            absoluteIndex={absoluteIndex}
                                                            remove={() =>
                                                                removeSpecification(field.group_id, field.specification_id)
                                                            }
                                                            onFilterableChange={handleFilterableChange}
                                                        />
                                                    );
                                                }}
                                            />
                                        </ScrollArea>
                                    </Box>
                                );
                            })}
                        </Tabs.Panel>
                    </Tabs>

                    <Divider />

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