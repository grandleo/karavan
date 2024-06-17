import {Control, FieldErrors} from "react-hook-form";

interface EmailFieldProps {
    control: Control<any>;
    context: 'profile' | 'warehouse' | 'auth';
    name?: string;
}

interface PhoneFieldProps {
    control: Control<any>;
    name?: string;
}

interface NameFieldProps{
    control: Control<any>;
    name?: string;
}

interface SimpleCompanyNameProps {
    control: Control<any>;
}

interface PinCodeProps {
    control: Control<any>;
    errors: FieldErrors;
}