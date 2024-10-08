import {Metadata} from "next";
import {HeaderHome} from "@/components/ui/header";
import {Container} from "@mantine/core";
import {HomeFooter} from "@/components/ui/Footer";
import PrivacyPage from "@/screens/PrivacyPage";

export const metadata: Metadata = {
    title: 'Политики конфиденциальности',
}

export default function Page() {
    return (
        <>
            <HeaderHome/>

            <Container size="md" mt={120}>
                <PrivacyPage/>
            </Container>

            <HomeFooter/>
        </>
    )
}