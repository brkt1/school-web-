'use client'
import BlogForm from "@/modules/engagement/blog/components/blog.form";
import { useParams } from "next/navigation";

export default function BlogEdit(){
    const params = useParams()
    const id = params.blog_id as string

    return <BlogForm id={id} />
}