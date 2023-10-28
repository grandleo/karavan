import {ActionIcon, Box, Text, TextInput} from "@mantine/core";
import {ChangeEvent, useEffect, useState} from "react";
import {IconPlus, IconTrash} from "@tabler/icons-react";
import classes from "./warehouse.module.css";

interface IContact {
    id: number;
    fio: string;
    phone: string;
    email: string;
}

interface Props {
    item: IContact;
    index: number;
}

const defaultContacts = {
    id: 0,
    fio: '',
    phone: '',
    email: ''
}

const WarehousesContacts = ({setValue}: any) => {
    const [contacts, setContacts] = useState<IContact[]>([defaultContacts]);

    const handleAddContact = () => {
        setContacts([...contacts, defaultContacts])
    }

    const handleRemoveContact = (index: number) => {
        setContacts(
            contacts.filter((item, i) => i !== index)
        )
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = event.target;
        setContacts(prevContacts => {
            return prevContacts.map((contact, i) => {
                if (i === index) {
                    return { ...contact, [name]: value };
                }
                return contact;
            });
        });
    };

    useEffect(() => {
        setValue('warehouses_contacts', contacts)
    }, [contacts]);

    return (
        <>
            <Box className={classes.warehouseContacts}>
                {contacts?.map((item, index) => {
                    return (
                        <WarehouseContact key={index} item={item} index={index} handleRemoveContact={handleRemoveContact} handleInputChange={handleInputChange}/>
                    )
                })}

                <ActionIcon variant="default" color="rgba(255, 255, 255, 1)" aria-label="Добавить контанты" onClick={handleAddContact}>
                    <IconPlus/>
                </ActionIcon>
            </Box>
        </>
    )
}


interface ContactProps {
    item: IContact;
    index: number;
    handleInputChange?: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
    handleRemoveContact: (index: number) => void;
}

const WarehouseContact = ({item, index, handleInputChange, handleRemoveContact}: ContactProps) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (handleInputChange) {
            handleInputChange(event, index);
        }
    };

    return (
        <>
            <Box className={classes.warehouseContactHeader}>
                <Text className={classes.warehouseContactTitle}>Контактное лицо №{index+1}</Text>
                <ActionIcon variant="subtle" color="rgba(255, 0, 0, 1)" aria-label="Удалить" onClick={() => handleRemoveContact(index)}>
                    <IconTrash size={19}/>
                </ActionIcon>
            </Box>
            <TextInput
                label="ФИО"
                name="fio"
                value={item.fio}
                onChange={handleChange}
            />
            <TextInput
                label="Телефон"
                name="phone"
                value={item.phone}
                onChange={handleChange}
            />
            <TextInput
                label="Email"
                name="email"
                value={item.email}
                onChange={handleChange}
            />
        </>
    )
}

export default WarehousesContacts;