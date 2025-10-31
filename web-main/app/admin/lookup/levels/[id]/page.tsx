'use client'
import LevelDetail from "@/modules/lookup/level/components/level.detail";
import { useParams } from "next/navigation";

export default function Level(){
    const params = useParams()
    const id = params.id as string

    return <LevelDetail id={id} />
}