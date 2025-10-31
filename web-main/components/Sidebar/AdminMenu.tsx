import useAuthorization from '@/utils/authorization';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';

export type MenuItem = ItemType<MenuItemType> & {children?: any, label?: string, type?: string, className?: string, visible?: string}

const useMenuService = () => {
  const authorization = useAuthorization();

  let menus: MenuItem[]= [];
  menus = menus?.map((menu) => {
   if(menu && menu['children'] && menu["children"]?.length){
    menu.visible = "false";
    if (menu['children'].some((child: any) => child.visible)){
      menu["children"] = menu["children"].filter((child: any) => child.visible);
      menu.visible = "true";
    }
   }
    return menu
  })

  return menus.filter(menu => menu.visible == "true");
};

export default useMenuService;
