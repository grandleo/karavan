'use client'

import {Box, LoadingOverlay} from "@mantine/core";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function Login () {
    const session = useSession();
    const router = useRouter();

    if(session.status === 'authenticated') {
        router.push('/' + session.data?.user?.role)
    } else {
        router.push('/login')
    }

    return (
        <>
            <Box>
                <LoadingOverlay
                    visible
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                />
            </Box>
        </>
    )
}