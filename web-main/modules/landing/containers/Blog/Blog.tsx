// modules/landing/containers/Blog/Blogs.tsx
import { getBlogsServer } from '@/modules/engagement/blog/blog.service';
import BlogList from './BlogList';

export const Blogs = async () => {
  let posts = [];

  try {
    const data = await getBlogsServer({ pagination: { current: 1, pageSize: 9 } });
    posts = data?.results || [];
  } catch (error) {
    console.warn('Failed to fetch blogs:', error);
    posts = [];
  }

  return <BlogList initialPosts={posts} />;
};

export default Blogs;
