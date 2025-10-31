'use client'
import LevelForm from "@/modules/lookup/level/components/level.form";
import { useParams } from "next/navigation";

export default function LevelEdit(){
    const params = useParams()
    const id = params.id as string

    return <LevelForm id={id} />
}