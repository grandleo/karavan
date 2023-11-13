import {Button} from "@mantine/core";
import {ButtonProps} from "@/components/ui/Buttons/type";
import classes from "@/components/ui/Buttons/Button.module.css";

const ButtonMinimal = ({children, onclick, type, fullWidth, loading, disabled}: ButtonProps) => {
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

export default ButtonMinimal;