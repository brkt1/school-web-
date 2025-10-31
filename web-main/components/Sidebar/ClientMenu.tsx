import React, { useEffect, useState } from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { useSelector } from 'react-redux';
import { PiSignatureDuotone } from "react-icons/pi";
import { IoIosVideocam } from "react-icons/io";
import { MdChurch, MdOutlineChurch, MdOutlineMoney, MdPeople } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { MdEvent } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa6";
import _ from 'lodash';
import { FaVideo } from "react-icons/fa";
import { MediasType } from '@/utils/enums';
import { FaImage } from "react-icons/fa";
import { FaFileAudio } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useRouter } from 'next/navigation';

export type MenuItem = ItemType<MenuItemType> & { children?: any, label?: string, type?: string, className?: string, visible?: string }

interface MenuList {
  [id: string]: MenuItem[]
}

const useClientMenuService = () => {
  const language = useSelector((state: any) => state?.language);
  const [menuList, setMenuList] = useState<MenuList>()

  const router = useRouter();

  const getMenuList = (key: string) => {
    if (menuList && menuList[key]) {
      return menuList[key]
    }
    return []
  }


  let menus: MenuItem[] = [
  ];
  menus = menus?.map((menu) => {
    if (menu && menu['children'] && menu["children"]?.length) {
      menu.visible = "false";
      if (menu['children'].some((child: any) => child.visible)) {
        menu["children"] = menu["children"].filter((child: any) => child.visible);
        menu.visible = "true";
      }
    }
    return menu
  })

  return menus.filter(menu => menu.visible == "true");
};

export default useClientMenuService;
