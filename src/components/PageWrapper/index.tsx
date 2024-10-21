import React, {ReactNode} from "react";
import {Flex, ScrollArea} from "@mantine/core";
import HeaderPage from "@/components/PageWrapper/HeaderPage/HeaderPage";
import SidebarPage from "@/components/PageWrapper/SidebarPage";
import classes from "./PageWrapper.module.css";

interface PageWrapperProps {
    children?: ReactNode;
    sidebarBg?: 'white' | 'transparent';  // Проп для настройки фона Sidebar
    sidebarContent?: ReactNode;  // Контент для Sidebar
    header?: ReactNode;  // Динамический Header
}

// Функция для проверки пустоты ReactNode
const isReactNodeEmpty = (node: ReactNode): boolean => {
    if (node === null || node === undefined) {
        return true;
    }

    if (typeof node === 'boolean') {
        return true;
    }

    if (Array.isArray(node)) {
        return node.every(isReactNodeEmpty);
    }

    if (typeof node === 'string' || typeof node === 'number') {
        return node.toString().trim().length === 0;
    }

    if (React.isValidElement(node)) {
        if (node.type === React.Fragment) {
            return isReactNodeEmpty(node.props.children);
        }
        return false; // Любой другой элемент считается непустым
    }

    return false;
}

const PageWrapper = ({children, sidebarBg = 'transparent', sidebarContent, header}: PageWrapperProps) => {
    const isSidebarEmpty = isReactNodeEmpty(sidebarContent);

    // Условное изменение класса для border-radius
    const contentWrapperClass = `
    ${classes.contentPageWrapper} 
    ${sidebarBg === 'white' ? classes.contentPageWrapperConnected : ''}
    ${header ? classes.contentPageWrapperWithHeader : classes.contentPageWrapperNoHeader}
  `;
    const flexGap = sidebarBg === 'white' ? 0 : '12px';
    const flexContainerClass = header ? '' : classes.noHeaderMargin; // Класс для управления margin

    return (
        <>
            <Flex direction="column" gap="12px" className={flexContainerClass}>
                {header && <HeaderPage>{header}</HeaderPage>}
                <Flex gap={flexGap}>
                    {!isSidebarEmpty && (
                        <SidebarPage bg={sidebarBg} hasHeader={!!header}>
                            {sidebarContent}
                        </SidebarPage>
                    )}
                    <ScrollArea className={contentWrapperClass}>
                        {children}
                    </ScrollArea>
                </Flex>
            </Flex>
        </>
    )
}

export default PageWrapper;