import StockPage from "@/components/screens/supplier/stock/StockPage";
import SupplierStock from "@/components/pages/supplier/stock";

export default function Page({ params }: { params: { id: number } }) {
    return (
        <>
            <SupplierStock/>
            {/*<StockPage warehouse_id={params.id}/>*/}
        </>
    )
}