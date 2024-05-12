import {Box, CheckIcon, Combobox, ScrollArea, TextInput, useCombobox} from "@mantine/core";
import classes from "@/components/ui/products/productsList.module.css";
import {Dispatch, useEffect, useState} from "react";
import _ from "lodash";

interface ISpecification {
    id: number,
    name: string,
    required: boolean,
    use_product_name: boolean,
    active: boolean,
    type_choice: string,
    order_column: number,
    trading_feature: boolean,
    selected: boolean,
    values: IValue[]
}

interface IValue {
    id: number,
    specification_id: boolean,
    value: string,
    order_column: boolean,
}

interface Props {
    specification: ISpecification,
    selectSpecifications: IValue[],
    setSelectSpecifications: Dispatch<IValue[]>
}

const SelectSpecification = ({specification, selectSpecifications, setSelectSpecifications} : Props) => {
    const combobox = useCombobox();
    const [input, setInput] = useState('');
    const [selected, setSelected] = useState<IValue[]>([]);
    const {id, name, required, values, type_choice} = specification;

    const options = values?.map((item) => {
        const hasSelectedItem = _.some(selected, { id: item.id });

        return (
            <Combobox.Option value={String(item.id)} key={item.id}>
                <Box className={classes.selectSpecificationOption}>
                    <Box className={classes.selectSpecificationOptionValue}>{item.value}</Box>
                    {hasSelectedItem && (<Box><CheckIcon size={12}/></Box>)}
                </Box>
            </Combobox.Option>
        )
    });

    useEffect(() => {
        if(selectSpecifications) {
            const filterSpecifications = selectSpecifications.filter( (specification) => {
                return Number(specification.specification_id) === Number(id)
            })

            setSelected(filterSpecifications)
        }
    }, [selectSpecifications])

    useEffect(() => {
        if(selected) {
            const sortedData = _.sortBy(selected, 'order_column');
            const values = sortedData.map(obj => obj.value);
            setInput(values.join(', '));
        }
    }, [selected]);

    const handleSelectSpecifications = (option: IValue) => {

        const filterSpecifications = selectSpecifications?.filter( (item) => {
            return item.specification_id === option.specification_id
        })

        if(filterSpecifications?.length > 0){
            if(type_choice === 'multiple') {
                if (selectSpecifications.some(item => item.id === option.id)) {
                    setSelectSpecifications(selectSpecifications.filter(item => item.id !== option.id));
                } else {
                    setSelectSpecifications([...selectSpecifications, option]);
                }
            } else {
                setSelectSpecifications([...selectSpecifications?.filter( (item: any) => {
                    return filterSpecifications?.some((value) => {
                        return value.specification_id !== item.specification_id
                    })
                }), option])
            }
        } else {
            setSelectSpecifications([...selectSpecifications, option])
        }
    }

    return (
        <Combobox
            onOptionSubmit={(option) => {
                const value: IValue | undefined = values.find(item => {
                    return item.id === Number(option);
                })

                if (value) {
                    handleSelectSpecifications(value)
                }

                combobox.closeDropdown();
            }}
            store={combobox}>
            <Combobox.Target>
                <TextInput
                    label={name}
                    value={input}
                    placeholder="Выберите значение"
                    required={required}
                    onChange={() => {
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => combobox.closeDropdown()}
                />
            </Combobox.Target>

            {options?.length > 0 && (
                <Combobox.Dropdown>
                    <Combobox.Options>
                        <ScrollArea.Autosize type="scroll" mah={200}>
                            {options}
                        </ScrollArea.Autosize>
                    </Combobox.Options>
                </Combobox.Dropdown>
            )}
        </Combobox>
    )
}

export default SelectSpecification;