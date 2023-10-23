import {IconPlus} from "@tabler/icons-react";
import {
    Combobox,
    Drawer,
    ScrollArea,
    Textarea,
    TextInput,
    UnstyledButton,
    useCombobox
} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useEffect, useState} from "react";
import {useGetCategorySpecificationsQuery} from "@/store/api/admin/categories.api";
import {Controller, useForm} from "react-hook-form";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import {useCreateProductMutation} from "@/store/api/admin/products.api";

//Форма отправки на бэк
//Обновление списка товаров

interface Props {
    selectedCategory: number;
}

const AddProductItem = ({selectedCategory}: Props) => {
    const [opened, { open, close }] = useDisclosure(false);

    // const [productName, setProductName] = useState('')
    const [selectSpecifications, setSelectSpecifications] = useState([]);

    const {data} = useGetCategorySpecificationsQuery(selectedCategory);
    const [createProduct] = useCreateProductMutation();

    const {
        register,
        handleSubmit,
        control,
        setError,
        setValue,
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
        setValue('category_id', selectedCategory)
        setValue('specifications', selectSpecifications)

        const specificationForNameProduct = selectSpecifications.filter((item:any) => {
            return data?.some((specification: any) => {
                return item.specification_id === specification.id && specification.use_product_name === 1
            })
        })

        const newProductName = specificationForNameProduct.map((item: any) => {
            return item.value
        });

        setValue('name', newProductName.join(' '))

        // setProductName(newProductName.join(' '));
    }, [selectSpecifications, selectedCategory]);

    const onSubmit = async (data: any) => {
        createProduct(data).then(() => {
            console.log('товар добавлен')
        })
    }

    return (
        <>
            <UnstyledButton onClick={open}>
                <IconPlus/> Товар
            </UnstyledButton>


            <Drawer opened={opened} position="right" onClose={close} title="Добавление товара">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Название товара"
                                value={field.value}
                                disabled={true}
                            />
                        )}
                        name="name"
                    />
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Артикул"
                                value={field.value}
                                onChange={(event) => {
                                    field.onChange(event.currentTarget.value);
                                }}
                            />
                        )}
                        name="article"
                    />
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <Textarea
                                label="Описание товара"
                                value={field.value}onChange={(event) => {
                                    field.onChange(event.currentTarget.value);
                                }}
                            />
                        )}
                        name="description"
                    />

                    {data?.map((item: any, index: number) => {
                        return (
                            <SelectSpecifications
                                item={item}
                                selectSpecifications={selectSpecifications}
                                setSelectSpecifications={setSelectSpecifications}
                                key={index}/>
                        )
                    })}

                    <PrimaryBtn type="submit">Добавить товар</PrimaryBtn>
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