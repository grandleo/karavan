'use client'

import {LoadingOverlay} from "@mantine/core";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push('/login');
    }, []);

    return (
        <>
            <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        </>
    )
}