import {Box, Button, Checkbox, Drawer, Flex, TextInput} from "@mantine/core";
import {Controller, FormProvider, useForm} from "react-hook-form";
import CategorySpecifications from "@/components/nomenclature/components/categorySpecifications";
import {CategoryFormProps, ICategoryTypes} from "@/components/nomenclature/types";
import {useCreateCategoryMutation, useUpdateCategoryMutation} from "@/store/api/admin/nomenclature.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useEffect} from "react";
import {DropzoneUploader} from "../../Inputs";

const CategoryForm = ({opened, close, activeCategory, editValues, setEditValues, productSpecifications}: CategoryFormProps) => {
    const methods = useForm({
        defaultValues: {
            id: 0,
            name: '',
            parent_id: 0,
            required_period_validity: false,
            categorySpecifications: [],
            image: [],
            image_url: '',
            app_title: {
                ru: '',
                en: '',
            },
        }
    });

    useEffect(() => {
        if(opened === true && activeCategory && !editValues) {
            methods.setValue('parent_id', activeCategory.id)
        }
    }, [opened, activeCategory, editValues]);

    useEffect(() => {
        if (editValues) {
            methods.setValue('id', editValues.id)
            methods.setValue('name', editValues.name)
            methods.setValue('parent_id', editValues.parent_id)
            methods.setValue('required_period_validity', editValues.required_period_validity)
            methods.setValue('categorySpecifications', editValues.categorySpecifications)
            methods.setValue('image_url', editValues.image_url);
            methods.setValue('app_title', JSON.parse(editValues.app_title));
        }
    }, [editValues]);

    const image_url = methods.watch('image_url');

    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()

    const onSubmit = (data: ICategoryTypes) => {

        const formData = new FormData();
        formData.append("id", data.id.toString());
        formData.append("name", data.name);
        formData.append("parent_id", data.parent_id);
        formData.append("required_period_validity", data.required_period_validity);
        formData.append("categorySpecifications", JSON.stringify(data.categorySpecifications));
        formData.append("app_title", JSON.stringify(data.app_title));

        data.image.forEach((image, index) => {
            formData.append(`image[${index}]`, image);
        });

        const request = editValues ? updateCategory(formData) : createCategory(formData);
        request.unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
                closeForm()
            })
            .catch((error) => ErrorNotifications(error))
    }

    const closeForm = () => {
        methods.reset();
        setEditValues(undefined)
        close();
    }

    return (
        <Drawer
            opened={opened}
            onClose={closeForm}
            title={editValues ? 'Обновить категорию' : 'Добавить категорию'}
            size="lg"
            position="right">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Flex direction="column" style={{height: 'calc(100vh - 76px)'}}>
                        <Box style={{flexGrow: 1}}>
                            <Controller
                                control={methods.control}
                                rules={{
                                    required: "Поле обязательно для заполнения",
                                    minLength: {
                                        value: 3,
                                        message: "Минимальная длина поля - 3 символа",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Максимальная длина поля - 50 символов",
                                    },
                                }}
                                render={({field: {value, onChange}, fieldState: {error}}) => (
                                    <TextInput
                                        label="Название"
                                        value={value}
                                        error={error?.message}
                                        onChange={(event) => {
                                            onChange(event.currentTarget.value.trimStart());
                                        }}
                                    />
                                )}
                                name="name"
                            />

                            <Controller
                                control={methods.control}
                                name="required_period_validity"
                                render={({field: {value, onChange}}) => (
                                    <Checkbox
                                        checked={value}
                                        onChange={(e) => onChange(e.currentTarget.checked)}
                                        label="Срок годность товаров обязательно"
                                    />
                                )}
                            />

                            <Controller
                                name="app_title.ru"
                                control={methods.control}
                                render={({ field }) => (
                                    <TextInput
                                        label="Название блока в приложении"
                                        placeholder="Введите название на русском"
                                        {...field}
                                    />
                                )}
                            />

                            <Controller
                                name="app_title.en"
                                control={methods.control}
                                render={({ field }) => (
                                    <TextInput
                                        label="Название блока в приложении"
                                        placeholder="Введите название на английском"
                                        {...field}
                                    />
                                )}
                            />

                            <Controller
                                control={methods.control}
                                name="categorySpecifications"
                                render={({field}) => (
                                    <CategorySpecifications
                                        productSpecifications={productSpecifications}
                                        selectedSpecifications={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />

                            <Box mb={20} mt={20}>
                                <DropzoneUploader
                                    setValue={methods.setValue}
                                    image={image_url}
                                    error={methods.formState.errors.image?.message}
                                    clearErrors={methods.clearErrors}/>
                            </Box>
                        </Box>
                        <Button type="submit">{editValues ? 'Обновить' : 'Добавить'}</Button>
                    </Flex>
                </form>
            </FormProvider>
        </Drawer>
    )
}

export default CategoryForm;