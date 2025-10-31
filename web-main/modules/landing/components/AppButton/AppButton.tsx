import React from 'react';
import { Button, ButtonProps } from 'antd';
import "./AppButton.scss";

export const AppButton: React.FC<ButtonProps> = (props) => {
  const { type, className = "", children, ...rest } = props;

  return (
    <Button type={type} className={`app-button ${className}`} {...rest}>
      {children}
    </Button>
  )
}
