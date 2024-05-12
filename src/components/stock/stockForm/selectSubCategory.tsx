import {useEffect, useState} from "react";
import {Select} from "@mantine/core";
import _ from "lodash";

const SelectSubCategory = ({categories, index, handleSelectCategory}: SelectSubCategoryTypes) => {
    const [items, setItems] = useState<ISelectCategory[]>([]);
    const [selected, setSelected] = useState<string | null>('');

    useEffect(() => {
        if(categories){
            setItems(categories);
        }
    }, [categories]);

    return (
        <Select
            label="Подкатегория"
            placeholder="Выберите подкатегорию"
            allowDeselect={false}
            searchable
            nothingFoundMessage="Категории не найдено..."
            data={items}
            value={selected}
            onChange={(id) => {
                if(id) {
                    const filteredCategory = _.find(items, {'value': id});
                    setSelected(id);
                    handleSelectCategory(id, index, filteredCategory);
                }
            }}
        />
    )
}

export default SelectSubCategory;