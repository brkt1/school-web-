"use client";
import NewsClientDetail from "@/modules/engagement/news/components/news.client.detail";
import { useParams } from "next/navigation";

const NewsDetailPage = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <NewsClientDetail id={id} />
  );
};

export default NewsDetailPage;
