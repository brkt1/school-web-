import { timeRelative } from "@/utils/timeUtils"
import { Image } from "antd"
import { cn } from "@/utils/cn";
import TruncateParagraph from "@/components/TruncateParagraph";
import { Blog } from "../blog.model";
import Link from "next/link";

interface RaltedBlogCardProp {
    blog: Blog;
    isRelatedBlog?: boolean;
}

const RelatedBlogCard = ({ blog, isRelatedBlog }: RaltedBlogCardProp) => {
    return <Link href={`/blog/${blog.id}`}>
        <div className="min-h-36 flex flex-col sm:flex-row gap-8 items-start justify-between border-b-2 pb-3 border-text-quaternary hover:text-gray-400">
            <div className={`flex items-start ${isRelatedBlog?'flex-col':'gap-8'}  `}>
                <div className="text-nowrap text-text-secondary dark:text-dark-text-secondary text-sm mt-3">{timeRelative(blog.create_date)}</div>
                <div className="flex flex-col justify-between min-h-36 mb-3">
                    <div>
                        <h2 className="font-medium">{blog.title}</h2>
                        <TruncateParagraph link={`/blog/${blog.id}`} content={blog.short_description} lineClamp="line-clamp-2" classNames={{ p: 'text-text-secondary dark:text-dark-text-secondary' }} />
                        {/* <p className="text-text-secondary">{blog.description}</p> */}
                    </div>
                </div>
            </div>
            <div className={cn(`${isRelatedBlog ? 'block sm:hidden' : 'block'}`, ' ')}><Image preview={false} className="h-25 sm:h-36 w-50 sm:w-72" src={blog.thumbnail} /></div>
        </div>
    </Link>
}

export default RelatedBlogCard