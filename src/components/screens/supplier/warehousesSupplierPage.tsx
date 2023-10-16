'use client'

import {ActionIcon, Box, Checkbox, Flex, rem, Stepper, TextInput} from "@mantine/core";
import {useRef, useState} from "react";
import classes from "@/components/screens/auth/auth.module.css";
import SecondaryBtn from "@/components/ui/btn/secondaryBtn";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import {TimeInput} from "@mantine/dates";
import {IconClock} from "@tabler/icons-react";

const WarehousesSupplierPage = () => {
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <Box style={{width: '500px'}}>

            <StepsHeaders active={active}/>

            <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
                <Stepper.Step >
                    <TextInput
                        label="Город"
                    />
                    <TextInput
                        label="Улица"
                    />
                </Stepper.Step>
                <Stepper.Step>
                    <Checkbox
                        defaultChecked
                        label="Понедельник"
                    />
                   <OpeningTime/>
                   <OpeningTime/>
                </Stepper.Step>
                <Stepper.Step >
                    <TextInput
                        label="ФИО"
                    />
                    <TextInput
                        label="Телефон"
                    />
                    <TextInput
                        label="Email"
                    />
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

            </Box>
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

const OpeningTime = () => {
    const ref = useRef<HTMLInputElement>(null);

    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
    );

    return (
        <TimeInput ref={ref} rightSection={pickerControl} />
    )
}

export default WarehousesSupplierPage;