import useAuthorizeService from "@/modules/auth/authorize/authorize.service";
import { removeUser } from "@/store/slices/userSlices";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { AppState } from "@/store/store";

const AdminHeader = () => {
  const authService = useAuthorizeService();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);

  const logout = () => {
    authService.logout().then(() => {
      localStorage.clear();
      dispatch(removeUser());
      router.push("/login");
    });
  };

  const profile_items: MenuProps["items"] = [
    {
      key: "1",
      label: "Logout",
      onClick: () => {
        logout();
      },
      icon: <LogoutOutlined />,
    },

    {
      key: "2",
      label: "User Profile",
      onClick: () => {
        router.push("/admin/profile");
      },
      icon: <UserOutlined />,
    },
  ];
  return (
    <>
      <div className="w-full flex justify-between px-10 items-center">
        <div>
            <h1 className="text-2xl font-bold">Take The Stage Admin Page</h1>
        </div>
        <Dropdown menu={{ items: profile_items }}>
          <Space>
            <div className="flex flex-row items-center gap-2">
              <Avatar
                size={30}
                src="https://xsgames.co/randomusers/avatar.php?g=pixel"
              />
              <span>{user.username}</span>
            </div>
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </>
  );
};

export default AdminHeader;
