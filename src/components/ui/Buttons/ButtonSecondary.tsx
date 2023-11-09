
import {Button} from "@mantine/core";
import {ButtonProps} from "@/components/ui/Buttons/type";
import classes from "./Button.module.css";

const ButtonSecondary = ({children, onclick , type, fullWidth, loading, disabled}: ButtonProps) => {
    return (
        <Button
            className={classes.buttonSecondary}
            fullWidth={fullWidth}
            loading={loading}
            disabled={disabled}
            type={type}
            onClick={onclick}
        >
            {children}
        </Button>
    )
}

export default ButtonSecondary;