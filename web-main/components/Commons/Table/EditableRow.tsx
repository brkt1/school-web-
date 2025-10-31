import { Form, FormInstance } from "antd";
import { useDetailInput } from "../detail-input/useDetailInput";
import React, { FormEventHandler, useEffect } from "react";

interface EditableRowProps {
  index: number;
  data: any,
  onSubmit: FormEventHandler<any>;
}

export const EditableContext = React.createContext<ReturnType<
  typeof useDetailInput
> | null>(null);

export const EditableRow: React.FC<EditableRowProps> = ({
  index,
  onSubmit,
  data,
  ...props
}) => {
  const detailInput = useDetailInput();
  const onFinish = (value: any) => {
    onSubmit(value)
    resetFields();
  };

  useEffect(() => {
    detailInput.resetFields();
  }, [data])

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const resetFields = () => {
    detailInput.resetFields();
    detailInput.setEdit(false)
  }

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{...data}}
      layout="horizontal"
      form={detailInput}
      component={false}
      onBlur={() => console.log("blur")}
      onMouseUp={() => console.log("yes")}
    >
      <EditableContext.Provider value={detailInput}>
        <tr  {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
