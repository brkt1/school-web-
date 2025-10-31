// import useTruncatedElement from "./useTrancateElement";
// import React from 'react'
// import { cn } from "@/utils/cn";
// import { getThemeValue } from "@/theme/theme";
// import { useCustomTheme } from "@/theme/theme.context";
// import { Link } from "@/navigation";
// import { useTranslations } from "next-intl";

// interface TruncateParagraphProp {
//     lineClamp: 'line-clamp-2' | 'line-clamp-3' | 'line-clamp-4' | 'line-clamp-5'|'line-clamp-6'
//     content: string,
//     classNames?: { p?: string, button?: string },
//     link?: string
//     className?:string
// }

// const TruncateParagraph = ({ content, lineClamp, classNames, link,className }: TruncateParagraphProp) => {
//     const ref = React.useRef(null);
//     const { isTruncated, isReadingMore, setIsReadingMore } = useTruncatedElement({
//         ref,
//     });

//     const customTheme = useCustomTheme()
//     const buttonBg = getThemeValue(['Button', 'textHoverBg'], customTheme.isDark())
//     const translateG  = useTranslations('Commons');


//     const handleReadingMode = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//         event.preventDefault()
//         setIsReadingMore((value) => !value)
//     }

//     return (
//         <div>
//             <p ref={ref} className={cn(`m-0 ${!isReadingMore && lineClamp}`, classNames?.p,className)}>
//                 {content}
//             </p>

//             {link && <Link href={link} type="link" style={{ backgroundColor: buttonBg }} className={cn('p-0 !bg-transparent mt-1 block ', classNames?.button)} >
//                 {translateG('view_more')}
//             </Link>}
//             {/* {isTruncated && !isReadingMore && (
//                 <Button type="link" style={{ backgroundColor: buttonBg }} className={cn('p-0 !bg-transparent ', classNames?.button)} onClick={handleReadingMode}>
//                     Read more
//                 </Button>
//             )}
//             {isTruncated && isReadingMore && (
//                 <div className="flex gap-x-2 ">
//                      <Button href={link} type="link" style={{ backgroundColor: buttonBg }} className={cn('p-0 !bg-transparent ', classNames?.button)} >
//                         View More
//                     </Button>
//                     <Button type="link" style={{ backgroundColor: buttonBg }} className={cn('p-0 !bg-transparent !text-dark-blue-1/50', classNames?.button)} onClick={handleReadingMode}>
//                         Show Less
//                     </Button>
//                 </div>
//             )} */}
//         </div>
//     )
// }

// export default TruncateParagraph