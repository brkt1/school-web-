'use client';
import { MenuOutlined } from '@ant-design/icons';
import { Affix, Button, Drawer, Grid, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import Link from 'next/link';
import { useState } from 'react';
import { Container } from '../Container/Container';
import './AppHeader.scss';

const { useBreakpoint } = Grid;

export const AppHeader = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();

  const menuItems = [
    {
      key: 'home',
      label: <Link className="app-header__menu-item" href="/">Home</Link>,
    },
    {
      key: 'about',
      label: <Link className="app-header__menu-item" href="/about">About</Link>,
    },
    {
      key: 'news',
      label: <Link className="app-header__menu-item" href="/#news">News</Link>,
    },
    {
      key: 'pricing',
      label: <Link className="app-header__menu-item" href="/pricing">Pricing</Link>,
    },
    {
      key: 'testimonials',
      label: <Link className="app-header__menu-item" href="/testimonials">Testimonials</Link>,
    },
    {
      key: 'blog',
      label: <Link className="app-header__menu-item" href="/blog">Blog</Link>,
    },
    {
      key: 'contact',
      label: <Link className="app-header__menu-item" href="/contact">Contact</Link>,
    },
    {
      key: 'registeration',
      label: <Link className="app-header__menu-item" href="/#registeration">Registeration</Link>,
    },
    {
      key: 'login',
      label: <Link className="app-header__menu-item" href="/login">Login</Link>,
    },
  ];

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <Affix offsetTop={0}>
      <Header className="app-header">
        <Container className="app-header__content">
          <a href="#url">
            <img
              className="app-header__logo"
              src="/images/logo.jpg"
              alt="logo"
            />
          </a>

          {/* Desktop Menu */}
          {screens.md ? (
            <Menu
              className="app-header__menu"
              mode="horizontal"
              defaultSelectedKeys={['home']}
              items={menuItems}
            />
          ) : (
            // Mobile Menu Button
            <>
              <Button
                className="app-header__menu-button"
                icon={<MenuOutlined />}
                onClick={showDrawer}
                type="text"
              />
              <Drawer
                title="Menu"
                placement="right"
                onClose={closeDrawer}
                open={drawerVisible}
              >
                <Menu
                  mode="vertical"
                  items={menuItems}
                  onClick={closeDrawer}
                />
              </Drawer>
            </>
          )}
        </Container>
      </Header>
    </Affix>
  );
};
