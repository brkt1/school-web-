'use client';
import React, { ReactNode } from 'react';
import { Card } from 'antd';
import { AppIcon } from '../../../components/AppIcon/AppIcon';
import "./AboutCard.scss"

export const AboutCard: React.FC<{icon: ReactNode, title: string, description: string}> = (props) => {
  const { Meta } = Card;
  const { icon, title, description } = props;

  return (
    <Card
      hoverable
      className="about__card"
      cover={
        <AppIcon
          icon={icon}
          className="about__card-icon"
        />
      }
    >
      <Meta title={title} description={description} />
    </Card>
  )
}
