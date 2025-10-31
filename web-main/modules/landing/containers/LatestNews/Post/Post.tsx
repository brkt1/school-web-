'use client';
import { Card, Image } from 'antd';
import React from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import Link from 'next/link';

import "./Post.scss";

export const Post: React.FC<{
  title?: string;
  description?: string;
  timeRead?: string;
  author?: string;
  publishedTime?: string;
  img: string;
  alt: string;
  url?: string;
  target?: string;
}> = (props) => {
  const { Meta } = Card;

  const {
    title,
    description,
    timeRead,
    author,
    publishedTime,
    img,
    alt,
    url,
    target
  } = props;

  const CardContent = (
    <Card
      className="post"
      hoverable
      cover={<Image alt={alt} src={img} preview={false} />}
      actions={[
        <div className="post__info" key="info">
          <div>
            {/* Optional author section */}
          </div>
          <div>
            <CalendarOutlined />
            <span> {publishedTime}</span>
          </div>
        </div>
      ]}
    >
      <Meta title={title} description={description} />
      <div className="post__social-inside">
        {/* <SocialIcons /> */}
      </div>
    </Card>
  );

  return url ? (
    <Link href={url} target={target}>
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
};
