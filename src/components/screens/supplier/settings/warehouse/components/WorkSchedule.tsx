import {ChangeEvent, useEffect, useRef, useState} from "react";
import {IconClock} from "@tabler/icons-react";
import {TimeInput} from "@mantine/dates";
import {ActionIcon, Box, Checkbox, LoadingOverlay, rem} from "@mantine/core";
import classes from "./warehouse.module.css";
import {useGetDaysOfWeekQuery} from "@/store/api/warehouses.api";

const defaultContacts = [
    {
        'day_id': 1,
        'name': 'Понедельник',
        'define': '',
        'active': 0,
        'start': '',
        'end': ''
    },
    {
        'day': 'Вторник',
        'define': '',
        'active': 0,
        'start': '',
        'end': ''
    },
    {
        'day': 'Среда',
        'define': '',
        'active': 0,
        'start': '',
        'end': ''
    },
    {
        'day': 'Четверг',
        'define': '',
        'active': 0,
        'start': '',
        'end': ''
    },
    {
        'day': 'Пятница',
        'define': '',
        'active': 0,
        'start': '',
        'end': ''
    },
    {
        'day': 'Суббота',
        'define': '',
        'active': 0,
        'start': '',
        'end': ''
    },
    {
        'day': 'Воскресенье',
        'define': '',
        'active': 0,
        'start': '',
        'end': ''
    }
];

interface IDayOfWeek{
    day_id: number;
    name: string;
    active: number;
    start: string;
    end: string;
}

const WorkSchedule = ({setValue}: any) => {
    const [schedule, setSchedule] = useState<IDayOfWeek[]>([]);

    const {data: daysOfWeek = [], isLoading} = useGetDaysOfWeekQuery('');

    const handleCheckboxChange = (index: number) => {
        const updatedSchedule = [...schedule];
        updatedSchedule[index] = {
            ...updatedSchedule[index],
            active: updatedSchedule[index].active === 0 ? 1 : 0,
        };
        setSchedule(updatedSchedule);
    };

    useEffect(() => {
        if(daysOfWeek.length > 0) setSchedule(daysOfWeek)
    }, [daysOfWeek]);

    useEffect(() => {
        setValue('work_schedule', schedule)
    }, [schedule]);

    const handleTimeChange = (event: ChangeEvent<HTMLInputElement>, field: string, index: number) => {
        const newValue = event.target.value;
        setSchedule(prevSchedule => {
            return prevSchedule.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        [field]: newValue
                    };
                }
                return item;
            });
        });
    }

    return (
        <>
            <Box pos="relative" className={classes.weekday}>
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                {schedule.map((day, index) => {
                    return (
                        <Box key={index} className={classes.workSchedule}>
                            <Box className={classes.workScheduleDay}>
                                <Checkbox
                                    checked={day.active === 1}
                                    label={day.name}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            </Box>
                            <OpeningTime active={day.active} index={index} field="start" handleTimeChange={handleTimeChange}/>
                            <OpeningTime active={day.active} index={index} field="end" handleTimeChange={handleTimeChange}/>
                        </Box>
                    )
                })}
            </Box>
        </>
    )
}

interface OpeningTimeProps {
    index: number;
    active: number;
    field: string;
    handleTimeChange: (event: ChangeEvent<HTMLInputElement>, field: string, index: number) => void;
}

const OpeningTime = ({active, field, index, handleTimeChange} : OpeningTimeProps) => {
    const ref = useRef<HTMLInputElement>(null);

    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => {
            if (active === 1) {
                ref.current?.showPicker();
            }
        }}>
            <IconClock style={{width: rem(16), height: rem(16)}} stroke={1.5}/>
        </ActionIcon>
    );

    return (
        <TimeInput disabled={active === 0} ref={ref} rightSection={pickerControl} onChange={(event) => handleTimeChange(event, field, index)}/>
    )
}

export default WorkSchedule;