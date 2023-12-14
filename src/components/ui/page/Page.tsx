import {ReactNode} from "react";
import PageWrapper from "@/components/ui/page/pageWrapper";
import PageHeader from "@/components/ui/page/pageHeader";
import PageContent from "@/components/ui/page/pageContent";
import {LoadingOverlay} from "@mantine/core";

interface Page {
    children: ReactNode,
    title: string,
    isLoading?: boolean,
    pageSetting?: {
        backButton?: boolean,
        noPaddingPage?: boolean,
    }
}

const Page = ({children, title, isLoading, pageSetting}: Page) => {
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

export default Page;