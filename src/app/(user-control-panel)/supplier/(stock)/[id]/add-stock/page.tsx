import AddProductsStock from "@/components/screens/supplier/stock/components/AddProductsStock";

export default function Page({ params }: { params: { id: number } }) {
    return (
        <>
            <AddProductsStock warehouse_id={params.id}/>
        </>
    )
}