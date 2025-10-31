// 'use client';
// import { useRouter } from "@/navigation";
// import { MenuProps } from "antd";
// import { useTranslations } from "next-intl";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";

// type MenuItem = Required<MenuProps>["items"][number];

// const useMenu = () => {
//     const homeT = useTranslations("Home")
//     const newsT = useTranslations("News")
//     const petitionT = useTranslations("Petitions")
//     const mediaT = useTranslations('Media')
//     const companyT = useTranslations('Company')
//     const commonT = useTranslations('Commons')
//     const financeT = useTranslations('Finance')
//     const memberT = useTranslations("Member")
//     const eotcT = useTranslations("EOTC")
//     const economyT = useTranslations("Economy")
//     const user = useSelector((state: any) => state?.user)
//     let locale = "en"
//     const router = useRouter()

//     useEffect(() => {
//       locale = localStorage.getItem("lan") || "en";
//     }, []);


//     const items: MenuItem[] = [
//         {
//           label: homeT('title'),
//           key: "/",
//           onClick: () => router.push("/", {locale})
//         },
//         {
//           label: companyT('company_about_us'),
//           key: "/about_us",
//           onClick: () => router.push("/about_us", {locale})
//         },
//         {
//           key: "/eotc",
//           label: eotcT('about_eotc'),
//           onClick: () => router.push("/eotc", {locale})
//         },
//         {
//           label: newsT('title'),
//           key: "/news",
//           onClick: () => router.push("/news", {locale})
//         },
//         {
//           label: mediaT('title'),
//           key: "/medias",
//           onClick: () => router.push("/medias", {locale})

//         },
//         {
//           label: companyT('events_title'),
//           key: "/events",
//           onClick: () => router.push("/events", {locale})

//         },
//         {
//           key: "/economy",
//           label: economyT('title'),
//           onClick: () => router.push("/economy", {locale})
//         },
//         {
//           label: petitionT('title'),
//           key: "/petitions",
//           onClick: () => router.push("/petitions", {locale})
        
//         },
//         {
//           label: memberT('membership'),
//           key: '/membership',
//           onClick: () => router.push("/membership", {locale})
//         },
//         {
//           label: memberT('volunteers'),
//           key: '/volunteer',
//           onClick: () => router.push("/volunteer", {locale})
        
//         },
//         {
//           label: companyT('contact_us'),
//           key: "/contact_us",
//           onClick: () => router.push("/contact_us", {locale})  
//         }
//       ];

//     if(user.is_superuser){
//       items.push({
//            key: "/admin",
//            label: commonT("admin"),
//            onClick: () => router.push("/admin", {locale})
//          })
//     }

//     return {items}
// }

// export default useMenu