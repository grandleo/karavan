import {useRef, useState} from "react";
import {useCreateWarehouseMutation} from "@/store/api/warehouses.api";
import {Controller, useForm} from "react-hook-form";
import {ActionIcon, Box, Drawer, Flex, NavLink, rem, Stepper, TextInput} from "@mantine/core";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import classes from "@/components/screens/auth/auth.module.css";
import {IconClock} from "@tabler/icons-react";
import {TimeInput} from "@mantine/dates";
import {useDisclosure} from "@mantine/hooks";

const AddWarehouses = () => {
    const [active, setActive] = useState(0);
    const [opened, { open, close }] = useDisclosure(false);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const [createWarehouse] = useCreateWarehouseMutation();

    const {
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            city: '',
            address: '',
        }
    });

    const onSubmit = (data: any) => {
        createWarehouse(data)
    }

    return (
        <>

            <NavLink label="Добавить склад" onClick={open}/>

            <Drawer opened={opened} onClose={close} title="Authentication">
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
                            {/*<Stepper.Step>*/}
                            {/*    <Checkbox*/}
                            {/*        defaultChecked*/}
                            {/*        label="Понедельник"*/}
                            {/*    />*/}
                            {/*   <OpeningTime/>*/}
                            {/*   <OpeningTime/>*/}
                            {/*</Stepper.Step>*/}
                            {/*<Stepper.Step >*/}
                            {/*    <TextInput*/}
                            {/*        label="ФИО"*/}
                            {/*    />*/}
                            {/*    <TextInput*/}
                            {/*        label="Телефон"*/}
                            {/*    />*/}
                            {/*    <TextInput*/}
                            {/*        label="Email"*/}
                            {/*    />*/}
                            {/*</Stepper.Step>*/}
                        </Stepper>

                        <Flex gap={24} style={{marginTop: '40px'}}>
                            {/*{active > 0 && (*/}
                            {/*    <>*/}
                            {/*        <SecondaryBtn fullWidth onclick={prevStep}>Назад</SecondaryBtn>*/}
                            {/*    </>*/}

                            {/*)}*/}
                            {/*{active < 2 && (*/}
                            {/*    <>*/}
                            {/*        <PrimaryBtn fullWidth onclick={nextStep}>Далее</PrimaryBtn>*/}
                            {/*    </>*/}
                            {/*)}*/}

                            {/*{active === 2 && (*/}
                            <PrimaryBtn fullWidth type="submit" >Добавить</PrimaryBtn>
                            {/*)}*/}
                        </Flex>
                    </form>
            </Drawer>
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

export default AddWarehouses;