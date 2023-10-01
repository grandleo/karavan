import UserControlPanelLayout from "@/components/layouts/userControlPanelLayout";

interface Props {
    children: React.ReactNode
}

export default function UserControlPanelRootLayout({ children }: Props) {
    return (
        <UserControlPanelLayout>
            {children}
        </UserControlPanelLayout>
    )
}