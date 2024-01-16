import type {Metadata} from "next";
import MenuPage from "@/components/screens/admin/settings/MenuPage";

export const metadata: Metadata = {
    title: 'Меню для пользователей'
}

export default function Page () {
    return <MenuPage/>
}