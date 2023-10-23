import {useDisclosure} from "@mantine/hooks";
import {IconPlus} from "@tabler/icons-react";
import {Box, Button, Combobox, Drawer, ScrollArea, Textarea, TextInput, useCombobox} from "@mantine/core";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import classes from "./productsList.module.css";
import {Controller, useForm} from "react-hook-form";
import {useCreateProductMutation} from "@/store/api/admin/products.api";
import {useEffect, useState} from "react";
import {useGetCategorySpecificationsQuery} from "@/store/api/admin/categories.api";
import _ from "lodash";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";

interface Props {
    activeCategory: number;
}

const AddProductItem = ({activeCategory}: Props) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [selectSpecifications, setSelectSpecifications] = useState([]);

    const {data: categorySpecifications} = useGetCategorySpecificationsQuery(activeCategory);
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
            category_id: activeCategory,
            specifications: []
        }
    });

    useEffect(() => {
        setValue('category_id', activeCategory);

        const sortedData = _.sortBy(categorySpecifications, ['order_column']);

        const specificationForNameProduct = selectSpecifications.filter((item:any) => {
            return sortedData?.some((specification: any) => {
                return item.specification_id === specification.id && specification.use_product_name === 1
            })
        })

        const newProductName = specificationForNameProduct.map((item: any) => {
            return item.value
        });

        setValue('name', newProductName.join(' '))
    }, [selectSpecifications, activeCategory]);

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
            <Button variant="filled" onClick={open} disabled={activeCategory === 0} className={classes.addProductItemBtn}>
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
                                        value: 50,
                                        message: "Максимальная длина поля - 50 символов",
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
    const [selectValue, setSelectValue] = useState('');

    const {name, values} = item;

    const options = values?.map((item: any) => (
        <Combobox.Option value={item} key={item.id}>
            {item.value}
        </Combobox.Option>
    ));

    const handleSelectSpecifications = (option: any) => {

        const existValuesSpecification = selectSpecifications?.filter( (item: any) => {
            return values?.some((value: any) => {
                return value.id === item.id
            })
        })

        if(existValuesSpecification.length > 0){
            setSelectSpecifications([...selectSpecifications?.filter( (item: any) => {
                return existValuesSpecification?.some((value: any) => {
                    return value.specification_id !== item.specification_id
                })
            }), option])
        }else{
            setSelectSpecifications([...selectSpecifications, option])
        }

    }

    return (
        <Combobox
            onOptionSubmit={(optionValue: any) => {
                setSelectValue(optionValue?.value)
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