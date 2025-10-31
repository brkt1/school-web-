'use client';
import React from 'react';
import { Card, Image, Space } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';

import "./Member.scss";

export const Member: React.FC<{name: string, position: string, img: string, facebook: string, twitter: string, linkedin: string}> = (props) => {
  const { name, position, img, facebook, twitter, linkedin } = props;
  const { Meta } = Card;

  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2229651_awfgn4o1jo8.js'
  });

  return (
    <Card
      hoverable
      className="member"
      cover={<Image preview={false} alt={name} src={img} />}
    >
      <Space className="member__contact">
        <a
          className="member__contact-link"
          href={facebook}
          target="_blank"
          rel="noreferrer"
        >
          <IconFont type="icon-facebook" />
        </a>
        <a
          className="member__contact-link"
          href={twitter}
          target="_blank"
          rel="noreferrer"
        >
          <IconFont type="icon-twitter" />
        </a>
        <a
          className="member__contact-link"
          href={linkedin}
          target="_blank"
          rel="noreferrer"
        >
          <IconFont type="icon-linkedin" />
        </a>
      </Space>
      <Meta title={name} description={position} />
    </Card>
  )
}
