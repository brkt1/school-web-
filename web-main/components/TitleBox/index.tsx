import { cn } from "@/utils/cn";
import Link from "next/link";
interface TitleBoxProps {
    title: string;
    link?: string;
    className?: string;
    leftBar?: string;
    description?: string;
}
const TitleBox: React.FC<TitleBoxProps> = ({ title, link, className, leftBar, description }) => {

    return (
        <div>
            <div className="flex items-center justify-between my-3">
                <div className={cn(`text-2xl font-bold flex items-center }`, className)}>
                    <div className={cn(`h-8 w-3 bg-secondary rounded-full  mr-2 my-2`, leftBar)}> </div>{title}</div>
                {link && <Link href={link} className="text-secondary uppercase">View More</Link>}
            </div>
            {description && <p className="ml-3 text-white mb-2">{description}</p>}
        </div>
    )
}


export default TitleBox;