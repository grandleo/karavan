import {Badge, Box, Checkbox, Drawer, Menu, rem, TextInput, UnstyledButton} from "@mantine/core";
import {
    IconCopy,
    IconDotsVertical,
    IconGripVertical,
    IconPencil,
    IconTrash
} from '@tabler/icons-react';
import classes from "./settings.module.css";
import {FC} from "react";
import {useDeleteSpecificationMutation} from "@/store/api/admin/specifications.api";
import {Controller, useForm} from "react-hook-form";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import {useDisclosure} from "@mantine/hooks";
import {useDeleteCategoryMutation, useUpdateCategoryMutation} from "@/store/api/admin/categories.api";

interface CategoryItemProps {
    item: {
        id: number,
        name: string;
    };
}

const CategoryItem: FC<CategoryItemProps> = ({item}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const {id, name} = item;

    const [deleteCategory] = useDeleteCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

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
        }
    });

    const onSubmit = async (data: any) => {
        updateCategory(data).then(() => {
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
                                onClick={() => deleteCategory(id)}
                            >
                                Удалить
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>



                </Box>
            </Box>


            <Drawer opened={opened} position="right" onClose={close} title="Редактирование категории">

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

                    <PrimaryBtn type="submit">Сохранить</PrimaryBtn>

                </form>
            </Drawer>

        </>
    )
}

export default CategoryItem;