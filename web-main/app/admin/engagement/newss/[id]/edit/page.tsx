'use client'
import NewsForm from "@/modules/engagement/news/components/news.form";
import { useParams } from "next/navigation";

export default function NewsEdit(){
    const params = useParams()
    const id = params.id as string

    return <NewsForm id={id} />
}