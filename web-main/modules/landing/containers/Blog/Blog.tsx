// modules/landing/containers/Blog/Blogs.tsx
import React from 'react';
import BlogList from './BlogList';
import { getBlogsServer } from '@/modules/engagement/blog/blog.service';

export const Blogs = async () => {
  const data = await getBlogsServer({ pagination: { current: 1, pageSize: 9 } });
  const posts = data.results || [];

  return <BlogList initialPosts={posts} />;
};

export default Blogs;
