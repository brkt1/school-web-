import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from 'dayjs/plugin/customParseFormat';


dayjs.extend(relativeTime); 
dayjs.extend(customParseFormat);

export const toDateAndTime=(date?:Date| string): string=>{
    return date ? new Date(date.toString()).toLocaleString("en-US",{dateStyle:'medium',timeStyle:'medium'}) : "";
}

export const toDate = (date?: Date | string): string =>{
    return date ? new Date(date.toString()).toLocaleString('en-US',{dateStyle:'medium'}) : ""
}

export const toTime = (date?: Date | string): string =>{
    return date ? new Date(date.toString()).toLocaleString('en-US', { timeStyle: 'short'}) : "";
}


export const formatTo12Hour =(time24: string): string => {
  if (!time24) return '';
  const parsed = dayjs(time24, 'HH:mm:ss');
  return parsed.format('hh:mm A');
}

export const timeRelative = (date: Date | string) => {
    return dayjs().to(date)
}

export const timeStampToDate = (timeStamp: number): Date | string => {
    if(timeStamp == null){
        return ""
    }
    return new Date(timeStamp * 1000)
}

export function getTimeZone() {    
    // Get the user's time zone dynamically
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Return the object with dateTime and dynamically determined timeZone
    return timeZone
}