import {useEffect, useState} from "react";
import {Select} from "@mantine/core";
import _ from "lodash";
import {useTranslation} from "@/hooks/useTranslation";

const SelectSubCategory = ({categories, index, handleSelectCategory}: SelectSubCategoryTypes) => {
    const { trans } = useTranslation();
    const [items, setItems] = useState<ISelectCategory[]>([]);
    const [selected, setSelected] = useState<string | null>('');

    useEffect(() => {
        if(categories){
            setItems(categories);
        }
    }, [categories]);

    return (
        <Select
            placeholder={trans('stock', 'supplier.form.placeholders.subcategory')}
            allowDeselect={false}
            searchable
            nothingFoundMessage={trans('stock', 'supplier.form.search.subcategory')}
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