import {ProductSpecificationProps} from "@/components/productSpecifications/types";
import {ActionIcon, Flex, Menu, rem, Text} from "@mantine/core";
import {TreeSortable} from "@/components/treeSortable";
import classes from "@/components/productSpecifications/productSpecifications.module.css";
import {IconDotsVertical, IconPencil, IconTrash} from "@tabler/icons-react";

const productSpecification = ({item, open, handleDeleteSpecification, setEditValues} : ProductSpecificationProps) => {
    const countValues = item.values?.length;

    return (
        <Flex
            justify="flex-start"
            align="center"
            gap={8}
            className={classes.productSpecification}
        >
            <TreeSortable.DragHandle active={true}/>
            <Text className={classes.name}>{item.name}</Text>
            <Text>В списке: {countValues}</Text>
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <ActionIcon variant="default" color="rgba(255, 255, 255, 1)" aria-label="Settings">
                        <IconDotsVertical/>
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item
                        leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                        onClick={() => {
                            setEditValues(item);
                            open();
                        }}
                    >
                        Редактировать
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                        color="red"
                        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                        onClick={() => handleDeleteSpecification(item.id)}
                    >
                        Удалить
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Flex>
    )
}

export default productSpecification;