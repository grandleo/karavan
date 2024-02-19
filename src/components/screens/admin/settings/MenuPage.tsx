'use client'

import React, {useEffect, useState} from "react";
import {
    Box,
    Collapse,
    Drawer,
    Flex,
    NativeSelect,
    rem,
    SegmentedControl,
    Switch,
    TextInput,
    ThemeIcon
} from "@mantine/core";
import {useFetchMenuForRoleQuery, useFetchRolesQuery} from "@/store/api/admin/settings.api";
import _ from "lodash";
import {TreeHandle, TreeItem} from "@/components/ui/sortableList/TreeItem";
import {TreeSortable} from "@/components/ui/sortableList/TreeSortable";

import classes from "./_components/settings.module.css";
import {IconChevronRight, IconEdit} from "@tabler/icons-react";
import Page from "../../../simplePage";
import {useDisclosure} from "@mantine/hooks";

interface Role {
    "value": string,
    "label": string,
}

const MenuPage = () => {
    const [active, setActive] = useState<string>('1');
    const [opened, { open, close }] = useDisclosure(false);

    const {data: roles, isLoading} = useFetchRolesQuery('');

    useEffect(() => {
        if (roles?.length > 0){
            const role: Role | undefined = _.head(roles);

            if (role) {
                setActive(role.value)
            }
        }
    }, [roles]);

    return (
        <>
            <Page title="Меню" isLoading={isLoading}>
                {!isLoading && (
                    <SegmentedControl
                        value={active}
                        onChange={setActive}
                        data={roles}
                        mb={20}
                    />
                )}

                <Box>
                    <MenuSortable active={active} openForm={open}/>
                </Box>

                <FormItem opened={opened} close={close}/>
            </Page>
        </>
    )
}

interface MenuSortableProps {
    active: string;
    openForm: () => void;
}

const MenuSortable = ({active, openForm}: MenuSortableProps) => {
    const [items, setItems] = useState<[]>([]);
    const {data: menuItems} = useFetchMenuForRoleQuery(active);

    useEffect(() => {
        if (menuItems?.length > 0){
            setItems(menuItems)
        }
    }, [menuItems]);

    const onSetSort = (ids: {}) => {}

    return (
        <>
            <TreeSortable items={items} onSortEnd={onSetSort} onChange={setItems} renderItem={(item) => {

                return (
                    <TreeItem id={item.id}>
                        <MenuItem item={item} openForm={openForm}/>
                    </TreeItem>
                )
            }}/>
        </>
    )
}

interface IMenu {
    "id": number,
    "name": string,
    "url": string,
    "icon": string,
    "role_id": number,
    "parent_id": number,
    "dynamic_table": string,
    "dynamic_name": string,
    "order_column": number,
    "children": []
}

interface MenuItemProps {
    item: IMenu;
    openForm: () => void;
}

const MenuItem = ({item, openForm}: MenuItemProps) => {
    const [opened, setOpened] = useState(false);

    const hasChildren = item.children?.length > 0 ;

    return (
        <>
            <Flex className={classes.menuItem} align="center">
                <Box>
                    <TreeHandle/>
                </Box>
                <Box className={classes.name}>
                    {hasChildren && (
                        <span>
                        <IconChevronRight
                            className={classes.chevron}
                            stroke={1.5}
                            style={{
                                width: rem(16),
                                height: rem(16),
                                transform: opened ? 'rotate(-90deg)' : 'none',
                            }}
                            onClick={() => setOpened((o) => !o)}
                        />
                            </span>
                    )}
                    {item.name}
                </Box>
                <Box>
                    <ThemeIcon variant="light" color="#3B9F98" size={30} className={classes.editIcon} onClick={openForm}>
                        <IconEdit/>
                    </ThemeIcon>
                </Box>
            </Flex>
            {hasChildren && <Collapse in={opened}>
                <Box w='100%' pl={20}>
                    {item.children.map((item, index) => {
                        return (
                            <MenuItem item={item} key={index}/>
                        )
                    })}
                </Box>
            </Collapse>}
        </>
    )
}

interface FormProps {
    opened: boolean,
    close: () => void,
    item?: IMenu
}

const FormItem = ({opened, close, item}: FormProps) => {
    return (
        <Drawer opened={opened} onClose={close} position="right" title={item === undefined ? 'Добавление пункта меню': 'Редактирование'}>
            <TextInput
                label="Название статуса"
                placeholder="Input placeholder"
            />

            <NativeSelect
                label="Роль пользователя"
                data={[
                    { label: 'Клиент', value: '1' },
                    { label: 'Поставщик', value: '2' },
                    { label: 'Логист', value: '3'},
                    { label: 'Админ', value: '4' },
                ]}
            />

            <Switch
                defaultChecked
                label="Требовать оплату"
            />
            <Switch
                defaultChecked
                label="Может редактировать инвойс"
            />
            <Switch
                defaultChecked
                label="Выбор логиста"
            />
            <Switch
                defaultChecked
                label="Требуется габариты инвойса"
            />
        </Drawer>
    )
}

export default MenuPage;