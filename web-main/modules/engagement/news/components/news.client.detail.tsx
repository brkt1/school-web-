const RichTextEditor = dynamic(() => import('@/components/Commons/RichTextEditor'), { ssr: false });
import { Image, Tag } from "antd";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { timeRelative } from "@/utils/timeUtils";
import { News } from "../news.model";
import useNewsService from "../news.service";
import RelatedNewsList from "./related.news.list";

interface NewsClientDetailProp {
  id: string;
}

const NewsClientDetail = ({ id }: NewsClientDetailProp) => {
  const [newsDetail, setNewsDetail] = useState<News>();
  const newsService = useNewsService();

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = (): void => {
    newsService.getNews(id).then((value) => {
      setNewsDetail(value.data);
    });
  };

  return (
    <div className="mt-3 sm:mt-5 ">
      <div className="mx-auto container mt-3 text-pretty">

          <h1 className="text-xl uppercase font-bold">{newsDetail?.title}</h1>

        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1 flex flex-col   items-start gap-4 p-2 sm:p-0">
            <div className="w-full  sm:mt-2">
              {newsDetail && <Image
                preview={false}
                className="w-full object-cover object-top"
                src={newsDetail?.image}
              />}
            </div>
            <div>
              <p className="text-secondary my-2">{newsDetail?.create_date && timeRelative(newsDetail?.create_date)}</p>

              <div className="text-pretty ">{newsDetail?.short_description}</div>

              <div>
                <RichTextEditor value={newsDetail?.main_content} readonly={true} />
              </div>
            </div>
          </div>
          {<div className="w-full sm:w-[300px] px-5 sm:px-0">
            <RelatedNewsList title="Latest news" isRelatedNews={true} ps={5} />
          </div>}
        </div>


      </div>
    </div>

  );
};

export default NewsClientDetail;
