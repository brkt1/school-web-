import { Popconfirm, PopconfirmProps } from "antd"
import FloatInput, { FloatInputProps } from "../FloatInput"
import { AnyObject } from "antd/es/_util/type";
import { ReactNode, useState } from "react";

type ExtendedObject<T> = {
	body: ReactNode | string;
    value?: any,
    function: Function
	updateRowSelected?: (row: React.Key[]) => void
};

type ExtendedPopConfirmProps<T> = PopconfirmProps & FloatInputProps & ExtendedObject<T>;

const PopConfirm = <T extends AnyObject = AnyObject>(props: ExtendedPopConfirmProps<T>) => {
    const [val, setVal] = useState(props.value)
    return <Popconfirm {...props} title={
        <FloatInput {...props} value={val}  onChange={(e) => setVal(e.target.value)} />
    } onConfirm={(e) => {
        props.function(val)
    }}>
            {props.body}
    </Popconfirm>
}

export default PopConfirm;