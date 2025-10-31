'use client'
import BlogDetail from "@/modules/engagement/blog/components/blog.detail";
import { useParams } from "next/navigation";

export default function Blog(){
    const params = useParams()
    const id = params.blog_id as string

    return <BlogDetail id={id} />
}