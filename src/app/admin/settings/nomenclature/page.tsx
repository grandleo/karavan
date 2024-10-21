import type {Metadata} from "next";
import NomenclaturePage from "@/screens/admin/NomenclaturePage";

export const metadata: Metadata = {
    title: 'Номенклатура'
}

export default function Page() {
    return <NomenclaturePage />;
}