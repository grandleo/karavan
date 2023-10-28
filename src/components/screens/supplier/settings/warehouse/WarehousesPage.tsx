'use client'

import {Controller, useForm} from "react-hook-form";
import {Box, Flex, Stepper, TextInput} from "@mantine/core";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import classes from "@/components/screens/auth/auth.module.css";
import {useState} from "react";
import {useCreateWarehouseMutation} from "@/store/api/warehouses.api";
import SecondaryBtn from "@/components/ui/btn/secondaryBtn";
import WarehousesContacts from "@/components/screens/supplier/settings/warehouse/components/WarehouseContacts";
import WorkSchedule from "@/components/screens/supplier/settings/warehouse/components/WorkSchedule";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useRouter} from "next/navigation";
import PageHeader from "@/components/ui/page/pageHeader";
import PageWrapper from "@/components/ui/page/pageWrapper";
import PageContent from "@/components/ui/page/pageContent";

export const WarehousesPage = () => {
    const router = useRouter();
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const [createWarehouse] = useCreateWarehouseMutation();

    const {
        handleSubmit,
        setValue,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            city: '',
            address: '',
            work_schedule: [],
            warehouses_contacts: []
        }
    });

    const onSubmit = (data: any) => {
        createWarehouse(data).unwrap()
            .then((payload) => {
                reset();
                SuccessNotifications(payload)
                const newPage = process.env.NEXT_PUBLIC_URL+'/supplier/'+payload?.warehouse_id
                router.push(newPage);
            })
            .catch((error) => ErrorNotifications(error))
    }

    return (
        <>
            <PageWrapper>
                <PageHeader title="Создание склада"/>
                <PageContent>
                    <Box style={{width: '500px'}}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <StepsHeaders active={active}/>

                            <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
                                <Stepper.Step >
                                    <Controller
                                        name="city"
                                        control={control}
                                        render={({ field }) => (
                                            <TextInput
                                                label="Город"
                                                onChange={(event) => {
                                                    field.onChange(event.currentTarget.value);
                                                }}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="address"
                                        control={control}
                                        render={({ field }) => (
                                            <TextInput
                                                label="Улица"
                                                onChange={(event) => {
                                                    field.onChange(event.currentTarget.value);
                                                }}
                                            />
                                        )}
                                    />
                                </Stepper.Step>
                                <Stepper.Step>
                                    <WorkSchedule setValue={setValue}/>
                                </Stepper.Step>
                                <Stepper.Step >
                                    <WarehousesContacts setValue={setValue}/>
                                </Stepper.Step>
                            </Stepper>

                            <Flex gap={24} style={{marginTop: '40px'}}>
                                {active > 0 && (
                                    <>
                                        <SecondaryBtn fullWidth onclick={prevStep}>Назад</SecondaryBtn>
                                    </>

                                )}
                                {active < 2 && (
                                    <>
                                        <PrimaryBtn fullWidth onclick={nextStep}>Далее</PrimaryBtn>
                                    </>
                                )}

                                {active === 2 && (
                                    <PrimaryBtn fullWidth type="submit" >Добавить</PrimaryBtn>
                                )}
                            </Flex>
                        </form>
                    </Box>
                </PageContent>
            </PageWrapper>
        </>
    )
}

const StepsHeaders = ({active}: any) => {
    const stepsHeaders = [
        'Адрес склада',
        'Укажите график работы',
        'Укажите контакты склада',
    ];

    return (
        <Flex justify="space-between" align="center">
            <Box className={classes.headerStep}>
                {stepsHeaders[active]}
            </Box>
            <Box>
                Шаг {active+1} из {stepsHeaders.length}
            </Box>
        </Flex>
    )
}