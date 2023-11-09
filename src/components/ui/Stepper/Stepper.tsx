import React, {ReactNode, useMemo, useState} from "react";
import {Box, Text} from "@mantine/core";
import classes from "./Stepper.module.css";

interface HeaderProps {
    currentStep: number;
    steps: string[];
}

const Header = ({steps, currentStep}: HeaderProps) => {
    const totalSteps = steps.length;

    return (
        <>
            <Box className={classes.header}>
                <Text className={classes.heading}>{steps[currentStep]}</Text>
                <Text className={classes.stepOf}>Шаг {currentStep + 1} из {totalSteps}</Text>
            </Box>

            <Box className={classes.separators}>
                {steps.map((step, index) => {
                    return (
                        <Box key={index} className={`${classes.separator} ${currentStep >= index && classes.separatorActive}`}></Box>
                    )
                })}
            </Box>
        </>
    )
}

interface StepProps {
    children: React.ReactNode;
}

const Step = ({children}: StepProps) => {
    return (
        <>
            {children}
        </>
    )
}

interface StepperProps {
    active: number;
    steps: string[];
    children: ReactNode;
}

const Stepper = ({steps, active, children}: StepperProps) => {

    return (
        <>
            <Header steps={steps} currentStep={active}/>
            {steps.length == React.Children.toArray(children).length ? (
                React.cloneElement(React.Children.toArray(children)[active] as React.ReactElement)
            ) : (
                <Box>Кол-во этапов и заголовков не соответствуют</Box>
            )}
        </>
    )
}

Stepper.Step = Step;

export default Stepper;