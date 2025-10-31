import useTruncatedElement from "./useTrancateElement";
import React from 'react'
import { cn } from "@/utils/cn";
import Link from "next/link";

interface TruncateParagraphProp {
    lineClamp: 'line-clamp-2' | 'line-clamp-3' | 'line-clamp-4' | 'line-clamp-5'|'line-clamp-6'
    content: string,
    classNames?: { p?: string, button?: string },
    link?: string
    className?:string
}

const TruncateParagraph = ({ content, lineClamp, classNames, link,className }: TruncateParagraphProp) => {
    const ref = React.useRef(null);
    const { isTruncated, isReadingMore, setIsReadingMore } = useTruncatedElement({
        ref,
    });


    const handleReadingMode = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        setIsReadingMore((value) => !value)
    }

    return (
        <div>
            <p ref={ref} className={cn(`m-0 ${!isReadingMore && lineClamp}`, classNames?.p,className)}>
                {content}
            </p>

            {link && <Link href={link} type="link" className={cn('p-0 !bg-transparent mt-1 block ', classNames?.button)} >
                View More
            </Link>}
        </div>
    )
}

export default TruncateParagraph