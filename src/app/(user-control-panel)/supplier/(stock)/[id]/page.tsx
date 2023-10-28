import StockPage from "@/components/screens/supplier/stock/StockPage";

export default function Page({ params }: { params: { id: number } }) {
    return (
        <>
            <StockPage warehouse_id={params.id}/>
        </>
    )
}