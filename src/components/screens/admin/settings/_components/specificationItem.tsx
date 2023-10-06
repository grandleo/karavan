import {Box, Button, Checkbox, Drawer, Menu, rem, TextInput, UnstyledButton} from "@mantine/core";
import {
    IconDotsVertical,
    IconGripVertical,
    IconPencil,
    IconTrash
} from '@tabler/icons-react';
import classes from "./settings.module.css";
import {FC, useEffect, useState} from "react";
import {
    useAddSpecificationValuesMutation,
    useDeleteSpecificationMutation, useDeleteSpecificationValueMutation, useGetSpecificationValuesQuery,
    useUpdateSpecificationMutation
} from "@/store/api/admin/specifications.api";
import {Controller, useForm} from "react-hook-form";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import {useDisclosure} from "@mantine/hooks";

interface SpecificationItemProps {
    item: {
        id: number,
        name: string;
        required: boolean;
        use_product_name: boolean;
    };
}

const SpecificationItem: FC<SpecificationItemProps> = ({item}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const {id, name, required, use_product_name} = item;

    const [deleteSpecification] = useDeleteSpecificationMutation();
    const [updateSpecification] = useUpdateSpecificationMutation();

    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: id,
            name: name,
            required: required,
            use_product_name: use_product_name,
        }
    });

    const onSubmit = async (data: any) => {
        console.log(data)
        updateSpecification(data).then(() => {
            console.log('ура')
        })
    }

    return (
        <>

            <Box className={classes.specificationItem}>
                <Box>
                    <IconGripVertical/>
                </Box>
                <Box className={classes.specificationName}>
                    {name}
                </Box>
                <AddValues/>
                <Box>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <UnstyledButton>
                                <IconDotsVertical/>
                            </UnstyledButton>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />} onClick={open}>
                                Редактировать
                            </Menu.Item>
                            <Menu.Item
                                color="red"
                                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => deleteSpecification(id)}
                            >
                                Удалить
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>



                </Box>
            </Box>

            <Drawer opened={opened} position="right" onClose={close} title="Добавление поля">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Controller
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Название"
                                error={errors?.name?.message}
                                value={field.value}
                                onChange={(event) => {
                                    field.onChange(event.currentTarget.value);
                                }}
                            />
                        )}
                        name="name"
                    />
                    <Checkbox
                        {...register("required")}
                        // checked={!!required}
                        label="Обязательное поле"
                    />

                    <Checkbox
                        {...register("use_product_name")}
                        // defaultValue={use_product_name}
                        // value={use_product_name}
                        // checked={!!use_product_name}
                        // onChange={(event) => event.target.checked}
                        label="Участвует в формировании названия"
                    />

                    <PrimaryBtn type="submit">Сохранить</PrimaryBtn>

                </form>
            </Drawer>

        </>
    )
}

interface Person {
    id: number;
    value: string;
}

const AddValues = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [values, setValues] = useState<Person[]>([{id: 0, value: ""}]);

    const {data} = useGetSpecificationValuesQuery(1);
    const [AddSpecificationValues] = useAddSpecificationValuesMutation();
    const [deleteSpecificationValue] = useDeleteSpecificationValueMutation();

    useEffect(() => {
        if(data?.length > 0) {
            setValues([...data])

        }
    },[data])

    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number): void => {
        const { value }: { value: string } = event.target;

        setValues(values.map(( artwork, i) => {
            if (i === index) {
                return { ...artwork, value: value };
            } else {
                return artwork;
            }
        }));
    };

    const handleAddClick = () => {
        setValues([...values, { id: 0, value: "" }]);
    };

    const handleRemoveClick = (index: number, id: number) => {
        const list = [...values];
        list.splice(index, 1);
        setValues(list);

        if(id)
        {
            deleteSpecificationValue(id)
        }
    };

    const onSubmit = async (data: any) => {
        AddSpecificationValues({id_specification: "1", values: values})
    }

    return (
        <>
            <Box onClick={open}>В списке: 0</Box>

            <Drawer opened={opened} position="right" onClose={close} title="Добавление значений">

                <Button onClick={handleAddClick}>+</Button>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {values?.map((item, index) => {
                        return (
                            <Box key={index} className={classes.specificationValueBlock}>
                                <Box>
                                    <IconGripVertical/>

                                </Box>
                                <Box>
                                    <TextInput
                                        name="value"
                                        placeholder="Значение"
                                        value={item.value}
                                        type="text"
                                        onChange={event => handleInputChange(event, index)}
                                        mb={{ base: 0 }}
                                    />
                                </Box>
                                <Box onClick={() => handleRemoveClick(index, Number(item.id))}><IconTrash/></Box>
                            </Box>
                        )
                    })}

                    <PrimaryBtn type="submit">Сохранить</PrimaryBtn>

                </form>
            </Drawer>
        </>
    )
}

export default SpecificationItem;