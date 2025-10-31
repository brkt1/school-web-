import React, { ForwardedRef, ReactElement, ReactNode, useState } from "react";
import {
	DatePickerProps,
	Input,
	InputNumber,
	InputProps,
	Select,
	SelectProps,
} from "antd";
import { DatePicker } from "antd";
import { InputRef, TextAreaProps } from "antd/es/input";
import { CloseCircleOutlined } from "@ant-design/icons";

const {TextArea} = Input

const typeComponents = {
	text: <Input />,
	number: <InputNumber />,
	password: <Input.Password />,
	date: <DatePicker/>,
	select: <Select optionFilterProp="label" />,
	textarea: <TextArea />
};

type F = InputProps & SelectProps & TextAreaProps ;

export interface FloatInputProps extends F {
	label?: string;
	type?: keyof typeof typeComponents;
	refs?: React.ForwardedRef<InputRef>;
}

const FloatInput = (props: FloatInputProps) => {
	const [focus, setFocus] = useState(false);

	let { label="", value, placeholder, required, type = "text" } = props;

	if (!placeholder) placeholder = label;

	const isOccupied =
		props.prefix || focus || (value && value.toString()?.length !== 0) || value == 0;

	const labelClass = isOccupied ? "label as-label" : "label as-placeholder";

	const requiredMark = required ? <span className="text-danger">*</span> : null;

	return (
		<div
			className={`float-label ` + props.className}
			onBlur={() => setFocus(false)}
			onFocus={() => setFocus(true)}
		>
			{React.cloneElement(typeComponents[type], { ...props, placeholder: "", clearicon:<CloseCircleOutlined className="text-red-600" />})}
			<label className={labelClass}>
				{isOccupied ? label : placeholder} {requiredMark}
			</label>
		</div>
	);
};

export default FloatInput;
