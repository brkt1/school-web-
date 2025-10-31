"use client";
import BlogClientDetail from "@/modules/engagement/blog/components/blog.client.detail";
import { useParams } from "next/navigation";

const BlogDetailPage = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <BlogClientDetail id={id} />
  );
};

export default BlogDetailPage;
