'use client';
import React from 'react';
import { Menu } from 'antd';

import "./FooterMenu.scss";

export const FooterMenu: React.FC<{title: string, menu: {text: string, url: string}[]}> = (props) => {
  const { title, menu } = props;

  // Map your menu data to the Ant Design 'items' prop format
  const menuItems = menu?.map((item, index) => ({
    key: title + index, // Ensure unique keys for each item
    label: <a className="footer-menu__item" href={`#${item.url}`}>- {item.text}</a>,
  }));

  return (
    <div className="footer-menu">
      <h2 className="footer-menu__title">{title}</h2>
      <Menu
        items={menuItems} // Pass the transformed array to the 'items' prop
      />
    </div>
  )
}