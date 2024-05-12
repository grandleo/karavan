import {useEffect, useState} from "react";
import {Box, Divider, Flex, Tooltip} from "@mantine/core";
import {IconClockQuestion} from "@tabler/icons-react";
import classes from "./style.module.css";

const Timer = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const secondsLeft = 59 - now.getSeconds();
            setMinutes(Math.floor(secondsLeft / 60));
            setSeconds(secondsLeft % 60);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <Flex className={classes.timer} gap="8px" justify="center" align="center" direction="row" wrap="nowrap">
            <Flex className={classes.time} gap="4px" align="center">
                <Box>{formattedTime.substring(0, 2)}</Box>
                <Box className={classes.separator}>:</Box>
                <Box>{formattedTime.substring(3)}</Box>
            </Flex>
            <Divider orientation="vertical"/>
            <Box>
                <Tooltip label="Время до перерасчета рейтинга цен" position="bottom" multiline w={200}>
                    <IconClockQuestion size={16} color="#4DA8B2"/>
                </Tooltip>
            </Box>
        </Flex>
    );
}

export default Timer;