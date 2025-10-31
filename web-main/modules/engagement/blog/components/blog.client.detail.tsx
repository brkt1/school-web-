const RichTextEditor = dynamic(() => import('@/components/Commons/RichTextEditor'), { ssr: false });
import { Image, Tag } from "antd";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { timeRelative } from "@/utils/timeUtils";
import { Blog } from "../blog.model";
import useBlogService from "../blog.service";
import RelatedBlogList from "./related.blog.list";

interface BlogClientDetailProp {
  id: string;
}

const BlogClientDetail = ({ id }: BlogClientDetailProp) => {
  const [blogDetail, setBlogDetail] = useState<Blog>();
  const blogService = useBlogService();

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = (): void => {
    blogService.getBlog(id).then((value) => {
      setBlogDetail(value.data);
    });
  };

  return (
    <div className="mt-3 sm:mt-5 ">
      <div className="mx-auto container mt-3 text-pretty">

          <h1 className="text-xl uppercase font-bold">{blogDetail?.title}</h1>

        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1 flex flex-col   items-start gap-4 p-2 sm:p-0">
            <div className="w-full  sm:mt-2">
              {blogDetail && <Image
                preview={false}
                className="w-full object-cover object-top"
                src={blogDetail?.thumbnail}
              />}
            </div>
            <div>
              <p className="text-secondary my-2">{blogDetail?.create_date && timeRelative(blogDetail?.create_date)}</p>

              <div className="text-pretty ">{blogDetail?.short_description}</div>

              <div>
                <RichTextEditor value={blogDetail?.main_content} readonly={true} />
              </div>
            </div>
          </div>
          {<div className="w-full sm:w-[300px] px-5 sm:px-0">
            <RelatedBlogList title="Latest blog" isRelatedBlog={true} ps={5} />
          </div>}
        </div>


      </div>
    </div>

  );
};

export default BlogClientDetail;
