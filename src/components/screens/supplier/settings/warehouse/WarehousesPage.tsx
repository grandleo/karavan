'use client'

import {Controller, useForm} from "react-hook-form";
import {Box, Flex, Select, TextInput} from "@mantine/core";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import classes from "@/components/screens/auth/auth.module.css";
import React, {useState} from "react";
import {useCreateWarehouseMutation, useGetCitiesWarehouseQuery} from "@/store/api/warehouses.api";
import SecondaryBtn from "@/components/ui/btn/secondaryBtn";
import WarehousesContacts from "@/components/screens/supplier/settings/warehouse/components/WarehouseContacts";
import WorkSchedule from "@/components/screens/supplier/settings/warehouse/components/WorkSchedule";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useRouter} from "next/navigation";
import PageHeader from "@/components/ui/page/pageHeader";
import PageWrapper from "@/components/ui/page/pageWrapper";
import PageContent from "@/components/ui/page/pageContent";
import Stepper from "@/components/ui/Stepper/Stepper";
import ButtonSecondary from "@/components/ui/Buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/Buttons/ButtonPrimary";
import AddWarehouse from "@/components/features/Warehouses/AddWarehouse";

export const WarehousesPage = () => {
    // const router = useRouter();
    // const [currentStep, setCurrentStep] = useState(0);
    // const steps = ["Адрес доставки", "Укажите график работы", "Укажите контакты склада"];
    // const totalSteps = steps.length;
    //
    // // const [active, setActive] = useState(0);
    // // const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    // // const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    //
    // const [createWarehouse] = useCreateWarehouseMutation();
    // const {data: cities, isLoading} = useGetCitiesWarehouseQuery('');
    //
    // const {
    //     handleSubmit,
    //     setValue,
    //     control,
    //     reset,
    //     formState: { errors },
    //     trigger
    // } = useForm({
    //     defaultValues: {
    //         city_id: '',
    //         address: '',
    //         work_schedule: [],
    //         warehouses_contacts: []
    //     }
    // });
    //
    // const onNextStep = async () => {
    //
    //     let isValid = false;
    //
    //     switch (currentStep) {
    //         case 0:
    //             isValid = true;
    //             // isValid = await trigger(["name", "position", "email", "phone"]);
    //             break;
    //         case 1:
    //             isValid = true;
    //             // isValid = await trigger(["inn"]);
    //             break;
    //         case 2:
    //             isValid = true;
    //             // isValid = await trigger(["city"]);
    //             break;
    //         case 3:
    //             isValid = true;
    //             break;
    //         default:
    //             isValid = true;
    //     }
    //
    //     if (isValid) {
    //         if (currentStep < totalSteps - 1) {
    //             setCurrentStep(currentStep + 1);
    //         }
    //     }
    // };
    //
    // const previousStep = () => {
    //     if (currentStep > 0) {
    //         setCurrentStep(currentStep - 1);
    //     }
    // };
    //
    // const onSubmit = (data: any) => {
    //     createWarehouse(data).unwrap()
    //         .then((payload) => {
    //             reset();
    //             SuccessNotifications(payload)
    //             const newPage = process.env.NEXT_PUBLIC_URL+'/client/'+payload?.warehouse_id
    //             router.push(newPage);
    //         })
    //         .catch((error) => ErrorNotifications(error))
    // }

    return (
        <>
            <PageWrapper>
                <PageHeader title="Адрес точки доставки"/>
                <PageContent>
                    <AddWarehouse/>
                    {/*<Box style={{width: '500px'}}>*/}
                        {/*<form onSubmit={handleSubmit(onSubmit)}>*/}

                        {/*    <Stepper steps={steps} active={currentStep}>*/}
                        {/*        <Stepper.Step>*/}
                        {/*            <Controller*/}
                        {/*                name="city_id"*/}
                        {/*                control={control}*/}
                        {/*                rules={{*/}
                        {/*                    required: "Город или область обязательно нужно выбрать",*/}
                        {/*                }}*/}
                        {/*                render={({ field: { onChange, onBlur, value } }) => (*/}
                        {/*                    <Select*/}
                        {/*                        label="Город или область"*/}
                        {/*                        placeholder="Выберите"*/}
                        {/*                        data={cities ? cities : []}*/}
                        {/*                        clearable*/}
                        {/*                        value={value}*/}
                        {/*                        onBlur={onBlur}*/}
                        {/*                        onChange={(value) => {*/}
                        {/*                            onChange(value);*/}
                        {/*                        }}*/}
                        {/*                    />*/}
                        {/*                )}*/}
                        {/*            />*/}
                        {/*            <Controller*/}
                        {/*                name="address"*/}
                        {/*                control={control}*/}
                        {/*                render={({ field }) => (*/}
                        {/*                    <TextInput*/}
                        {/*                        label="Улица"*/}
                        {/*                        onChange={(event) => {*/}
                        {/*                            field.onChange(event.currentTarget.value);*/}
                        {/*                        }}*/}
                        {/*                    />*/}
                        {/*                )}*/}
                        {/*            />*/}
                        {/*        </Stepper.Step>*/}
                        {/*        <Stepper.Step>*/}
                        {/*            <WorkSchedule setValue={setValue}/>*/}
                        {/*        </Stepper.Step>*/}
                        {/*        <Stepper.Step>*/}
                        {/*            <WarehousesContacts setValue={setValue}/>*/}
                        {/*        </Stepper.Step>*/}
                        {/*    </Stepper>*/}

                        {/*    {currentStep !== 0 && <ButtonSecondary  fullWidth={true} disabled={currentStep === 0} onclick={previousStep}>Назад</ButtonSecondary>}*/}
                        {/*    {totalSteps - 1 === currentStep ? <ButtonPrimary fullWidth={true}>Зарегистрироваться</ButtonPrimary> : <ButtonPrimary fullWidth={true} onclick={onNextStep}>Далее</ButtonPrimary>}*/}

                            {/*<StepsHeaders active={active}/>*/}

                            {/*<Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>*/}
                            {/*    <Stepper.Step >*/}
                            {/*        <Controller*/}
                            {/*            name="city_id"*/}
                            {/*            control={control}*/}
                            {/*            rules={{*/}
                            {/*                required: "Город или область обязательно нужно выбрать",*/}
                            {/*            }}*/}
                            {/*            render={({ field: { onChange, onBlur, value } }) => (*/}
                            {/*                <Select*/}
                            {/*                    label="Город или область"*/}
                            {/*                    placeholder="Выберите"*/}
                            {/*                    data={cities ? cities : []}*/}
                            {/*                    clearable*/}
                            {/*                    value={value}*/}
                            {/*                    onBlur={onBlur}*/}
                            {/*                    onChange={(value) => {*/}
                            {/*                        onChange(value);*/}
                            {/*                    }}*/}
                            {/*                />*/}
                            {/*            )}*/}
                            {/*        />*/}
                            {/*        <Controller*/}
                            {/*            name="address"*/}
                            {/*            control={control}*/}
                            {/*            render={({ field }) => (*/}
                            {/*                <TextInput*/}
                            {/*                    label="Улица"*/}
                            {/*                    onChange={(event) => {*/}
                            {/*                        field.onChange(event.currentTarget.value);*/}
                            {/*                    }}*/}
                            {/*                />*/}
                            {/*            )}*/}
                            {/*        />*/}
                            {/*    </Stepper.Step>*/}
                            {/*    <Stepper.Step>*/}
                            {/*        <WorkSchedule setValue={setValue}/>*/}
                            {/*    </Stepper.Step>*/}
                            {/*    <Stepper.Step >*/}
                            {/*        <WarehousesContacts setValue={setValue}/>*/}
                            {/*    </Stepper.Step>*/}
                            {/*</Stepper>*/}

                            {/*<Flex gap={24} style={{marginTop: '40px'}}>*/}
                            {/*    {active > 0 && (*/}
                            {/*        <>*/}
                            {/*            <SecondaryBtn fullWidth onclick={prevStep}>Назад</SecondaryBtn>*/}
                            {/*        </>*/}

                            {/*    )}*/}
                            {/*    {active < 2 && (*/}
                            {/*        <>*/}
                            {/*            <PrimaryBtn fullWidth onclick={nextStep}>Далее</PrimaryBtn>*/}
                            {/*        </>*/}
                            {/*    )}*/}

                            {/*    {active === 2 && (*/}
                            {/*        <PrimaryBtn fullWidth type="submit" >Добавить</PrimaryBtn>*/}
                            {/*    )}*/}
                            {/*</Flex>*/}
                        {/*</form>*/}
                    {/*</Box>*/}
                </PageContent>
            </PageWrapper>
        </>
    )
}