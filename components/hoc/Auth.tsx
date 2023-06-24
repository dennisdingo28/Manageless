"use client"

import { ReactNode } from "react"
import { useSession } from "next-auth/react"

const Auth = ({children}:{children:ReactNode}) => {

    const {data:session,status} = useSession();

    if(status==="loading")
    {
        return (
            <h1 className="text-center text-[1.8em] font-bold">Loading the content...</h1>
        )
    }

    if(status==="unauthenticated"){
        return (
            <h1 className="text-center text-[1.8em] font-bold">You are not authenticated</h1>
        )
    }
    if(status==="authenticated"){
        localStorage.setItem('token',JSON.stringify(session?.user?.token));
        return (
            <div className="">
                {children}
            </div>
        )
    }
    
    
 
}

export default Auth