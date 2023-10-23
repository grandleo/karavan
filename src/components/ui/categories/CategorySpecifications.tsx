import {useGetSpecificationsQuery} from "@/store/api/admin/specifications.api";
import {
    Box,
    Button,
    CheckIcon,
    Combobox,
    LoadingOverlay,
    ScrollArea,
    useCombobox,
    UnstyledButton, ActionIcon
} from "@mantine/core";
import {useEffect, useState} from "react";
import {IconTrash} from "@tabler/icons-react";
import classes from "./categoryList.module.css";

interface SpecificationsProps {
    id: number;
    name: string;
}

interface ISpecification {
    id: number,
    name: string,
    required: number,
    use_product_name: number,
    active: number,
    order_column: number,
    values_count: number,
}

interface ICategorySpecification {
    category_id: number,
    order_column: number,
    specification_id: number,
}

const CategorySpecifications = ({setSpecificationValues, categorySpecifications}: any) => {
    const [specifications, setSpecifications] = useState<SpecificationsProps[]>([]);
    const [selectedSpecifications, setSelectedSpecifications] = useState<SpecificationsProps[]>([]);
    const [search, setSearch] = useState('');

    const {data, isLoading} = useGetSpecificationsQuery('')

    useEffect(() => {
        setSelectedSpecifications(data?.filter( (specification: ISpecification) => {
            return categorySpecifications?.some((categorySpecification: ICategorySpecification) => {
                return categorySpecification.specification_id === specification.id
            })
        }))
    }, [data, categorySpecifications]);

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

    const handleValueSelect = (val: SpecificationsProps) => {
        const spec = selectedSpecifications.filter((selectedSpecification) => selectedSpecification.id === val.id)

        if(spec.length > 0) {
            setSelectedSpecifications(selectedSpecifications.filter((selectedSpecification) => selectedSpecification.id !== val.id));
        } else {
            setSelectedSpecifications([...selectedSpecifications, val]);
        }
    }

    const handleDeleteAllValues = () => {
        setSelectedSpecifications([]);
    }

    const handleDeleteValue = (itemId: number) => {
        setSelectedSpecifications(
            selectedSpecifications.filter(item => item.id !== itemId)
        )
    }

    const options = specifications?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase().trim()))
        .map((item) => {
            return (
                <Combobox.Option value={item} key={item.id}>
                    <Box className={classes.comboboxOption}>
                        <Box className={classes.comboboxOptionValue}>
                            {item.name}
                        </Box>
                        {selectedSpecifications?.map( (specification, index: number) => (
                            specification.id === item.id && (<Box key={index}><CheckIcon size={12} key={specification.id}/></Box>)
                        ) )}
                    </Box>
                </Combobox.Option>
            )
        })

    return (
        <>
            <Box pos="relative">
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <ScrollArea h={175} className={classes.selectedCategorySpecifications}>
                    <Box className={classes.selectedCategorySpecificationsFlex}>
                        {selectedSpecifications?.map((item, index) => (
                            <Box className={classes.selectedCategorySpecificationItem} key={index}>
                                <Box className={classes.selectedCategorySpecificationItemName}>
                                    {item.name}
                                </Box>
                                <Box>
                                    <ActionIcon variant="subtle" color="rgba(255, 0, 0, 1)" aria-label="Удалить" onClick={() => handleDeleteValue(item.id)}>
                                        <IconTrash size={19}/>
                                    </ActionIcon>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </ScrollArea>

                <Combobox
                    store={combobox}
                    width={250}
                    position="bottom-start"
                    withArrow
                    onOptionSubmit={(val: any) => {
                        handleValueSelect(val);
                    }}
                >
                    <Combobox.Target withAriaAttributes={false}>
                            <Button onClick={() => combobox.toggleDropdown()} className={classes.addCategorySpecificationsBtn}>Выбрать харарактеристики</Button>
                    </Combobox.Target>

                    <UnstyledButton onClick={handleDeleteAllValues} className={classes.removeAllCategorySpecifications}>Очистить</UnstyledButton>

                    <Combobox.Dropdown>
                        <Combobox.Search
                            value={search}
                            onChange={(event) => setSearch(event.currentTarget.value)}
                            placeholder="Поиск характеристики"
                        />
                        <Combobox.Options>
                            {options?.length > 0 ? options : <Combobox.Empty>Специализаций не найдено</Combobox.Empty>}
                        </Combobox.Options>
                    </Combobox.Dropdown>
                </Combobox>
            </Box>
        </>
    )
}

export default CategorySpecifications;