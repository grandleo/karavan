import {ReactNode} from "react";
import {ScrollArea} from "@mantine/core";
import classes from './SidebarPage.module.css';

interface SidebarPageProps {
    children?: ReactNode;
    bg?: 'white' | 'transparent';
    hasHeader?: boolean;
}

const SidebarPage = ({children, bg = 'transparent', hasHeader = false}: SidebarPageProps) => {
    return (
            <ScrollArea
                className={`${classes.sidebarPageWrapper} 
                        ${bg === 'white' ? classes.sidebarPageWrapperWhite : classes.sidebarPageWrapperTransparent} 
                        ${hasHeader ? classes.sidebarPageWrapperWithHeader : ''}`}
            >
            {children}
        </ScrollArea>
    )
}

export default SidebarPage;