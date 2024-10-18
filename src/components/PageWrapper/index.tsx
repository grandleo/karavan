import React, {ReactNode} from "react";
import {Box, Flex, ScrollArea} from "@mantine/core";
import SidebarPage from "@/components/PageWrapper/SidebarPage";
import HeaderPage from "@/components/PageWrapper/HeaderPage";

interface PageWrapperProps {
    children?: ReactNode;
    sidebarChildren?: ReactNode;
    sidebarWhite?: boolean;
    emptyPage?: EmptyPageProps;
    headerConfig?: HeaderPageProps;
}

interface HeaderPageProps {
    title?: string;
    actions?: () => void;
}

interface EmptyPageProps {
    title?: string;
    icon?: ReactNode;
    action?: ReactNode;
}

const PageWrapper = ({children, sidebarChildren, sidebarWhite}: PageWrapperProps) => {
    return (
        <>
        <Flex direction="column" gap="12px">
            {/*<HeaderPage/>*/}
            <Flex gap="12px">
                <Box>
                    <SidebarPage bg_white={sidebarWhite}>
                        {sidebarChildren}
                    </SidebarPage>
                </Box>
                <ScrollArea style={{background: '#FFFFFF', borderRadius: '12px', height: '100vh', flexGrow: 1, padding: '12px'}}>
                    {children}
                </ScrollArea>
            </Flex>
        </Flex>
        </>
    )
}

export default PageWrapper;