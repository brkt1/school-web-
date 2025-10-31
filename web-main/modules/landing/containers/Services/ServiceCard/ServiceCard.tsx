'use client';
import React, { ReactNode } from 'react';
import { Card } from 'antd';

import { AppIcon } from '../../../components/AppIcon/AppIcon';

import "./ServiceCard.scss"

export const ServiceCard:React.FC<{icon?: ReactNode, title: string, description: string}> = (props) => {
  const { icon, title, description } = props;
  const { Grid, Meta } = Card;

  return (
    <Grid className="service-card">
      <Meta
        avatar={<AppIcon className="service-card__icon" icon={icon} />}
        title={title}
        description={description}
      />
    </Grid>
  )
}
