import React from 'react';
import { Card } from 'antd';
import { AppButton } from '../../../components/AppButton/AppButton';

import "./PriceCard.scss"
import { ButtonType } from 'antd/es/button';

export const PriceCard: React.FC<{title: string, price: string, features: string[], buttonType: ButtonType}> = (props) => {
  const { title, price, features, buttonType } = props;

  return (
    <Card className="price-card" hoverable>
      <h2 className="price-card__title">{title}</h2>
      <h3 className="price-card__price">
        <span>ETB </span>{price}
      </h3>
      {
        features?.map(feature => (
          <p className="price-card__feature" key={title + feature}>{feature}</p>
        ))
      }
      {/* <AppButton
        className="price-card__button"
        type={buttonType}
      >
        Purchase
      </AppButton> */}
    </Card >
  )
}
