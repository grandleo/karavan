import {ReactNode} from "react";
import PageWrapper from "@/components/simplePage/pageWrapper";
import PageHeader from "@/components/simplePage/pageHeader";
import PageContent from "@/components/simplePage/pageContent";
import {LoadingOverlay} from "@mantine/core";

interface Index {
    children: ReactNode,
    // headerChildrenLeft?: () => JSX.Element | ReactNode,
    headerChildrenLeft?(): ReactNode,
    headerChildren?(): ReactNode,
    title: string,
    isLoading?: boolean,
    pageSetting?: {
        backButton?: boolean,
        noPaddingPage?: boolean,
        isLoading?: boolean,
    },

}

const SimplePage = ({children, title, isLoading, pageSetting, headerChildrenLeft, headerChildren}: Index) => {
    return (
        <PageWrapper>
            <LoadingOverlay visible={pageSetting?.isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <PageHeader title={title} backButton={pageSetting?.backButton} childrenLeft={headerChildrenLeft}>{headerChildren && headerChildren()}</PageHeader>
            <PageContent noPadding={pageSetting?.noPaddingPage}>
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                {children}
            </PageContent>
        </PageWrapper>
    )
}

export default SimplePage;