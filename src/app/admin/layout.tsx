import AdminLayout from "@/components/layouts/adminLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function AdminRootLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}