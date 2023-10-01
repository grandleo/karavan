'use client'

import { useSession } from 'next-auth/react'
import {setToken} from "@/config/http";

const SessionLoader = ({ children }: { children: React.ReactNode }) => {
    const session = useSession()

    if (session.status === 'loading') {
        return <div className="loading" />
    }

    if (session.status === 'authenticated') {
        setToken(session.data.accessToken)
    }

    return <>{children}</>
}

export default SessionLoader