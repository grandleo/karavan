import NextImage from 'next/image';
import {ActionIcon, Box, Flex, Image, Menu, rem, Text} from "@mantine/core";
import classes from "../producer-countries.module.css";
import {useDeleteProducerCountryMutation} from "@/store/api/admin/producerCountry.api";
import {modals} from "@mantine/modals";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {IconDotsVertical, IconPencil, IconTrash} from "@tabler/icons-react";
import {TreeSortable} from "@/components/treeSortable";
import {IProducerCountryTypes} from "@/components/producerCountries/types";

const ProducerCountry = ({country, open, setEditValues} : IProducerCountryTypes) => {
    const [deleteProducerCountry] = useDeleteProducerCountryMutation();

    const confirmDeleteModal = () => {
        modals.openConfirmModal({
            title: 'Удалить страну производства ?',
            centered: true,
            children: (
                <Text size="sm">
                    Вы собираетесь удалить страну производства которая может быть использована в товарах. Что может привести к непредвиденным ситуациям.
                </Text>
            ),
            labels: { confirm: 'Удалить', cancel: "Я передумал" },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteProducerCountry(country.id).unwrap()
                .then((payload) => SuccessNotifications(payload))
                .catch((error) => ErrorNotifications(error))
        });
    }

    return (
        <Flex
            justify="flex-start"
            align="center"
            gap={8}
            className={classes.producerCountry}
        >
            <TreeSortable.DragHandle active={true}/>
            <Box w={35}>
                <Image component={NextImage} src={country.image_url} alt={country.name} fit="contain" width={24} height={24} />
            </Box>
            <Text className={classes.name}>{country.name}</Text>

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
                            setEditValues(country);
                            open();
                        }}
                    >
                        Редактировать
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                        color="red"
                        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                        onClick={confirmDeleteModal}
                    >
                        Удалить
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Flex>
    )
}

export default ProducerCountry;