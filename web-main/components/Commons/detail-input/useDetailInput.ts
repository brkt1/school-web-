import { Form } from "antd";
import { useState } from "react";

interface DetailInputProps<T> {
    edit?: boolean;
    disabled?: boolean;
    initial_value?: T
}

export const useDetailInput = <T = any>(props?: DetailInputProps<T>) => {
    const [form] = Form.useForm<T>();
    const [edit, setEdit] = useState<boolean>(props?.edit || false);
    const [disabled, setDisabled] = useState(props?.disabled || false)


    return {
        ...form,
        edit,
        setEdit,
        disabled,
        setDisabled,
    }
}