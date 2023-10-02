'use client'

import {useState} from "react";
import {Controller, Form, useForm} from "react-hook-form";
import Link from "next/link";
import {REGISTRATION_URL} from "@/config/apiRoutes";
import {Flex, Stepper, TextInput, Text, Box, Input} from "@mantine/core";
import SecondaryBtn from "@/components/ui/btn/secondaryBtn";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import TypeUserBtn from "@/components/ui/form/typeUserBtn";
import classes from "./auth.module.css";
import NameAutocomplete from "@/components/ui/form/nameAutoComplete";
import EmailAutocomplete from "@/components/ui/form/emailAutoComplete";
import CompanyAutocomplete from "@/components/ui/form/companyAutoComplete";
import {http} from "@/config/http";
import {useRouter} from "next/navigation";
import FormConditions from "@/components/ui/form/formConditions";
import {IMaskInput} from "react-imask";
import {IconInfoCircle} from "@tabler/icons-react";

const RegistrationPage = () => {
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const {
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            fio: [],
            position: '',
            email: '',
            phone: '',
            inn: '',
            company: [],
            short_with_opf: '',
            id_md: '',
            licenses: '',
            city: '',
            role: 'supplier'
        }
    });

    const onSubmit = (data: any) => {
        setLoading(true)

        http.post(REGISTRATION_URL, data)
            .then(function (response) {
                // console.log(response)
                router.push('/login')
                setLoading(false)
            })
            .catch(function (error) {
                setLoading(false);
                console.log(error)
            });
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <StepsHeaders active={active}/>

                <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false} styles={{
                    stepBody: {
                        display: 'none',
                    },

                    step: {
                        padding: 0,
                    },

                    separator: {
                        marginLeft: '12px',
                        marginRight: '12px',
                        height: '4px',
                    },
                }}>
                    <Stepper.Step label="Расскажите о себе">

                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <NameAutocomplete field={field} setField={setValue}/>
                            )}
                        />

                        <Controller
                            name="position"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    label="Должность"
                                    placeholder="Укажите вашу должность"
                                    onChange={(event) => {
                                        field.onChange(event.currentTarget.value);
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <EmailAutocomplete field={field} errors={errors}/>
                            )}
                        />

                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <Input.Label>Телефон</Input.Label>
                                    <Input  component={IMaskInput}
                                            mask="(000) 000-00-00"
                                            placeholder="Укажите ваш телефон"
                                            onChange={(event) => {
                                                field.onChange(event.currentTarget.value);
                                            }}
                                            leftSection="+7"
                                    />
                                </>

                                // <TextInput
                                //     label="Телефон"
                                //     placeholder="Укажите ваш телефон"
                                //     component={IMaskInput}
                                //     onChange={(event) => {
                                //         field.onChange(event.currentTarget.value);
                                //     }}
                                // />
                            )}
                        />
                    </Stepper.Step>
                    <Stepper.Step >
                        <Controller
                            name="inn"
                            control={control}
                            render={({ field }) => (
                                <CompanyAutocomplete field={field} setField={setValue}/>
                            )}
                        />

                        <Flex gap={8}>
                            <Box>
                                <IconInfoCircle color="#2997A3"/>
                            </Box>
                            <Box>
                                <Text>Введите ИНН, мы автоматически определим реквизиты компании</Text>
                            </Box>
                        </Flex>
                    </Stepper.Step>
                    <Stepper.Step >
                        <Controller
                            name="short_with_opf"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    label="Краткое наименование компании"
                                    disabled
                                    value={field.value}
                                    onChange={(event) => {
                                        field.onChange(event.currentTarget.value);
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="id_md"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    label="Идентификатор МД"
                                    disabled
                                    onChange={(event) => {
                                        field.onChange(event.currentTarget.value);
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="licenses"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    label="Лицензия на фарм. деятельность"
                                    disabled
                                    onChange={(event) => {
                                        field.onChange(event.currentTarget.value);
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    label="Город"
                                    placeholder="Введите город"
                                    onChange={(event) => {
                                        field.onChange(event.currentTarget.value);
                                    }}
                                />
                            )}
                        />
                    </Stepper.Step>
                    <Stepper.Step >

                        <TypeUserBtn setField={setValue}/>

                    </Stepper.Step>

                </Stepper>

                <Flex gap={24} style={{marginTop: '40px'}}>
                    {active > 0 && (
                        <>
                            <SecondaryBtn fullWidth onclick={prevStep}>Назад</SecondaryBtn>
                        </>

                    )}
                    {active < 3 && (
                        <>
                            <PrimaryBtn fullWidth onclick={nextStep}>Далее</PrimaryBtn>
                        </>
                    )}

                    {active === 3 && (
                        <PrimaryBtn fullWidth type="submit" loading={loading}>Зарегистрироваться</PrimaryBtn>
                    )}
                </Flex>

                {active === 0 && (
                    <>
                        <FormConditions textMore={true}/>
                    </>
                )}

            </form>

        </>
    );
}

const StepsHeaders = ({active}: any) => {
    const stepsHeaders = [
        'Расскажите о себе',
        'Расскажите о компании',
        'Проверьте информацию',
        'Тип личного кабинета'
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

export default RegistrationPage;