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
    Menu, ActionIcon, Popover, Switch, ScrollArea
} from "@mantine/core";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import classes from "./CategoryForm.module.css";
import {IconDotsVertical, IconTrash} from "@tabler/icons-react";
import {
    useCreateCategoryMutation,
    useLazyFetchFormDataQuery,
    useUpdateCategoryMutation
} from "@/features/categories/api/categoriesApi";
import {useEffect, useState} from "react";
import {SortableList} from "@/components/SortableList";
import CategorySpecification
    from "@/features/categories/components/CategoryForm/components/CategorySpecification/CategorySpecification";
import {IValueTypes} from "@/components/productSpecifications/types";

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
            required_period_validity: false,
            specifications: []
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

    const onSubmit = async (formData) => {
        try {
            if (categoryId) {
                // Обновление категории
                await updateCategory({ id: categoryId, ...formData }).unwrap();
            } else {
                // Создание новой категории
                await createCategory({...formData, parent_id: parentId}).unwrap();
            }
            close();
        } catch (err) {
            console.error("Ошибка при сохранении категории:", err);
            // Здесь можно добавить отображение ошибки пользователю
        }
    };

    useEffect(() => {
        if (data && data.category) {
            console.log(data.category)
            // Заполняем поля формы данными категории
            setValue("name.ru", data.category.name.ru);
            setValue("name.en", data.category.name.en);
            setValue("app_title.ru", data.category.app_title.ru);
            setValue("app_title.en", data.category.app_title.en);
            setValue("required_period_validity", data.category.required_period_validity);
            setValue("specifications", data.category.specifications || []);
        } else {
            // Если добавление новой категории, сбрасываем форму
            reset();
        }
    }, [data, setValue, reset]);

    const handleItemsChange = (newItems) => {
        setValue('specifications', newItems);
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
            required_period_validity: false,
            specifications: []
        }); // Сбрасываем форму
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
                                            {data?.specifications.map((item) => {
                                                const isActive = fields.some(field => field.specification_id === item.id);
                                                return (
                                                    <Switch
                                                        key={item.id}
                                                        label={item.name}
                                                        checked={isActive}
                                                        onChange={() => handleToggleSpecification(item)}
                                                    />
                                                )
                                            })}
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
                                <Flex direction="column" gap={8}>
                                    {/*{fields.map((field, index) => (*/}
                                    {/*    <Flex key={field.id} className={classes.specification}>*/}
                                    {/*        <Text className={classes.specificationTitle}>{field.name}</Text>*/}
                                    {/*        <Menu shadow="md">*/}
                                    {/*            <Menu.Target>*/}
                                    {/*                <ActionIcon variant="white" aria-label="Настройки" size={16}>*/}
                                    {/*                    <IconDotsVertical size={16}/>*/}
                                    {/*                </ActionIcon>*/}
                                    {/*            </Menu.Target>*/}
                                    {/*            <Menu.Dropdown>*/}
                                    {/*                /!* Используем контейнерные элементы вместо Menu.Item *!/*/}
                                    {/*                <Box px="sm" py="xs">*/}
                                    {/*                    <Controller*/}
                                    {/*                        name={`specifications.${index}.is_filterable`}*/}
                                    {/*                        control={control}*/}
                                    {/*                        render={({ field }) => (*/}
                                    {/*                            <Checkbox {...field} checked={field.value} label="Выводить в фильтр" />*/}
                                    {/*                        )}*/}
                                    {/*                    />*/}
                                    {/*                </Box>*/}
                                    {/*                <Box px="sm" py="xs">*/}
                                    {/*                    <Controller*/}
                                    {/*                        name={`specifications.${index}.is_trade_feature`}*/}
                                    {/*                        control={control}*/}
                                    {/*                        render={({ field }) => (*/}
                                    {/*                            <Checkbox {...field} checked={field.value} label="Выводить в торговую особенность" />*/}
                                    {/*                        )}*/}
                                    {/*                    />*/}
                                    {/*                </Box>*/}
                                    {/*                <Box px="sm" py="xs">*/}
                                    {/*                    <Controller*/}
                                    {/*                        name={`specifications.${index}.is_required`}*/}
                                    {/*                        control={control}*/}
                                    {/*                        render={({ field }) => (*/}
                                    {/*                            <Checkbox {...field} checked={field.value} label="Обязательное поле" />*/}
                                    {/*                        )}*/}
                                    {/*                    />*/}
                                    {/*                </Box>*/}
                                    {/*                <Box px="sm" py="xs">*/}
                                    {/*                    <Controller*/}
                                    {/*                        name={`specifications.${index}.is_title_part`}*/}
                                    {/*                        control={control}*/}
                                    {/*                        render={({ field }) => (*/}
                                    {/*                            <Checkbox {...field} checked={field.value} label="Участвует в формировании названия" />*/}
                                    {/*                        )}*/}
                                    {/*                    />*/}
                                    {/*                </Box>*/}
                                    {/*                <Box px="sm" py="xs">*/}
                                    {/*                    <Controller*/}
                                    {/*                        name={`specifications.${index}.is_multiple`}*/}
                                    {/*                        control={control}*/}
                                    {/*                        render={({ field }) => (*/}
                                    {/*                            <Checkbox {...field} checked={field.value} label="Множественный выбор" />*/}
                                    {/*                        )}*/}
                                    {/*                    />*/}
                                    {/*                </Box>*/}
                                    {/*                <Box px="sm" py="xs">*/}
                                    {/*                    <Controller*/}
                                    {/*                        name={`specifications.${index}.is_displayed_in_product_card`}*/}
                                    {/*                        control={control}*/}
                                    {/*                        render={({ field }) => (*/}
                                    {/*                            <Checkbox {...field} checked={field.value} label="Выводить в карточку товара" />*/}
                                    {/*                        )}*/}
                                    {/*                    />*/}
                                    {/*                </Box>*/}
                                    {/*            </Menu.Dropdown>*/}
                                    {/*        </Menu>*/}
                                    {/*        <ActionIcon*/}
                                    {/*            variant="white"*/}
                                    {/*            color="red"*/}
                                    {/*            aria-label="Удалить"*/}
                                    {/*            size={16}*/}
                                    {/*            onClick={() => remove(index)}*/}
                                    {/*        >*/}
                                    {/*            <IconTrash stroke={2} />*/}
                                    {/*        </ActionIcon>*/}
                                    {/*    </Flex>*/}
                                    {/*))}*/}
                                </Flex>
                            </Box>

                        </Tabs.Panel>
                    </Tabs>
                    <Divider/>
                    <Box className={classes.sectionForm}>
                        <Flex gap={16}>
                            <Button variant="outline" fullWidth>Отменить</Button>
                            <Button type="submit" variant="filled" fullWidth>{categoryId ? "Обновить" : "Добавить"}</Button>
                        </Flex>
                    </Box>
                </Flex>
            </form>
        </Drawer>
    )
}

export default CategoryForm;