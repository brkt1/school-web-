import { useContext } from "react";
import { DetailInput, DetailInputProps } from "../detail-input/DetailInput";
import { EditableContext } from "./EditableRow";
import { ColumnType } from "antd/es/table";
import { Button } from "antd";
import {CheckOutlined} from '@ant-design/icons'

export interface EditColumnsType<T> extends ColumnType<T> {
  title?: any;
  children?: any;
  index?: number;
  detail_input?: Partial<DetailInputProps>;
  data?: any;
  record?: any;
  type?: "submit";
}

export const EditableCell = (props: EditColumnsType<unknown>) => {
  const { detail_input, children, dataIndex, index, type, ...restProps } =
    props;
  const form = useContext(EditableContext);
  const content = restProps?.data?.content || [];
  let childNode = children;
  if (detail_input && form) {
    childNode = <DetailInput {...form} {...detail_input} onChange={(e) => detail_input.onValueChange?.(form, e)} onFocus={(e) => detail_input.onInputFocus?.(form)}/>;
  }
  if (form) {
    if (form.edit && type == "submit") {
      childNode = <Button type="text" onClick={form.submit}><CheckOutlined color="green" /></Button>;
    } else if(type == 'submit') {
      childNode = props.render && props.render(null, props.record, index || 0) as any
    }
  }

  if (dataIndex === "rangeOmzetUpper" && index === content?.length - 1) {
    childNode = <></>;
  }
  return <td {...restProps} align="center">{childNode}</td>;
};
