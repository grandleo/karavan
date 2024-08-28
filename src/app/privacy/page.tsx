import {Metadata} from "next";
import {PrivacyScreen} from "@/screens";

export const metadata: Metadata = {
    title: 'Политики конфиденциальности',
}

export default function Page() {
    return <PrivacyScreen />
}