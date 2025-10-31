'use client'
import NewsDetail from "@/modules/engagement/news/components/news.detail";
import { useParams } from "next/navigation";

export default function News(){
    const params = useParams()
    const id = params.id as string

    return <NewsDetail id={id} />
}