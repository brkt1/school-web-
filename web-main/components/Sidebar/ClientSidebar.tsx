// 'use client';
// import {
//     Avatar,
//     Button,
//     Drawer,
//     Menu,
//     MenuProps,
//     SelectProps,
// } from "antd";
// import { useEffect, useState } from "react";
// import { AppState } from "@/store/store";
// import { useDispatch, useSelector } from "react-redux";
// import useScreenSize from "@/hooks/useScreenSize";
// import { MdMenu } from "react-icons/md";
// import { Key } from "@/utils/enums";
// import useClientMenuService from "./ClientMenu";
// import { socialMediaIcons } from "../Commons/SocialMedia/icons";
// import { FloatSelect } from "../Commons/FloatLabel";
// import { FaFlag } from "react-icons/fa6";
// import useUserService from "@/hooks/userService";
// import { PartialUser } from "@/store/slices/userItem";
// import { usePathname, useRouter } from "next/navigation";

// export default function ClientSidebar() {
//     const { isMobile } = useScreenSize();
//     const menus = useClientMenuService();
//     const router = useRouter();
//     const userService = useUserService()
//     const [open, setOpen] = useState<boolean>(isMobile)
//     const user = useSelector((state: any) => state?.user)
//     const dispatch = useDispatch();
//     const pathname = usePathname();
//     const socialMedias: {value: string, key: number}[] = []

//     const onClick: MenuProps['onClick'] = (e) => {
//         router.push(e.key);
//         isMobile && handleToggle()
//     };

//     const handleToggle = () => {
//         setOpen(!open);
//     };

//     const menu = (
//         <div className="flex-1 flex">
//             <Menu
//                 onClick={onClick}
//                 mode="inline"
//                 className="menu"
//                 defaultOpenKeys={[
//                     "hr",
//                     "inventory",
//                     'financials',
//                     'engineering',
//                     "purchases",
//                     "adjustment",
//                 ]}
//                 defaultSelectedKeys={['hr']}
//                 items={menus}
//             />
//         </div>
//     );

//     const logo = (
//         <div className="flex flex-col gap-1 items-center pt-2  dark:bg-dark-bg-container">
//             <Avatar size={120} src={''} alt="Company Logo" />
//             <h3 className="text-white text-xl font-bold italic">
//                 Take The Stage
//             </h3>
//         </div>
//     );

//     return (
//         <>
//             <div onClick={handleToggle} className="flex items-center gap-3 md:ml-3 w-full md:w-auto bg-white dark:bg-dark-bg-elevated sm:bg-transparent dark:sm:bg-transparent"><MdMenu size={24} />
//                 <h2 className="m-0 mx-auto md:mx-0">Take The Stage</h2>
//             </div>
//             <Avatar size={54} src='' />

//             <Drawer
//                 placement="left"
//                 classNames={{ body: 'flex', header: 'border-b-0 p-0', }}
//                 width={300}
//                 open={open}
//                 closable={false}
//                 onClose={handleToggle}
//                 title={logo}
//                 className="main-sidebar"
//             >
//                 <div className="flex flex-col items-stretch w-full sidenav">
//                     {/* <div className="px-2 py-4">
//                         <FloatInput classNames={{}} placeholder={"Search"} />
//                     </div> */}
//                     {menu}
//                     <div className="mb-10 mt-2 mx-4 p-5 bg-primary-gradient-light rounded-lg text-white uppercase">
//                         <h3>Follow us on</h3>
//                         <div className="flex gap-2 flex-wrap mt-2">
//                             {socialMedias?.map((socialMedia, index) => <Button key={index} type="text" target="_blank" className="text-xl border rounded-full bg-white p-1" href={socialMedia.value as string}>{socialMediaIcons[socialMedia.key]}</Button>)}
//                         </div>
//                     </div>

//                 </div>

//             </Drawer>
//         </>
//     );
// }
