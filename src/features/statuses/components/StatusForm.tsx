import {Status} from "@/features/statuses/types/statuses.types";
import {Button, ColorInput, Drawer, Group, Loader, Modal, Select, Switch, TextInput} from "@mantine/core";
import {Controller, useForm} from "react-hook-form";
import {
    useFetchStatusByIdQuery,
    useCreateOrderStatusMutation,
    useUpdateOrderStatusMutation,
    useDeleteOrderStatusMutation
} from "@/features/statuses/api/statusesApi";
import {useEffect, useState} from "react";
import {Dropzone} from "@mantine/dropzone";
import { serialize } from 'object-to-formdata';

const defaultValues: Status = {
    id: 0,
    name: {
        ru: '',
        en: ''
    },
    type: 'logistics',
    edit_invoice: false,
    choose_logistics: false,
    order_column: 0,
    required_dimension: false,
    required_payment: false,
    role_id: '2',
    color: '#ffffff',
    bg_color: '#436CFB',
    button_text: '',
    image: null,
};

const StatusForm = ({opened, onClose, statusId}) => {
    const methods = useForm({
        defaultValues,
    });

    const { data: statusData } = useFetchStatusByIdQuery(statusId!, {
        skip: statusId === null,
    });

    // useEffect для обновления формы при получении данных статуса
    useEffect(() => {
        if (statusData) {
            const { image, ...dataWithoutImage } = statusData;
            methods.reset({
                ...dataWithoutImage,
                image: null,
            });

            if (statusData.image_url) {
                setPreviewUrl(statusData.image_url);
                setImageFile(null);
            } else {
                setPreviewUrl(null);
            }
        }
    }, [statusData, opened, methods]);

    // useEffect для обновления формы если statusId стал null
    useEffect(() => {
        if(opened && statusId === null) {
            methods.reset(defaultValues)
        }
    }, [statusId, opened]);

    // Добавляем вызов reset при закрытии формы
    const handleClose = () => {
        setImageFile(null); // Сброс состояния файла изображения
        setPreviewUrl(null); // Сброс превью изображения
        setLoading(false); // Сброс состояния загрузки
        onClose(); // Закрытие формы
    };

    const [createOrderStatus, { isLoading: isCreating }] = useCreateOrderStatusMutation();
    const [updateOrderStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();
    const [deleteOrderStatus, { isLoading: isDeleting }] = useDeleteOrderStatusMutation();

    // Состояние для модального окна подтверждения удаления
    const [confirmDeleteOpened, setConfirmDeleteOpened] = useState(false);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: Status) => {
        try {
            // delete data.image;

            const formData = serialize(data, {
                booleansAsIntegers: true,
            });

            if (imageFile) {
                formData.append("image", imageFile);
            }

            if (statusId) {
                // Обновление существующего статуса
                await updateOrderStatus(formData).unwrap();
            } else {
                // Создание нового статуса
                await createOrderStatus(formData).unwrap();
            }

            // Закрываем форму после успешной отправки
            handleClose();
        } catch (error) {
            // Обработка ошибки
            console.error('Ошибка при отправке формы:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteOrderStatus({ id: statusId }).unwrap();
            setConfirmDeleteOpened(false);
            handleClose();
        } catch (error) {
            console.error('Ошибка при удалении статуса:', error);
            // Здесь вы можете добавить отображение ошибки для пользователя
        }
    };

    return (
        <>
            <Drawer.Root opened={opened} onClose={handleClose} position="right">
                <Drawer.Overlay />
                <Drawer.Content>
                    <Drawer.Header>
                        <Drawer.Title>
                            {statusId ? 'Редактировать статус' : 'Добавить статус'}
                        </Drawer.Title>
                        <Drawer.CloseButton />
                    </Drawer.Header>
                    <Drawer.Body>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <Controller
                                name="name.ru"
                                control={methods.control}
                                rules={{ required: "Поле обязательно для заполнения" }}
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <TextInput
                                        value={value}
                                        onChange={onChange}
                                        error={error?.message}
                                        label="Наименование"
                                        placeholder="Введите название статуса"
                                        leftSection="ru"
                                        mb={5}
                                    />
                                )}
                            />
                            <Controller
                                name="name.en"
                                control={methods.control}
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <TextInput
                                        value={value}
                                        onChange={onChange}
                                        error={error?.message}
                                        placeholder="Введите название статуса"
                                        leftSection="en"
                                    />
                                )}
                            />
                            <Controller
                                name="type"
                                control={methods.control}
                                rules={{ required: "Поле обязательно для заполнения" }}
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <Select
                                        value={value}
                                        onChange={onChange}
                                        error={error?.message}
                                        label="Тип статуса"
                                        placeholder="Выберите тип статуса"
                                        data={[
                                            {value: "logistics", label: "Логистика"},
                                            {value: "payment", label: "Оплата"},
                                        ]}
                                    />
                                )}
                            />
                            <Controller
                                name="role_id"
                                control={methods.control}
                                rules={{ required: "Поле обязательно для заполнения" }}
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <Select
                                        value={value}
                                        onChange={onChange}
                                        error={error?.message}
                                        label="Роль смены статуса"
                                        placeholder="Выберите роль"
                                        data={[
                                            {value: "1", label: "Администратор"},
                                            {value: "2", label: "Поставщик"},
                                            {value: "3", label: "Клиент"},
                                            {value: "4", label: "Логист"},
                                        ]}
                                    />
                                )}
                            />
                            <Controller
                                name="edit_invoice"
                                control={methods.control}
                                render={({ field: { value, onChange } }) => (
                                    <Switch
                                        checked={value}
                                        onChange={onChange}
                                        label="Изменение накладной"
                                        mb={5}
                                    />
                                )}
                            />
                            <Controller
                                name="required_dimension"
                                control={methods.control}
                                render={({ field: { value, onChange } }) => (
                                    <Switch
                                        checked={value}
                                        onChange={onChange}
                                        label="Обязательно указать габариты"
                                        mb={5}
                                    />
                                )}
                            />
                            <Controller
                                name="choose_logistics"
                                control={methods.control}
                                render={({ field: { value, onChange } }) => (
                                    <Switch
                                        checked={value}
                                        onChange={onChange}
                                        label="Выбор логиста"
                                        mb={5}
                                    />
                                )}
                            />
                            <Controller
                                name="required_payment"
                                control={methods.control}
                                render={({ field: { value, onChange } }) => (
                                    <Switch
                                        checked={value}
                                        onChange={onChange}
                                        label="Списывается оплата"
                                        mb={5}
                                    />
                                )}
                            />

                            <Controller
                                name="color"
                                control={methods.control}
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <ColorInput
                                        value={value}
                                        onChange={onChange}
                                        label="Цвет текста"
                                        placeholder="Выберите цвет текста"
                                        mb={5}
                                        error={error && error.message}
                                    />
                                )}
                            />

                            <Controller
                                name="bg_color"
                                control={methods.control}
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <ColorInput
                                        value={value}
                                        onChange={onChange}
                                        label="Цвет фона"
                                        placeholder="Выберите цвет фона"
                                        mb={5}
                                        error={error && error.message}
                                    />
                                )}
                            />

                            <Controller
                                name="button_text"
                                control={methods.control}
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <TextInput
                                        value={value}
                                        onChange={onChange}
                                        error={error?.message}
                                        label="Текст кнопки"
                                        placeholder="Введите текст кнопки"
                                    />
                                )}
                            />

                            <Controller
                                name="image"
                                control={methods.control}
                                defaultValue={null}
                                render={({ field: { onChange }, fieldState: { error } }) => (
                                    <>
                                        <Dropzone
                                            onDrop={(files) => {
                                                const file = files[0];
                                                setLoading(true); // Устанавливаем загрузку сразу

                                                // Проверяем тип файла
                                                if (file.type !== "image/svg+xml") {
                                                    methods.setError("image", {
                                                        type: "manual",
                                                        message: "Пожалуйста, загрузите SVG-файл",
                                                    });
                                                    setLoading(false); // Сбрасываем загрузку
                                                    return;
                                                }

                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    const text = reader.result as string;
                                                    const parser = new DOMParser();
                                                    const svgDoc = parser.parseFromString(
                                                        text,
                                                        "image/svg+xml"
                                                    );
                                                    const svgElement = svgDoc.documentElement;

                                                    let width = svgElement.getAttribute("width");
                                                    let height = svgElement.getAttribute("height");

                                                    if (!width || !height) {
                                                        const viewBox = svgElement.getAttribute("viewBox");
                                                        if (viewBox) {
                                                            const viewBoxValues = viewBox.split(" ");
                                                            width = viewBoxValues[2];
                                                            height = viewBoxValues[3];
                                                        }
                                                    }

                                                    if (width && height) {
                                                        if (
                                                            parseFloat(width) >= 4 &&
                                                            parseFloat(height) >= 4
                                                        ) {
                                                            setImageFile(file);
                                                            onChange(file);
                                                            setPreviewUrl(
                                                                `data:image/svg+xml;base64,${btoa(text)}`
                                                            );
                                                        } else {
                                                            methods.setError("image", {
                                                                type: "manual",
                                                                message:
                                                                    "Минимальный размер изображения 64x64px",
                                                            });
                                                        }
                                                    } else {
                                                        methods.setError("image", {
                                                            type: "manual",
                                                            message:
                                                                "Не удалось определить размеры SVG изображения",
                                                        });
                                                    }
                                                    setLoading(false); // Сбрасываем загрузку после обработки
                                                };
                                                reader.readAsText(file);
                                            }}
                                            onReject={(fileRejections) => {
                                                // Обработка отклоненных файлов
                                                fileRejections.forEach((fileRejection) => {
                                                    fileRejection.errors.forEach((error) => {
                                                        if (error.code === "file-invalid-type") {
                                                            methods.setError("image", {
                                                                type: "manual",
                                                                message:
                                                                    "Недопустимый тип файла. Пожалуйста, загрузите SVG-файл.",
                                                            });
                                                        }
                                                        // Можно добавить обработку других ошибок
                                                    });
                                                });
                                                setLoading(false); // Сбрасываем загрузку
                                            }}
                                            accept={["image/svg+xml"]}
                                            multiple={false}
                                        >
                                            <div
                                                style={{
                                                    minHeight: 100,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {loading ? (
                                                    <Loader/>
                                                ) : (
                                                    "Перетащите изображение сюда или нажмите, чтобы выбрать файл"
                                                )}
                                            </div>
                                        </Dropzone>
                                        {error && (
                                            <div style={{color: "red"}}>{error.message}</div>
                                        )}
                                        {previewUrl && (
                                            <div style={{marginTop: 10}}>
                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    style={{maxWidth: "100%"}}
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            />

                            <Group gap={5}>
                                {statusId && (
                                    <Button
                                        color="red"
                                        onClick={() => setConfirmDeleteOpened(true)}
                                        loading={isDeleting}
                                        fullWidth={true}
                                    >
                                        Удалить
                                    </Button>
                                )}

                                <Button variant="outline" color="rgba(130, 125, 125, 1)" fullWidth={true} onClick={handleClose}>Отмена</Button>
                                <Button type="submit" loading={isCreating || isUpdating} fullWidth={true}>
                                    {statusId ? 'Сохранить изменения' : 'Добавить'}
                                </Button>
                            </Group>
                        </form>
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root>

            <Modal
                opened={confirmDeleteOpened}
                onClose={() => setConfirmDeleteOpened(false)}
                title="Подтвердите удаление"
            >
                <p>Вы уверены, что хотите удалить этот статус?</p>
                <Group position="apart" mt="md">
                    <Button variant="outline" onClick={() => setConfirmDeleteOpened(false)}>
                        Отмена
                    </Button>
                    <Button color="red" onClick={handleDelete} loading={isDeleting}>
                        Удалить
                    </Button>
                </Group>
            </Modal>
        </>
    )
}

export default StatusForm;