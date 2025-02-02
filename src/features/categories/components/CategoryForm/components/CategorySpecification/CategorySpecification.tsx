import React from "react";
import { Flex, Text, Menu, ActionIcon, Box, Checkbox } from "@mantine/core";
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";
import { Controller } from "react-hook-form";

import classes from "./CategorySpecification.module.css";
import { DragHandle } from "@/components/SortableList";

interface CategorySpecificationProps {
    field: any;
    index: number;
    control: any;
    remove: (index: number) => void;
    groupDefine?: string;
    onFilterableChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        groupDefine?: string
    ) => void;
}

const CategorySpecification = ({
                                   field,
                                   index,
                                   control,
                                   remove,
                                   groupDefine,
                                   onFilterableChange,
                               }: CategorySpecificationProps) => {
    return (
        <Flex key={field.id} className={classes.specification}>
            <Box mr={5}>
                <DragHandle active={false} />
            </Box>

            <Text className={classes.specificationTitle}>{field.name.ru}</Text>

            <Menu shadow="md">
                <Menu.Target>
                    <ActionIcon variant="white" aria-label="Настройки" size={16}>
                        <IconDotsVertical size={16} />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    {/* =========================
              1) Этот чекбокс нужен во всех группах
             ========================= */}
                    <Box px="sm" py="xs">
                        <Controller
                            name={`specifications.${index}.is_filterable`}
                            control={control}
                            render={({ field: rhfField }) => (
                                <Checkbox
                                    {...rhfField}
                                    checked={rhfField.value}
                                    label="Выводить в фильтр"
                                    onChange={(e) => {
                                        // Сохраняем в React Hook Form
                                        rhfField.onChange(e);
                                        // Доп. логика для «один фильтруемый в группе»
                                        onFilterableChange(e, index, groupDefine);
                                    }}
                                />
                            )}
                        />
                    </Box>

                    {/* =========================
              2) Остальные чекбоксы - только для global
             ========================= */}
                    {groupDefine === "global" && (
                        <>
                            <Box px="sm" py="xs">
                                <Controller
                                    name={`specifications.${index}.is_trade_feature`}
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            label="Выводить в торговую особенность"
                                        />
                                    )}
                                />
                            </Box>

                            <Box px="sm" py="xs">
                                <Controller
                                    name={`specifications.${index}.is_required`}
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            label="Обязательное поле"
                                        />
                                    )}
                                />
                            </Box>

                            <Box px="sm" py="xs">
                                <Controller
                                    name={`specifications.${index}.is_title_part`}
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            label="Участвует в формировании названия"
                                        />
                                    )}
                                />
                            </Box>

                            <Box px="sm" py="xs">
                                <Controller
                                    name={`specifications.${index}.is_multiple`}
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            label="Множественный выбор"
                                        />
                                    )}
                                />
                            </Box>

                            <Box px="sm" py="xs">
                                <Controller
                                    name={`specifications.${index}.is_displayed_in_product_card`}
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            label="Выводить в карточку товара"
                                        />
                                    )}
                                />
                            </Box>
                        </>
                    )}
                </Menu.Dropdown>
            </Menu>

            <ActionIcon
                variant="white"
                color="red"
                aria-label="Удалить"
                size={16}
                onClick={() => remove(index)}
            >
                <IconTrash stroke={2} />
            </ActionIcon>
        </Flex>
    );
};

export default CategorySpecification;