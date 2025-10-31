import React from 'react';
import { Avatar, AvatarProps } from "antd";
import "./AppIcon.scss";

export const AppIcon:React.FC<AvatarProps> = (props) => {
  const { icon, className = "", ...rest } = props;
  return (
    <Avatar
      className={`app-icon ${className}`}
      icon={icon}
      {...rest}
    />
  )
}
