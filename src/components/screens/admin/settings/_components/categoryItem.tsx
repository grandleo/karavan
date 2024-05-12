import {
    Badge,
    Box, Button,
    Checkbox,
    CheckIcon,
    Combobox,
    Drawer,
    Menu,
    rem, ScrollArea,
    TextInput,
    UnstyledButton,
    useCombobox
} from "@mantine/core";
import {
    IconCopy,
    IconDotsVertical,
    IconGripVertical,
    IconPencil,
    IconTrash
} from '@tabler/icons-react';
import classes from "./settings.module.css";
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {useDeleteSpecificationMutation, useGetSpecificationsQuery} from "@/store/api/admin/specifications.api";
import {Controller, useForm} from "react-hook-form";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import {useDisclosure} from "@mantine/hooks";
import {useDeleteCategoryMutation, useUpdateCategoryMutation} from "@/store/api/admin/categories.api";

interface CategoryItemProps {
    item: {
        id: number,
        name: string;
        children: any;
        category_specifications: any;
    };
    select?: Dispatch<SetStateAction<number>>;
}

const CategoryItem: FC<CategoryItemProps> = ({item, select}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const {id, name, children, category_specifications} = item;

    const [deleteCategory] = useDeleteCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    const {
        register,
        handleSubmit,
        control,
        setError,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: id,
            name: name,
            specifications: []
        }
    });

    const onSubmit = async (data: any) => {
        updateCategory(data).then(() => {
        })
    }

    return (
        <>

            <Box className={classes.specificationItem}
                 onClick={() => select(Number(id))}
            >
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

            {children.map(child => (
                <Box style={{marginLeft: '30px'}}>
                    <CategoryItem item={child} key={child.id} select={select}/>
                </Box>
            ))}


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

                    <CategorySpecifications setSpecificationValues={setValue} categorySpecifications={category_specifications}/>

                    <PrimaryBtn type="submit">Сохранить</PrimaryBtn>

                </form>
            </Drawer>

        </>
    )
}

interface SpecificationsProps {
    id: number;
    name: string;
}

const CategorySpecifications = ({setSpecificationValues, categorySpecifications}: any) => {
    const [specifications, setSpecifications] = useState<SpecificationsProps[]>([]);
    const [selectedSpecifications, setSelectedSpecifications] = useState<SpecificationsProps[]>([]);

    const [search, setSearch] = useState('');

    const {data} = useGetSpecificationsQuery('')

    useEffect(() => {
        setSelectedSpecifications(data?.filter( (el) => {
            return categorySpecifications?.some((f) => {
                return f.specification_id === el.id
            })
        }))
    }, [data, categorySpecifications]);

    useEffect(() => {
        setSpecifications(data);
        setSpecificationValues('specifications', selectedSpecifications);

    }, [data, selectedSpecifications, categorySpecifications]);

    const combobox = useCombobox({
        onDropdownClose: () => {
            combobox.resetSelectedOption();
            combobox.focusTarget();
            setSearch('');
        },

        onDropdownOpen: () => {
            combobox.focusSearchInput();
        },
    });

    const options = specifications?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase().trim()))
        .map((item) => {
            return (
                <Combobox.Option value={item} key={item.id}>
                    {item.name}
                    {selectedSpecifications?.map( (specification) => (
                        specification.id === item.id && (<CheckIcon size={12} key={specification.id}/>)
                    ) )}
                </Combobox.Option>
            )
        })

    const handleValueSelect = (val: any) => {

        const spec = selectedSpecifications.filter((selectedSpecification) => selectedSpecification.id === val.id)

        if(spec.length > 0) {
            setSelectedSpecifications(selectedSpecifications.filter((selectedSpecification) => selectedSpecification.id !== val.id));
        } else {
            setSelectedSpecifications([...selectedSpecifications, val]);
        }

    }

    return (
        <>
            <Box className={classes.selectedSpecificationsBlock}>
                <ScrollArea h={175}>
                    <Box className={classes.selectedSpecifications}>
                        {selectedSpecifications?.map((item, index) => (
                            <Box className={classes.selectedSpecification} key={index}>
                                <Box>
                                    <IconGripVertical/>
                                </Box>
                                <Box className={classes.selectedSpecificationName}>
                                    {item.name}
                                </Box>
                                <Box>
                                    <IconTrash/>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </ScrollArea>

            </Box>

            <Combobox
                store={combobox}
                width={250}
                position="bottom-start"
                withArrow
                onOptionSubmit={(val) => {
                    // setSelectedItem(val);
                    handleValueSelect(val);
                    // combobox.closeDropdown();
                }}
            >
                <Combobox.Target withAriaAttributes={false}>
                    <Button onClick={() => combobox.toggleDropdown()}>Добавить характеристику</Button>
                </Combobox.Target>

                <Combobox.Dropdown>
                    <Combobox.Search
                        value={search}
                        onChange={(event) => setSearch(event.currentTarget.value)}
                        placeholder="Поиск характеристики"
                    />
                    <Combobox.Options>
                        {options?.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </>
    );
}

export default CategoryItem;