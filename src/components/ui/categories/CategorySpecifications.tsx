import {
    Box,
    Button,
    CheckIcon,
    Combobox,
    LoadingOverlay,
    ScrollArea,
    useCombobox,
    UnstyledButton, ActionIcon, Switch, Tooltip
} from "@mantine/core";
import {useEffect, useState} from "react";
import {IconTrash} from "@tabler/icons-react";
import classes from "./categoryList.module.css";
import {useGetCategorySpecificationsQuery} from "@/store/api/admin/categories.api";
import _ from "lodash";
import {UseFormSetValue} from "react-hook-form";
import {TreeSortable} from "@/components/ui/sortableList/TreeSortable";
import {TreeHandle, TreeItem} from "@/components/ui/sortableList/TreeItem";

interface Props {
    setValue: UseFormSetValue<any>,
    categoryId?: number
}

interface ISpecification {
    id: number,
    name: string,
    required: number,
    use_product_name: number,
    active: number,
    order_column: number,
    values_count: number,
    trading_feature: boolean,
    selected: boolean,
}

const CategorySpecifications = ({setValue, categoryId}: Props) => {
    const [specifications, setSpecifications] = useState<ISpecification[]>([]);
    const [selectedSpecifications, setSelectedSpecifications] = useState<ISpecification[]>([]);
    const [search, setSearch] = useState('');

    const {data, isLoading} = useGetCategorySpecificationsQuery(categoryId);

    useEffect(() => {
        setSpecifications(data)
    }, [data]);

    useEffect(() => {
        setSelectedSpecifications(_.filter(specifications, {selected: true}))
    }, [specifications]);

    useEffect(() => {
        setValue('specifications', selectedSpecifications)
    }, [selectedSpecifications]);

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

    const toggleSpecificationSelection = (val: ISpecification) => {
        const updatedSpecifications = specifications.map(item => {
            if (item.id === val.id) {
                return {
                    ...item,
                    selected: !item.selected,
                };
            }
            return item;
        });

        setSpecifications(updatedSpecifications);
    }

    const toggleTradingFeature = (id: number) => {
        const updatedSpecifications = specifications.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    trading_feature: !item.trading_feature,
                };
            }
            return item;
        });
        setSpecifications(updatedSpecifications);
    };

    const resetSelectedById = (id: number) => {
        const updatedSpecifications = specifications.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    selected: false,
                };
            }
            return item;
        });
        setSpecifications(updatedSpecifications);
    };

    const resetSelected = () => {
        const updatedSpecifications = specifications.map(item => {
            return {
                ...item,
                selected: false,
            };
        });
        setSpecifications(updatedSpecifications);
    };

    const options = specifications?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase().trim()))
        .map((item) => {
            return (
                <Combobox.Option value={item} key={item.id}>
                    <Box className={classes.comboboxOption}>
                        <Box className={classes.comboboxOptionValue}>
                            {item.name}
                        </Box>
                        {item.selected && (
                            <Box><CheckIcon size={12}/></Box>
                        )}
                    </Box>
                </Combobox.Option>
            )
        })

    return (
        <>
            <Box pos="relative">
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>
                <ScrollArea h={175} className={classes.selectedCategorySpecifications}>
                    <Box className={classes.selectedCategorySpecificationsFlex}>

                        <TreeSortable items={selectedSpecifications} onChange={setSelectedSpecifications} renderItem={(item) => {
                            return (
                                <TreeItem id={item.id}>
                                    <Box style={{flexGrow: 1}}>
                                        <Box className={classes.selectedCategorySpecificationItem}>
                                            <TreeHandle/>
                                            <Box>
                                                <Tooltip label="Выводить в торг. особенность" refProp="rootRef">
                                                    <Switch checked={item.trading_feature}
                                                            onClick={() => toggleTradingFeature(item.id)}/>
                                                </Tooltip>
                                            </Box>
                                            <Box className={classes.selectedCategorySpecificationItemName}>
                                                {item.name}
                                            </Box>
                                            <Box>
                                                <ActionIcon variant="subtle" color="rgba(255, 0, 0, 1)" aria-label="Удалить"
                                                            onClick={() => resetSelectedById(item.id)}>
                                                    <IconTrash size={19}/>
                                                </ActionIcon>
                                            </Box>
                                        </Box>
                                    </Box>
                                </TreeItem>
                            )
                        }}/>

                        {/*{selectedSpecifications?.map((item, index) => (*/}
                        {/*    <Box className={classes.selectedCategorySpecificationItem} key={index}>*/}
                        {/*        <Box>*/}
                        {/*            <Tooltip label="Выводить в торг. особенность" refProp="rootRef">*/}
                        {/*                <Switch checked={item.trading_feature}*/}
                        {/*                        onClick={() => toggleTradingFeature(item.id)}/>*/}
                        {/*            </Tooltip>*/}
                        {/*        </Box>*/}
                        {/*        <Box className={classes.selectedCategorySpecificationItemName}>*/}
                        {/*            {item.name}*/}
                        {/*        </Box>*/}
                        {/*        <Box>*/}
                        {/*            <ActionIcon variant="subtle" color="rgba(255, 0, 0, 1)" aria-label="Удалить"*/}
                        {/*                        onClick={() => resetSelectedById(item.id)}>*/}
                        {/*                <IconTrash size={19}/>*/}
                        {/*            </ActionIcon>*/}
                        {/*        </Box>*/}
                        {/*    </Box>*/}
                        {/*))}*/}
                    </Box>
                </ScrollArea>

                <Combobox
                    store={combobox}
                    width={250}
                    position="bottom-start"
                    withArrow
                    onOptionSubmit={(val: any) => {
                        toggleSpecificationSelection(val);
                    }}
                >
                    <Combobox.Target withAriaAttributes={false}>
                        <Button onClick={() => combobox.toggleDropdown()}
                                className={classes.addCategorySpecificationsBtn}>Выбрать харарактеристики</Button>
                    </Combobox.Target>

                    <UnstyledButton onClick={resetSelected}
                                    className={classes.removeAllCategorySpecifications}>Очистить</UnstyledButton>

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