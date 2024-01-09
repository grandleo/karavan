import {useDisclosure} from "@mantine/hooks";
import {IconPlus} from "@tabler/icons-react";
import {Box, Button, CheckIcon, Combobox, Drawer, ScrollArea, Textarea, TextInput, useCombobox} from "@mantine/core";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import classes from "./productsList.module.css";
import {Controller, useForm} from "react-hook-form";
import {useCreateProductMutation} from "@/store/api/admin/products.api";
import {useEffect, useState} from "react";
import {useGetCategorySpecificationsQuery} from "@/store/api/admin/categories.api";
import _ from "lodash";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useSelector} from "react-redux";
import {getCategoriesState} from "@/store/slices/categorySlice";

interface Props {
}

const AddProductItem = ({}: Props) => {
    const {selectedCategory} = useSelector(getCategoriesState);
    const [opened, { open, close }] = useDisclosure(false);
    const [selectSpecifications, setSelectSpecifications] = useState([]);

    const {data: categorySpecifications} = useGetCategorySpecificationsQuery(selectedCategory);
    const [createProduct] = useCreateProductMutation();

    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            article: '',
            description: '',
            category_id: selectedCategory,
            specifications: []
        }
    });

    useEffect(() => {
        setValue('category_id', selectedCategory);

        const filteredSelectSpecifications = selectSpecifications.filter(spec => {
            const correspondingCategorySpec = categorySpecifications.find(catSpec => catSpec.id === spec.specification_id);
            return correspondingCategorySpec && correspondingCategorySpec.use_product_name === 1;
        });

        const mergedArray = _.map(filteredSelectSpecifications, (values) => {
            const values2 = _.find(categorySpecifications, {id: values.specification_id});

            if (values2) {
                return _.assign({}, values, { specification_order: values2.order_column });
            }

            return values;
        });

        const groupSorted = _(mergedArray).groupBy('specification_order')
            .mapValues(group => _.sortBy(group, ['order_column']))
            .value();

        const resultString = Object.values(groupSorted)
            .map(arr => arr.map(obj => obj.value).join(' '))
            .join(' ');

        setValue('name', resultString)
    }, [selectSpecifications, selectedCategory]);

    const onSubmit = async (data: any) => {
        createProduct(data).unwrap()
            .then((payload) => {
                close();
                reset();
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error))
    }

    return (
        <>
            <Button variant="filled" onClick={open} disabled={selectedCategory === 0} className={classes.addProductItemBtn}>
                <IconPlus size={22}/>
            </Button>

            <Drawer opened={opened} position="right" onClose={close} title="Добавление товара">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box className={classes.formFlex}>
                        <Box className={classes.formArea}>

                            <Controller
                                control={control}
                                rules={{
                                    required: "Поле обязательно для заполнения. Для заполнения названия выбери характеристики",
                                    minLength: {
                                        value: 3,
                                        message: "Минимальная длина поля - 3 символа",
                                    },
                                    maxLength: {
                                        value: 250,
                                        message: "Максимальная длина поля - 250 символов",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextInput
                                        label="Название товара"
                                        value={field.value}
                                        error={errors?.name?.message}
                                        disabled={true}
                                    />
                                )}
                                name="name"
                            />

                            <Controller
                                control={control}
                                rules={{
                                    required: "Поле обязательно для заполнения. Для заполнения названия выбери характеристики",
                                    minLength: {
                                        value: 3,
                                        message: "Минимальная длина поля - 3 символа",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Максимальная длина поля - 50 символов",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextInput
                                        label="Артикул"
                                        value={field.value}
                                        error={errors?.article?.message}
                                        onChange={(event) => {
                                            field.onChange(event.currentTarget.value);
                                        }}
                                    />
                                )}
                                name="article"
                            />

                            <Controller
                                control={control}
                                rules={{
                                    maxLength: {
                                        value: 500,
                                        message: "Максимальная длина поля - 500 символов",
                                    },
                                }}
                                render={({ field }) => (
                                    <Textarea
                                        label="Описание товара"
                                        value={field.value}
                                        error={errors?.description?.message}
                                        onChange={(event) => {
                                            field.onChange(event.currentTarget.value);
                                        }}
                                    />
                                )}
                                name="description"
                            />

                            {categorySpecifications?.map((item: any, index: number) => {
                                return (
                                    <SelectSpecifications
                                        item={item}
                                        selectSpecifications={selectSpecifications}
                                        setSelectSpecifications={setSelectSpecifications}
                                        key={index}/>
                                )
                            })}

                        </Box>
                        <Box>
                            <PrimaryBtn type="submit">Добавить</PrimaryBtn>
                        </Box>
                    </Box>
                </form>

            </Drawer>
        </>
    )
}

const SelectSpecifications = ({item, selectSpecifications, setSelectSpecifications}: any) => {
    const combobox = useCombobox();
    const [selectValue, setSelectValue] = useState([]);

    const {name, values, type_choice} = item;

    const options = values?.map((item: any) => (
        <Combobox.Option value={item} key={item.id}>
            <Box className={classes.selectSpecificationOption}>
                <Box className={classes.selectSpecificationOptionValue}>{item.value}</Box>
                <Box>
                    {selectSpecifications?.map( (values, index: number) => (
                        values.id === item.id && (<Box key={index}><CheckIcon size={12} key={values.id}/></Box>)
                    ) )}
                </Box>
            </Box>
        </Combobox.Option>
    ));

    const handleSelectSpecifications = (option: any) => {

        const filterValues = selectSpecifications?.filter( (item: any) => {
            return item.specification_id === option.specification_id
        } )

        if(filterValues.length > 0){
            if(type_choice === 'multiple'){
                if (selectSpecifications.some(item => item.id === option.id)) {
                    setSelectSpecifications(selectSpecifications.filter(item => item.id !== option.id));
                } else {
                    setSelectSpecifications([...selectSpecifications, option]);
                }
            } else {
                setSelectSpecifications([...selectSpecifications?.filter( (item: any) => {
                    return filterValues?.some((value: any) => {
                        return value.specification_id !== item.specification_id
                    })
                }), option])
            }
        }else{
            setSelectSpecifications([...selectSpecifications, option])
        }

    }

    return (

        <Combobox
            onOptionSubmit={(optionValue: any) => {
                if(type_choice === 'multiple') {
                    setSelectValue(prevState => {
                        if (prevState.includes(optionValue?.value)) {
                            return prevState.filter(item => item !== optionValue?.value);
                        } else {
                            return [...prevState, optionValue?.value];
                        }
                    });
                } else {
                    setSelectValue(optionValue?.value)
                }

                handleSelectSpecifications(optionValue)
                combobox.closeDropdown();
            }}
            store={combobox}
        >
            <Combobox.Target>
                <TextInput
                    label={name}
                    placeholder="Выберите значение"
                    value={selectValue}
                    onChange={(event) => {
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => combobox.closeDropdown()}
                />
            </Combobox.Target>

            {options.length > 0 && (
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

export default AddProductItem;