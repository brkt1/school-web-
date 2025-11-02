// modules/landing/containers/Blog/BlogList.tsx
'use client';
import { Blog } from '@/modules/engagement/blog/blog.model';
import { toDateAndTime } from '@/utils/timeUtils';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { Container } from '../../components/Container/Container';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import './Blog.scss';
import { Post } from './Post/Post';

interface BlogListProps {
  initialPosts: Blog[];
}

export const BlogList: React.FC<BlogListProps> = ({ initialPosts }) => {
  const [posts] = useState(initialPosts);

  return (
    <section id="blog" className="blog">
      <Container>
        <SectionHeading
          heading="Blogs"
          subHeading="Explore insightful articles, tutorials, and stories shared by our community and team. Stay up-to-date with fresh perspectives, tips, and deep dives on topics that matter to you."
        />
        <Row gutter={[24, 24]} justify="center">
          {posts?.map((post) => (
            <Col xs={20} md={12} lg={8} key={post.id}>
              <Post
                title={post.title}
                description={post.short_description}
                timeRead="4 Min"
                author={post.created_by_detail.full_name}
                publishedTime={toDateAndTime(post.create_date)}
                img={post.thumbnail}
                alt={post.title}
                url={`/blog/${post.id}`}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default BlogList;
