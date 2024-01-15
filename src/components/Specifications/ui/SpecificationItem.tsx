import {useDeleteSpecificationMutation} from "@/store/api/admin/specifications.api";
import {ActionIcon, Box, Flex, Menu, rem, Text} from "@mantine/core";
import {IconDotsVertical, IconPencil, IconTrash} from "@tabler/icons-react";
import {modals} from "@mantine/modals";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {SpecificationItemProps} from "@/components/Specifications/types";
import classes from "../specifications.module.css";
import {TreeHandle} from "@/components/ui/sortableList/TreeItem";
const SpecificationItem = ({item, onOpen, setSpecification}: SpecificationItemProps) => {
    const [deleteSpecification] = useDeleteSpecificationMutation();

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: 'Удалить характеристику ?',
            centered: true,
            children: (
                <Text size="sm">
                    Вы собираетесь удалить характеристику которая может быть использована в категориях и товарах. Что может привести к непредвиденным ситуациям.
                </Text>
            ),
            labels: { confirm: 'Удалить', cancel: "Я передумал" },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteSpecification(item.id).unwrap()
                .then((payload) => SuccessNotifications(payload))
                .catch((error) => ErrorNotifications(error))
        });

    return (
        <>
            <Flex
                justify="flex-start"
                align="center"
                gap={8}
                className={classes.specificationItem}
            >
                <TreeHandle/>
                <Text className={classes.name}>{item.name}</Text>
                <Text className={classes.valuesCount}>В списке: {item.values_count}</Text>
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <ActionIcon variant="default" color="rgba(255, 255, 255, 1)" aria-label="Settings" className={classes.itemMenu}>
                            <IconDotsVertical/>
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                                   onClick={() => {
                                       setSpecification(item);
                                       onOpen();
                                   }}
                        >
                            Редактировать
                        </Menu.Item>
                        <Menu.Item
                            color="red"
                            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                            onClick={openDeleteModal}
                        >
                            Удалить
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Flex>

        </>
    )
}

export default SpecificationItem;