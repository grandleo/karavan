
import {Button} from "@mantine/core";
import {ButtonProps} from "@/components/ui/Buttons/type";
import classes from "./Button.module.css";

const ButtonPrimary = ({children, onclick, type, fullWidth, loading, disabled}: ButtonProps) => {
    return (
        <Button
            className={classes.buttonPrimary}
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

export default ButtonPrimary;