import {Button} from "@mantine/core";
import classes from "./btn.module.css";

interface Props {
    children: React.ReactNode,
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"],
    fullWidth?: boolean,
    onclick?: () => void;
}

const SecondaryBtn = ({children, onclick , type, fullWidth}: Props) => {
    return (
        <Button fullWidth={fullWidth} type={type} className={classes.secondaryBtn} onClick={onclick}>{children}</Button>
    )
}

export default SecondaryBtn;