import {ReactNode} from "react";

interface EmptyDataTypes{
    height?: string | number;
    text: string;
    children?(): ReactNode;
}