import { componentType } from "@/utils/common_models/commons.model";
import { PaginationProps } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";

interface SearchProps<T> {
    filteredData: T,
    setFilteredData: () => void
}

export interface SearchComponentProps {
    placeholder: string,
    // onChange: (e: string | number) => void,
    // value: string | number
    disableClear?: boolean;
    hidden?: boolean;
    key: string,
    type: componentType,
    options?: DefaultOptionType[]
    search?: (val: string) => void
    value?:any
    debounceTimeout?    : number
}

const useSearch = <T>(props: SearchProps<T>) => {
    // const useSearch= <T extends TableSearchModel>(props: SearchProps<T>) => {

    // const 

    const [components, setComponents] = useState<SearchComponentProps[]>([])

    const addComponent = (props: SearchComponentProps) => {
        setComponents([...components, {...props}])
    }
      

    return {
        components,
        addComponent
    }



}

export default useSearch;