import {ButtonHTMLAttributes, ReactNode} from "react";

export interface ButtonProps {
    children: ReactNode,
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"],
    fullWidth?: boolean,
    loading?: boolean,
    disabled?: boolean;
    onclick?: () => void;
}