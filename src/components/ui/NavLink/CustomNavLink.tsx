import {ReactNode} from "react";
import {NavLink} from "@mantine/core";
import { IconChevronDown } from '@tabler/icons-react';

interface CustomNavLinkProps {
    to: string;
    children: ReactNode;
}

const CustomNavLink = ({ to, children }: CustomNavLinkProps) => {
    return (
        <NavLink href={to}>
            <IconChevronDown style={{ marginRight: '6px' }} />
            {children}
            <IconChevronDown style={{ marginLeft: '6px' }} />
            {/* или */}
            {/* <ChevronDownIcon style={{ marginRight: '6px' }} /> */}
        </NavLink>
    );
};

export default CustomNavLink;