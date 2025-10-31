'use client';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import NavigateButton from "../NavigateButton";

type Props = {
    hide_title?: boolean;
    title?: string;
    className?: string;
    subTitle?: string;
    content?: React.ReactNode;
    loadData?: () => void;
};
export const PageTitleBox: React.FC<Props> = (props: Props) => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handleRefresh = () => {
        props.loadData ? props.loadData() : location.reload();
    };
    return (
        <div className="w-full h-[150px] bg-[#E8ECF1] flex flex-col justify-center items-center p-5 sm:p-0">

            {props.subTitle ?
                <div className={`${props.hide_title ? 'hidden' : 'flex flex-col'}  mx-auto container  ${props.className}`}>
                    <h3 className="font-semibold text-2xl">{props.title}</h3>
                    {props?.content ? props.content : ""}

                </div> :

                <div className={`${props.hide_title ? 'hidden' : 'flex flex-col '} mx-auto container ${props.className}`}>
                    <div className="text-[12px]  uppercase mb-1"><FaArrowLeftLong className="mr-3 cursor-pointer hover:text-primary" onClick={handleBack} />Back</div>
                    <h3>{props.title}</h3>
                </div>}
        </div>
    )

}


