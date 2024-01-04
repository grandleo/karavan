import {modals} from "@mantine/modals";
import {ActionIcon, Text} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";
import {useDeleteProductOrderMutation} from "@/store/api/order.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";

interface Props {
    id: number,
}

const DeleteProduct = ({id}: Props) => {

    const [deleteProduct] = useDeleteProductOrderMutation();

    const deleteModal = () => modals.openConfirmModal({
        title: 'Удалить товар ?',
        children: (
            <Text size="sm">
                Вы хотите удалить товар из заказа ? Вернуть товар в заказ у вас не получится, помните об этом при удалении.
            </Text>
        ),
        confirmProps: { color: 'red' },
        labels: { confirm: 'Удалить', cancel: 'Передумал' },
        onConfirm: () => deleteProduct(id).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error)),
    });

    return (
        <ActionIcon variant="subtle" aria-label="Удалить" color="black" onClick={deleteModal}>
            <IconTrash/>
        </ActionIcon>
    )
}

export default DeleteProduct;