import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Box, Select, TextInput} from "@mantine/core";
import {useRouter} from "next/navigation";
import {useCreateWarehouseMutation, useGetCitiesWarehouseQuery} from "@/store/api/warehouses.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import Stepper from "@/components/ui/Stepper/Stepper";
import ButtonSecondary from "@/components/ui/Buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/Buttons/ButtonPrimary";
import WorkSchedule from "@/components/features/Warehouses/WorkSchedule";
import WarehousesContacts from "@/components/features/Warehouses/WarehouseContacts";
import classes from "./warehouse.module.css";
import _ from "lodash";

const AddWarehouse = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const steps = ["Адрес доставки", "Укажите график работы", "Укажите контакты склада"];
    const totalSteps = steps.length;

    const [createWarehouse] = useCreateWarehouseMutation();
    const {data: cities, isLoading} = useGetCitiesWarehouseQuery('');

    const {
        handleSubmit,
        setValue,
        control,
        reset,
        formState: { errors },
        trigger
    } = useForm({
        defaultValues: {
            city_id: '',
            address: '',
            work_schedule: [],
            warehouses_contacts: []
        }
    });

    const validateWorkSchedule = (value) => {
        const filteredData = _.filter(value, { 'active': 1 })

        return filteredData.length > 0 ? true : "График работы обязателен, должно быть хотя бы 1 рабочий день";
    };

    const validateWarehousesContacts = (value) => {
        const filteredUsers = _.filter(value, user => !_.isEmpty(user.fio) && !_.isEmpty(user.phone) && !_.isEmpty(user.email));

        return filteredUsers.length > 0 ? true : "Контактное лицо должно быть заполнено включая: ФИО, Телефон, Email";
    };


    const onNextStep = async () => {

        let isValid = false;

        switch (currentStep) {
            case 0:
                isValid = await trigger(["city_id", "address"]);
                break;
            case 1:
                isValid = await trigger(["work_schedule"]);
                break;
            default:
                isValid = true;
        }

        if (isValid) {
            if (currentStep < totalSteps - 1) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const onSubmit = (data: any) => {
        createWarehouse(data).unwrap()
            .then((payload) => {
                reset();
                SuccessNotifications(payload)
                const newPage = process.env.NEXT_PUBLIC_URL + '/' + payload?.role + '/' + payload?.warehouse_id;
                router.push(newPage);
            })
            .catch((error) => ErrorNotifications(error))
    }

    return (
        <>
            <Box className={classes.warehouseAddForm}>
                <form onSubmit={handleSubmit(onSubmit)}>
                {/*<form onSubmit={handleFormSubmit}>*/}
                    <Stepper steps={steps} active={currentStep}>
                        <Stepper.Step>
                            <Controller
                                name="city_id"
                                control={control}
                                rules={{
                                    required: "Город или область обязательно нужно выбрать",
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Select
                                        label="Город или область"
                                        placeholder="Выберите"
                                        data={cities ? cities : []}
                                        clearable
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={(value) => {
                                            onChange(value);
                                        }}
                                        error={errors?.city_id?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="address"
                                control={control}
                                rules={{
                                    required: "Адрес обязателен",
                                }}
                                render={({ field }) => (
                                    <TextInput
                                        label="Улица"
                                        onChange={(event) => {
                                            field.onChange(event.currentTarget.value);
                                        }}
                                        error={errors?.address?.message}
                                    />
                                )}
                            />
                        </Stepper.Step>
                        <Stepper.Step>
                            <Controller name="work_schedule"
                                        control={control}
                                        rules={{
                                            validate: validateWorkSchedule
                                        }}
                                        render={() => (
                                            <WorkSchedule setValue={setValue} error={errors?.work_schedule?.message}/>
                                        )}
                            />
                        </Stepper.Step>
                        <Stepper.Step>
                            <Controller name="warehouses_contacts"
                                        control={control}
                                        rules={{
                                            validate: validateWarehousesContacts
                                        }}
                                        render={() => (
                                            <WarehousesContacts setValue={setValue} error={errors?.warehouses_contacts?.message}/>
                                        )}
                            />
                        </Stepper.Step>
                    </Stepper>
                    <Box className={classes.warehouseButtons}>
                        {currentStep !== 0 && <ButtonSecondary type="button" fullWidth={true} disabled={currentStep === 0} onclick={previousStep}>Назад</ButtonSecondary>}
                        {totalSteps - 1 > currentStep && <ButtonPrimary type="button" fullWidth={true} onclick={onNextStep}>Далее</ButtonPrimary>}
                        {totalSteps - 1 === currentStep && <ButtonPrimary type="submit" fullWidth={true}>Добавить</ButtonPrimary>}
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default AddWarehouse;