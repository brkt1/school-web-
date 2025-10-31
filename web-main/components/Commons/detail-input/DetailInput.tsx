'use client'
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  FormItemProps,
  Input,
  InputNumber,
  InputProps,
  Select,
  SelectProps,
} from "antd";
import { InputRef, TextAreaProps } from "antd/es/input";
// import styles from './DetailInput.module.css'
import { PlusOutlined } from "@ant-design/icons";
import { useDetailInput } from "./useDetailInput";

const { TextArea } = Input

const typeComponents = {
  text: <Input />,
  color: <Input type="color" />,
  number: <InputNumber style={{ width: '100%' }} />,
  password: <Input.Password />,
  date: <DatePicker style={{width: "100%"}} 
  format="YYYY-MM-DD" />,
  select: <Select  optionFilterProp="label" style={{width: '100%'}} className="border-none w-full" />,
  textarea: <TextArea />
};

type F = InputProps & SelectProps & TextAreaProps & FormItemProps;

export interface DetailInputProps extends F {
  label?: string;
  type?: keyof typeof typeComponents;
  refs?: React.ForwardedRef<InputRef>;
  onValueChange?: (detailInput: ReturnType<typeof useDetailInput<any>>, value?: any) => void;
  onInputFocus?: (detailInput: ReturnType<typeof useDetailInput<any>>) => void;
  setEdit: (value: boolean) => void;
  handleAdd?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void,
  edit: boolean;
  validator?: any
}

export const DetailInput = (props: DetailInputProps) => {
  const { type = "text" } = props;

  return (
    <div onFocus={() => { props.setEdit(true) }} className={props.className}>
      <Form.Item
        {...{...props, onFocus: undefined}}
        style={{ maxWidth: type == "textarea" ? '' : 320}}
        required={props.edit && props.required}
        // className={`${props.edit || styles.form_detail}`}
        rules={props.rules ? [...props.rules, props.validator] : [props.validator]}
      >
        {React.cloneElement(typeComponents[type], {
          ...props, className: "bg-slate-50",
          dropdownRender: (menu: any) => (<> {(props.options?.length != 0 || !props.searchValue) && <>{menu}</>}
            {props.searchValue && <Button icon={<PlusOutlined />}
              onClick={props.handleAdd}> Add {props.label} <b className="font-extrabold text-custom_blue-100">*{props.searchValue}*</b> </Button>}
          </>), allowClear: props.edit
        })}
      </Form.Item>
    </div>

  );
};
