import {ReactNode} from "react";
import PageWrapper from "@/components/ui/page/pageWrapper";
import PageHeader from "@/components/ui/page/pageHeader";
import PageContent from "@/components/ui/page/pageContent";
import {LoadingOverlay} from "@mantine/core";

interface SimplePage {
    children: ReactNode,
    title: string,
    isLoading?: boolean,
    pageSetting?: {
        backButton?: boolean,
        noPaddingPage?: boolean,
    }
}

const SimplePage = ({children, title, isLoading, pageSetting}: SimplePage) => {
    return (
        <PageWrapper>
            <PageHeader title={title} backButton={pageSetting?.backButton}></PageHeader>
            <PageContent noPadding={pageSetting?.noPaddingPage}>
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                {children}
            </PageContent>
        </PageWrapper>
    )
}

export default SimplePage;