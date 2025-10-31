import { Input, InputProps } from "antd";
import {
	InputHTMLAttributes,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { FloattingLabelBox } from "../FloattingLabelBox";
import { TextAreaProps } from "antd/es/input";
const { TextArea } = Input;

export interface FloatTextAreaProps extends TextAreaProps {}

export function FloatTextArea({
	placeholder,
	onFocus,
	onBlur,
	value,
	defaultValue,
	style,
	size,
	...restProps
}: FloatTextAreaProps) {
	const initFlag = useRef(false);
	const [isFocus, setIsFocus] = useState(false);
	const [inputValue, setInputValue] = useState<
		InputHTMLAttributes<HTMLTextAreaElement>["value"] | bigint
	>(defaultValue ?? value);

	const handleFocus = useCallback<
		Exclude<React.FocusEventHandler<HTMLTextAreaElement>, undefined>
	>(
		(e) => {
			setIsFocus(true);
			if (onFocus) {
				onFocus(e);
			}
		},
		[onFocus]
	);

	const handleBlur = useCallback<
		Exclude<React.FocusEventHandler<HTMLTextAreaElement>, undefined>
	>(
		(e) => {
			setIsFocus(false);
			setInputValue(e.target.value);
			if (onBlur) {
				onBlur(e);
			}
		},
		[onBlur]
	);

	useEffect(() => {
		if (initFlag.current || value) {
			setInputValue(value);
		}
		initFlag.current = true;
		return () => {
			initFlag.current = false;
		};
	}, [value]);

	return (
		<FloattingLabelBox
			label={placeholder}
			focused={isFocus}
			haveValue={!!inputValue}
			width={style?.width}
			height={style?.height}
			status={restProps.status || (restProps["aria-invalid"] ? "error" : undefined)}
		>
			<TextArea
				style={{ ...style, width:"100%", border: "none"}}
				variant="borderless"
				{...restProps}
				onFocus={handleFocus}
				onBlur={handleBlur}
				value={value}
				defaultValue={defaultValue}
				size={size}
			/>
		</FloattingLabelBox>
	);
}
