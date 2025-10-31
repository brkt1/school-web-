import { toDate, toTime } from "@/utils/timeUtils";
import { isVisible } from "@/utils/visibility";

interface PropsType {
    title: string;
    value: any;
    className?: string;
    type?:  "string/number" | "date" | "date-time" ;
}

export const Detail = (props: PropsType) => {
    
    let {title, value, type = "string/number"} = props    
    
    const  DetailComponent  = {
            date :<div className="font-normal">
                     {toDate(value )}
                 </div>, 
            "date-time" : <div className="font-normal">
                     {toDate(value )} {toTime(value ) }
                 </div>,
    
            "string/number": <div className="font-normal">
                     {value }
                 </div>
     }
    
    
    return (<div className={`${isVisible(props.value != undefined && props.value != false)} ${props.className} flex flex-col`}>
                <div > {title}</div>
                <div className="p-1 pl-3 bg-slate-50 my-3 rounded-md ">
                {DetailComponent[type]}
                </div>
        </div>
     )


}


export const FloatDetail = (props: PropsType) => {
    
    let {title, value, type = "string/number"} = props    
    
    const  DetailComponent  = {
            date :<div className="font-normal">
                     {toDate(value )}
                 </div>, 
            "date-time" : <div className="font-normal">
                     {toDate(value )} {toTime(value ) }
                 </div>,
    
            "string/number": <div className="font-normal">
                     {value }
                 </div>
     }
    
    
    return (<div className={`${isVisible(props.value != undefined)} ${props.className}`}>
                <div className="border-solid border-2  bg-slate-50 relative p-2 border-gray-400 rounded-md">
                    <div className="absolute -top-3 bg-white px-2 text-sm">{title}</div>
                        <div className="px-1 ">
                            {DetailComponent[type]}
                        </div>
                </div>
            </div>
     )
}