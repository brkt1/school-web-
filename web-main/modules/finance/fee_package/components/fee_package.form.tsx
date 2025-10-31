"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker, InputNumber } from "antd";
import {FeePackage } from "../fee_package.model";
import "@ant-design/v5-patch-for-react-19";
import useFeePackageService from "../fee_package.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import { Navigations } from "@/utils/common_models/commons.model";
import { PaymentPurpose } from "../fee_package.enum";
import { enumToLabelValueArray } from "@/utils/object";
import LevelSearchInput from "@/modules/lookup/level/components/level.search";
import PackageSearchInput from "@/modules/lookup/package/components/package.search";

interface FeePackageFormProps extends Partial<FeePackage>, Navigations {}

const FeePackageForm: React.FC<FeePackageFormProps> = ({ id, ...props }) => {
  const [form] = Form.useForm<FeePackage>();
  const [data, setData] = useState<FeePackage>();
  const payment_purpose = Form.useWatch('payment_purpose', form)
  const service = useFeePackageService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getFeePackage(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data)
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: FeePackage) => {
    // You can add phone number or date formatting here if needed
    values = {...props, ...values};
    setLoading(true);
    if (id) {
      service.updateFeePackage(id, values)
        .then(() => router.push(props.detail_navigation || `/admin/finance/fee_packages/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addFeePackage(values)
        .then(() => router.push(props.list_navigation || `/admin/finance/fee_packages`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-between">
        <div>
            <h2 className="text-2xl font-bold">FeePackage Form</h2>
        </div>
        <div className="flex gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={props.detail_navigation || `/admin/finance/fee_packages/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={props.list_navigation || `/admin/finance/fee_packages`} type="text">Cancel</Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
        


            

            {!props.name && (
      <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
        <Input />
      </Form.Item>)}

            {!props.payment_purpose &&  <Form.Item
                      name="payment_purpose"
                      label="Payment Purpose"
                      className="w-full"
                      rules={[{ required: true, message: "Payment Purpose is required" }]}
                    >
                      <Select
                        optionFilterProp="label"
                        options={enumToLabelValueArray(PaymentPurpose)}
                        placeholder="Select Payment Purpose"
                      />
          </Form.Item>}
          
            {!props.level && payment_purpose == PaymentPurpose.TUITION && 
            <>
                            <Form.Item
          name="level"
          label="Level"
          rules={[{ required: true, message: "Level is required" }]}
        >
          <LevelSearchInput detail={data?.level_detail} />
        </Form.Item> 
        <Form.Item
          name="package"
          label="Package"
          rules={[{ required: true, message: "Package is required" }]}
        >
          <PackageSearchInput detail={data?.package_detail} />
        </Form.Item>
            </>}

            {!props.fee && (
      <Form.Item name="fee" label="Fee" rules={[{ required: true, message: "Fee is required" }]}>
        <InputNumber className="!w-full" placeholder="Fee" />
      </Form.Item>)}

            {!props.description && (
      <Form.Item className="col-span-2" name="description" label="Description" rules={[{ required: true, message: "Description is required" }]}>
        <Input.TextArea autoSize={{minRows: 2}} />
      </Form.Item>)}
      </div>
    </Form>
  );
};

export default FeePackageForm;
