import {useDeleteUserMutation} from "@/store/api/admin/users.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {Menu, rem, Table, UnstyledButton} from "@mantine/core";
import {IconDotsVertical, IconTrash} from "@tabler/icons-react";

import classes from "../clients.module.css";
import _ from "lodash";
import {modals} from "@mantine/modals";

const ClientRow = ({user, open} : ClientRowTypes) => {
    const [deleteUser] = useDeleteUserMutation();

    const handleDeleteUser = () => {
        modals.openConfirmModal({
            title: 'Удалить пользователя ?',
            centered: true,
            labels: { confirm: 'Удалить', cancel: "Я передумал" },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteUser(user.id).unwrap()
                .then((payload) => SuccessNotifications(payload))
                .catch((error) => ErrorNotifications(error))
        });
    }

    const fullName = _.compact([user.surname, user.name, user.patronymic]).join(' ');

    return (
        <Table.Tr>
            <Table.Td className={classes.numberClient}>{user.id}</Table.Td>
            <Table.Td>{fullName}</Table.Td>
            <Table.Td>{user.company}</Table.Td>
            <Table.Td>{user.phone}</Table.Td>
            <Table.Td>{user.email}</Table.Td>
            <Table.Td ta="right">
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <UnstyledButton>
                            <IconDotsVertical/>
                        </UnstyledButton>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Divider />
                        <Menu.Item
                            color="red"
                            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                            onClick={handleDeleteUser}
                        >
                            Удалить
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Table.Td>
        </Table.Tr>
    )
}

export default ClientRow;