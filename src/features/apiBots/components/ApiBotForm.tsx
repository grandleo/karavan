import {IconCirclePlusFilled, IconPencilMinus, IconTrash, IconX} from "@tabler/icons-react";
import {
    Button,
    Drawer,
    Switch,
    TextInput,
    Text,
    Divider,
    Box,
    Flex,
    Checkbox,
    ActionIcon,
    Skeleton, Modal
} from "@mantine/core";
import FastCreateWarehouse from "@/features/warehouses/components/FastCreateWarehouse/FastCreateWarehouse";
import {Controller, FormProvider} from "react-hook-form";
import classes from "./ApiBotForm.module.css";
import useWarehouseManager from "@/features/warehouses/hooks/useWarehouseManager";
import useApiBotForm from "@/features/apiBots/hooks/useApiBotForm";
import {useTranslation} from "@/hooks/useTranslation";

interface ApiBotFormProps {
    opened: boolean;
    close: () => void;
    mode: 'add' | 'edit';
    apiBotId?: number | null;
    initialData?: any; // Замените на реальный тип данных ApiBot
}

interface Warehouse {
    id: number;
    address: string;
    // Добавьте другие свойства при необходимости
}

const ApiBotForm = ({opened, close, mode, apiBotId, initialData}: ApiBotFormProps) => {

    const { trans } = useTranslation();

    // Используем хук формы ApiBot
    const {
        methods,
        isCreating,
        isUpdating,
        isDeleting,
        modalOpened,
        handleDelete,
        confirmDelete,
        cancelDelete,
        onSubmit,
    } = useApiBotForm({
        mode,
        apiBotId,
        initialData,
        onClose: close,
    });

    // Используем хук управления складами
    const {
        showSkeleton,
        warehousesData,
        deleteModalOpened,
        warehouseEditMode,
        editingWarehouseData,
        isFastCreateOpen,
        setIsFastCreateOpen,
        handleOpenDeleteModal,
        handleConfirmDelete,
        handleCancelDelete,
        handleAddWarehouseClick,
        handleEditWarehouse,
    } = useWarehouseManager({ isDrawerOpened: opened, methods });

    // Функция для закрытия Drawer и сброса состояния формы
    const handleClose = () => {
        methods.reset();
        setIsFastCreateOpen(false);
        close();
    };

    return (
        <>
            <Drawer
                opened={opened}
                onClose={handleClose}
                title={mode === 'add' ? trans('api', 'form.title.add') : trans('api', 'form.title.edit')}
                padding={0}>
                <Flex direction="column" className={classes.wrapper}>
                    <FormProvider {...methods}>
                        <form onSubmit={onSubmit}>
                            <Box className={classes.content}>
                                <Controller
                                    name="active"
                                    control={methods.control}
                                    render={({field: {value, onChange}}) => (
                                        <Switch
                                            label={trans('api', 'form.inputs.on')}
                                            size="md"
                                            checked={value}
                                            onChange={(event) => onChange(event.currentTarget.checked)}
                                        />
                                    )}
                                />

                                <Controller
                                    name="name"
                                    control={methods.control}
                                    rules={{
                                        required: "Это поле обязательно.",
                                    }}
                                    render={({field: {value, onChange}, fieldState: {error}}) => {
                                        return (
                                            <TextInput
                                                value={value}
                                                onChange={onChange}
                                                label={trans('api', 'form.inputs.name')}
                                                rightSection={
                                                    <ActionIcon
                                                        variant="white"
                                                        color="#1B1F3B59"
                                                        aria-label="Очистить"
                                                        onClick={() => onChange('')}
                                                        style={{display: value ? 'block' : 'none'}}
                                                    >
                                                        <IconX style={{width: '70%', height: '70%'}} stroke={2}/>
                                                    </ActionIcon>
                                                }
                                                error={error?.message}
                                            />
                                        )
                                    }}
                                />

                                <Controller
                                    name="token"
                                    control={methods.control}
                                    rules={{
                                        required: "Это поле обязательно.",
                                    }}
                                    render={({field: {value, onChange}, fieldState: {error}}) => {
                                        return (
                                            <TextInput
                                                value={value}
                                                onChange={onChange}
                                                label={trans('api', 'form.inputs.api')}
                                                rightSection={
                                                    <ActionIcon
                                                        variant="white"
                                                        color="#1B1F3B59"
                                                        aria-label="Очистить"
                                                        onClick={() => onChange('')}
                                                        style={{display: value ? 'block' : 'none'}}
                                                    >
                                                        <IconX style={{width: '70%', height: '70%'}} stroke={2}/>
                                                    </ActionIcon>
                                                }
                                                error={error?.message}
                                            />
                                        )
                                    }}
                                />

                                <Controller
                                    name="username_support"
                                    control={methods.control}
                                    rules={{
                                        maxLength: {
                                            value: 255,
                                            message: 'Максимальная длина 255 символов.',
                                        },
                                    }}
                                    render={({field: {value, onChange}, fieldState: {error}}) => {
                                        return (
                                            <TextInput
                                                value={value}
                                                onChange={onChange}
                                                label={trans('api', 'form.inputs.support')}
                                                rightSection={
                                                    <ActionIcon
                                                        variant="white"
                                                        color="#1B1F3B59"
                                                        aria-label="Очистить"
                                                        onClick={() => onChange('')}
                                                        style={{display: value ? 'block' : 'none'}}
                                                    >
                                                        <IconX style={{width: '70%', height: '70%'}} stroke={2}/>
                                                    </ActionIcon>
                                                }
                                                error={error?.message}
                                            />
                                        )
                                    }}
                                />
                            </Box>

                            <Divider/>

                            <Box className={classes.content}>
                                <Text className={classes.title}>
                                    {trans('warehouses', 'form.title.block')}
                                </Text>

                                {showSkeleton ? (
                                    <Flex direction="column" gap={8}>
                                        <Skeleton height={20}/>
                                        <Skeleton height={20}/>
                                        <Skeleton height={20}/>
                                        <Skeleton height={20}/>
                                    </Flex>
                                ) : (
                                    warehousesData && warehousesData.length > 0 ? (
                                        <Controller
                                            name="warehouses"
                                            control={methods.control}
                                            render={({field}) => (
                                                <Checkbox.Group
                                                    value={field.value.map(String)} // Преобразуем number[] в string[]
                                                    onChange={(values) => field.onChange(values.map(Number))} // Преобразуем string[] в number[]
                                                >
                                                    {warehousesData.map((warehouse: Warehouse) => (
                                                        <Flex align="center" className={classes.warehouseRow}
                                                              key={warehouse.id}>
                                                            <Checkbox
                                                                value={warehouse.id.toString()}
                                                                label={warehouse.address}
                                                                style={{flexGrow: 1}}
                                                            />
                                                            <Flex gap={24}>
                                                                <ActionIcon
                                                                    variant="white"
                                                                    color="rgba(0, 0, 0, 1)"
                                                                    aria-label="Редактировать"
                                                                    onClick={() => handleEditWarehouse(warehouse.id)}
                                                                >
                                                                    <IconPencilMinus
                                                                        style={{width: '70%', height: '70%'}}
                                                                        stroke={1.5}/>
                                                                </ActionIcon>
                                                                <ActionIcon
                                                                    variant="white"
                                                                    color="rgba(0, 0, 0, 1)"
                                                                    aria-label="Удалить"
                                                                    onClick={() => handleOpenDeleteModal(warehouse.id)}
                                                                >
                                                                    <IconTrash style={{width: '70%', height: '70%'}}
                                                                               stroke={1.5}/>
                                                                </ActionIcon>
                                                            </Flex>
                                                        </Flex>
                                                    ))}
                                                </Checkbox.Group>
                                            )}
                                        />
                                    ) : (
                                        <Box className={classes.notFoundWarehouse} mt={16}>
                                            <Text>{trans('warehouses', 'no_warehouses')}</Text>
                                        </Box>
                                    )
                                )}

                                {!isFastCreateOpen && (
                                    <Button
                                        variant="outline"
                                        fullWidth
                                        leftSection={<IconCirclePlusFilled size={16}/>}
                                        onClick={handleAddWarehouseClick}
                                        mt={16}>
                                        {trans('warehouses', 'buttons.add')}
                                    </Button>
                                )}

                            </Box>

                        </form>
                    </FormProvider>
                    <Box className={classes.content} style={{flexGrow: 1}}>
                        {isFastCreateOpen && (
                            <FastCreateWarehouse
                                onClose={() => {
                                    setIsFastCreateOpen(false);
                                }}
                                mode={warehouseEditMode}
                                initialData={editingWarehouseData}
                            />
                        )}
                    </Box>
                    <Divider/>

                    <Box className={classes.content}>
                        {mode === 'edit' && (
                            <Button fullWidth color="#DD4C1E" mb={16} onClick={handleDelete}>{trans('buttons', 'delete')}</Button>
                        )}
                        <Flex gap={16}>
                            <Button fullWidth onClick={handleClose}>
                                {trans('buttons', 'cancel')}
                            </Button>
                            <Button
                                fullWidth
                                onClick={onSubmit}
                                loading={isCreating || isUpdating}
                            >
                                {mode === 'add' ? trans('api', 'form.buttons.add') : trans('buttons', 'save')}
                            </Button>
                        </Flex>
                    </Box>

                </Flex>
            </Drawer>

            <Modal
                opened={modalOpened}
                onClose={cancelDelete}
                title="Подтверждение удаления"
            >
                <Text>Вы действительно хотите удалить этот APIBot?</Text>
                <Flex justify="flex-end" mt="md">
                    <Button variant="outline" onClick={cancelDelete} mr="sm">
                        {trans('buttons', 'cancel')}
                    </Button>
                    <Button color="red" onClick={confirmDelete} loading={isDeleting}>
                        {trans('buttons', 'delete')}
                    </Button>
                </Flex>
            </Modal>

            <Modal
                opened={deleteModalOpened}
                onClose={handleCancelDelete}
                title="Подтверждение удаления склада"
            >
                <Text>Вы действительно хотите удалить этот склад?</Text>
                <Flex justify="flex-end" mt="md">
                    <Button variant="outline" onClick={handleCancelDelete} mr="sm">
                        {trans('buttons', 'cancel')}
                    </Button>
                    <Button color="red" onClick={handleConfirmDelete}>
                        {trans('buttons', 'delete')}
                    </Button>
                </Flex>
            </Modal>
        </>
    )
}

export default ApiBotForm;