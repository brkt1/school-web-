'use client'
import UserForm from "@/modules/auth/user/components/user.form";
import { useParams } from "next/navigation";

export default function UserEdit(){
    const params = useParams()
    const id = params.id as string

    return <UserForm id={id} />
}