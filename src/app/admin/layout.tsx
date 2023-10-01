import AdminLayout from "@/components/layouts/adminLayout";

export default function AdminRootLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return (
        <AdminLayout>
            {children}
        </AdminLayout>
    )
}