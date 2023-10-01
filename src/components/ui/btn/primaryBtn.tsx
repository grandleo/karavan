import {Button} from "@mantine/core";
import classes from "./btn.module.css";

interface Props {
    children: React.ReactNode,
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"],
    fullWidth?: boolean,
    loading?: boolean,
    onclick?: () => void;
}

const PrimaryBtn = ({children, onclick , type, fullWidth, loading}: Props) => {
    return (
        <Button fullWidth={fullWidth} loading={loading} type={type} className={classes.primaryBtn} onClick={onclick}>{children}</Button>
    )
}

export default PrimaryBtn;