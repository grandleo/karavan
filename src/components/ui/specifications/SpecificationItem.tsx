import {ActionIcon, Box, Menu, rem, Text} from "@mantine/core";
import {IconDotsVertical, IconPencil, IconTrash} from "@tabler/icons-react";
import {DragHandle} from "@/components/ui/sortableList/SortableItem";
import {useDeleteSpecificationMutation} from "@/store/api/admin/specifications.api";
import {modals} from "@mantine/modals";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import classes from "./specifications.module.css";
import {Dispatch, SetStateAction} from "react";

interface ISpecification {
    id: number,
    name: string,
    required: number,
    use_product_name: number,
    active: number,
    order_column: number,
    values_count: number,
}

interface Props {
    item: ISpecification;
    onOpen: () => void,
    setSpecification: Dispatch<SetStateAction<ISpecification>>;
}

const SpecificationItem = ({item, onOpen, setSpecification}: Props) => {
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
            <DragHandle/>
            <Box className={classes.itemName}><Text>{item.name}</Text></Box>
            <Box><Text>В списке: {item.values_count}</Text></Box>
            <Box>
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
            </Box>

        </>
    )
}

export default SpecificationItem;