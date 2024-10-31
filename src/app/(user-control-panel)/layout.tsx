import DashboardLayout from "@/layouts/DashboardLayout";

interface Props {
    children: React.ReactNode
}

export default function UserControlPanelRootLayout({ children }: Props) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}