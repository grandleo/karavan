import React from "react";
import { Flex, Text, Menu, ActionIcon, Box, Checkbox } from "@mantine/core";
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";
import { Controller } from "react-hook-form";

import classes from "./CategorySpecification.module.css";
import { DragHandle } from "@/components/SortableList";

interface CategorySpecificationProps {
    field: any;              // Объект характеристики (из массива specifications)
    control: any;           // из useForm()
    remove: () => void;     // вызвать при удалении именно этой характеристики
    groupDefine?: string;   // "global" или другое
    absoluteIndex: number;  // глобальный индекс в массиве specifications
    onFilterableChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldItem: any,
        groupDefine?: string
    ) => void;
}

const CategorySpecification = ({
                                   field,
                                   control,
                                   remove,
                                   groupDefine,
                                   absoluteIndex,
                                   onFilterableChange,
                               }: CategorySpecificationProps) => {
    return (
        <Flex className={classes.specification}>
            {/* Иконка перетаскивания (DragHandle) */}
            <Box mr={5}>
                <DragHandle active={false} />
            </Box>

            <Text className={classes.specificationTitle}>{field.name?.ru || "Без названия"}</Text>

            <Menu shadow="md">
                <Menu.Target>
                    <ActionIcon variant="white" aria-label="Настройки" size={16}>
                        <IconDotsVertical size={16} />
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    {/* 1) Чекбокс "Выводить в фильтр" (есть во всех группах) */}
                    <Box px="sm" py="xs">
                        <Controller
                            name={`specifications.${absoluteIndex}.is_filterable`}
                            control={control}
                            render={({ field: rhfField }) => (
                                <Checkbox
                                    {...rhfField}
                                    checked={rhfField.value}
                                    label="Выводить в фильтр"
                                    onChange={(e) => {
                                        rhfField.onChange(e);
                                        onFilterableChange(e, field, groupDefine);
                                    }}
                                />
                            )}
                        />
                    </Box>

                    {/* 2) Остальные чекбоксы - только для GLOBAL */}
                    {groupDefine === "global" && (
                        <>
                            <Box px="sm" py="xs">
                                <Controller
                                    name={`specifications.${absoluteIndex}.is_trade_feature`}
                                    control={control}
                                    render={({ field: rhfField }) => (
                                        <Checkbox
                                            {...rhfField}
                                            checked={rhfField.value}
                                            label="Выводить в торговую особенность"
                                        />
                                    )}
                                />
                            </Box>

                            <Box px="sm" py="xs">
                                <Controller
                                    name={`specifications.${absoluteIndex}.is_required`}
                                    control={control}
                                    render={({ field: rhfField }) => (
                                        <Checkbox
                                            {...rhfField}
                                            checked={rhfField.value}
                                            label="Обязательное поле"
                                        />
                                    )}
                                />
                            </Box>

                            <Box px="sm" py="xs">
                                <Controller
                                    name={`specifications.${absoluteIndex}.is_title_part`}
                                    control={control}
                                    render={({ field: rhfField }) => (
                                        <Checkbox
                                            {...rhfField}
                                            checked={rhfField.value}
                                            label="Участвует в формировании названия"
                                        />
                                    )}
                                />
                            </Box>

                            <Box px="sm" py="xs">
                                <Controller
                                    name={`specifications.${absoluteIndex}.is_multiple`}
                                    control={control}
                                    render={({ field: rhfField }) => (
                                        <Checkbox
                                            {...rhfField}
                                            checked={rhfField.value}
                                            label="Множественный выбор"
                                        />
                                    )}
                                />
                            </Box>

                            <Box px="sm" py="xs">
                                <Controller
                                    name={`specifications.${absoluteIndex}.is_displayed_in_product_card`}
                                    control={control}
                                    render={({ field: rhfField }) => (
                                        <Checkbox
                                            {...rhfField}
                                            checked={rhfField.value}
                                            label="Выводить в карточку товара"
                                        />
                                    )}
                                />
                            </Box>
                        </>
                    )}
                </Menu.Dropdown>
            </Menu>

            {/* Кнопка удаления */}
            <ActionIcon
                variant="white"
                color="red"
                aria-label="Удалить"
                size={16}
                onClick={remove}
            >
                <IconTrash stroke={2} />
            </ActionIcon>
        </Flex>
    );
};

export default CategorySpecification;