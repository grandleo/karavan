'use client'

import {useDisclosure} from "@mantine/hooks";
import {
    Box,
    Button,
    Combobox,
    Drawer,
    TextInput,
    UnstyledButton,
    useCombobox,
    CheckIcon,
    ScrollArea
} from "@mantine/core";
import {IconGripVertical, IconPlus, IconTrash} from "@tabler/icons-react";
import {Controller, useForm} from "react-hook-form";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import {useCreateCategoryMutation} from "@/store/api/admin/categories.api";
import {useEffect, useState} from "react";
import classes from "./settings.module.css";
import {useGetSpecificationsQuery} from "@/store/api/admin/specifications.api";

interface Props {
    selectedCategory: number;
}

const AddCategoryItem = ({selectedCategory}: Props) => {
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        setValue('parent_id', selectedCategory)
    }, [selectedCategory]);

    const [createCategory] = useCreateCategoryMutation();

    const {
        handleSubmit,
        control,
        setError,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            parent_id: selectedCategory,
            specifications: []
        }
    });

    const onSubmit = async (data: any) => {
        createCategory(data).then(() => {
        })
    }

    return (
        <>
            <UnstyledButton onClick={open}>
                <IconPlus/> Категорию
            </UnstyledButton>

            <Drawer opened={opened} position="right" onClose={close} title="Добавление категории">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Controller
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Название"
                                error={errors?.name?.message}
                                onChange={(event) => {
                                    field.onChange(event.currentTarget.value);
                                }}
                            />
                        )}
                        name="name"
                    />


                    <CategorySpecifications setSpecificationValues={setValue}/>

                    <PrimaryBtn type="submit">Добавить</PrimaryBtn>

                </form>
            </Drawer>
        </>
    )
}

interface SpecificationsProps {
    id: number;
    name: string;
}

const CategorySpecifications = ({setSpecificationValues}: any) => {
    const [specifications, setSpecifications] = useState<SpecificationsProps[]>([]);
    const [selectedSpecifications, setSelectedSpecifications] = useState<SpecificationsProps[]>([]);

    const [search, setSearch] = useState('');

    const {data} = useGetSpecificationsQuery('')

    useEffect(() => {
        setSpecifications(data);
        setSpecificationValues('specifications', selectedSpecifications);
    }, [data, selectedSpecifications]);

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

export default AddCategoryItem;