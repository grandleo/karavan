import {Box, Button, Combobox, Flex, ScrollArea, useCombobox, Text, CheckIcon} from "@mantine/core";
import {useEffect, useState} from "react";
import {TreeSortable} from "@/components/treeSortable";
import SelectedSpecification from "@/components/nomenclature/components/selectedSpecification";
import classes from "@/components/nomenclature/styles.module.css";
import {useGetProductSpecificationsQuery} from "@/store/api/admin/specifications.api";
import {CategorySpecificationsProps} from "@/components/nomenclature/types";

const CategorySpecifications = ({productSpecifications, selectedSpecifications, onChange} : CategorySpecificationsProps) => {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState([]);

    const combobox = useCombobox();

    useEffect(() => {
        setSelected(selectedSpecifications);
    }, [selectedSpecifications]);

    const handleOptionSubmit = (item) => {
        const isSelected = selected.some(selectedItem => selectedItem.id === item.id);
        if (isSelected) {
            const updated = selected.filter(selectedItem => selectedItem.id !== item.id);
            setSelected(updated);
            onChange(updated);
        } else {
            const updated = [...selected, item];
            setSelected(updated);
            onChange(updated);
        }
    };

    const handleRemove = (item) => {
        const updated = selected.filter(selectedItem => selectedItem.id !== item.id);
        setSelected(updated);
        onChange(updated);
    };

    const handleClear = () => {
        setSelected([]);
        onChange([]);
    };

    const handleTradingFeatureToggle = (itemId) => {
        const updated = selected.map(selectedItem =>
            selectedItem.id === itemId ? {...selectedItem, trading_feature: !selectedItem.trading_feature} : selectedItem
        );
        setSelected(updated);
        onChange(updated);
    };

    const options = productSpecifications?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase().trim()))
        .map((item) => {
            const isSelected = selected.some(selectedItem => selectedItem.id === item.id);
            return (
                <Combobox.Option value={item} key={item.id}>
                    <Flex
                        align="center"
                        gap={8}
                        className={classes.optionProductSpecification}>
                        <Text className={classes.name}>{item.name}</Text>
                        {isSelected && <CheckIcon size={12}/>}
                    </Flex>
                </Combobox.Option>
            )
        });

    return (
        <Box>
            <ScrollArea h={175} className={classes.categorySelectedSpecifications}>
                <TreeSortable items={selected}
                              onChange={(newSelected) => {
                                  setSelected(newSelected);
                                  onChange(newSelected);
                              }}
                              renderItem={(item) => {
                    return (
                        <TreeSortable.Item id={item.id}>
                            <SelectedSpecification item={item} onRemove={handleRemove} onToggleTradingFeature={handleTradingFeatureToggle}/>
                        </TreeSortable.Item>
                    )
                }}/>
            </ScrollArea>
            <Combobox
                store={combobox}
                width={250}
                position="bottom-start"
                withArrow
                onOptionSubmit={handleOptionSubmit}
            >
                <Combobox.Target>
                    <Button variant="filled" color="gray" onClick={() => combobox.toggleDropdown()}>Выбрать характеристики</Button>
                </Combobox.Target>
                <Button variant="transparent" color="gray" onClick={handleClear}>Очистить</Button>
                <Combobox.Dropdown>
                    <Combobox.Search
                        value={search}
                        onChange={(event) => setSearch(event.currentTarget.value)}
                        placeholder="Поиск характеристик"
                    />
                    <Combobox.Options>
                        <ScrollArea.Autosize type="scroll" mah={200}>
                            {options?.length > 0 ? options : <Combobox.Empty>Специализаций не найдено</Combobox.Empty>}
                        </ScrollArea.Autosize>
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </Box>
    )
}

export default CategorySpecifications;