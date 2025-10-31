'use client'
import UserDetail from "@/modules/auth/user/components/user.detail";
import { useParams } from "next/navigation";

export default function User(){
    const params = useParams()
    const id = params.id as string

    return <UserDetail id={id} />
}