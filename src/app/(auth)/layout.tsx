import AuthLayout from "@/components/layouts/authLayout";

interface Props {
    children: React.ReactNode
}
export default function AuthLayoutRoot({children}: Props) {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}