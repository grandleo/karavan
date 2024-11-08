import {Metadata} from "next";
import PrivacyPage from "@/screens/PrivacyPage";

export const metadata: Metadata = {
    title: 'Политики конфиденциальности',
}

export default function Page() {
    return (
        <>
            <PrivacyPage/>
        </>
    )
}