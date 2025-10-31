import {
	Button
} from "antd";
 
import React, { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import FloatInput, { FloatInputProps } from "./FloatInput";
 

interface CustomSelectProps extends FloatInputProps {
    handleAdd: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void,
}   

export default function CustomSelectAdd(props: CustomSelectProps) {

	return (<FloatInput
            {...props}
            type="select"
            dropdownRender={(menu) => (
                <>
                           {props.options?.length !=0 && <>{menu}</>}
                           {props.searchValue?.length != 0 && <Button className="" type="text" icon={<PlusOutlined />} onClick={props.handleAdd}>
                            Add {props.label} <b className="text-custom_blue-100 font-extrabold"> * {props.searchValue} *
                                        </b>
                            </Button> }        
                </>
            )}
            />);
}
