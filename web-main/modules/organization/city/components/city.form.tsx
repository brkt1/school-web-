"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import { City } from "../city.model";
import "@ant-design/v5-patch-for-react-19";
import useCityService from "../city.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import RegionSearchInput from "../../region/components/region.search";
import { Navigations } from "@/utils/common_models/commons.model";

interface CityFormProps extends Partial<City>, Navigations {}

const CityForm: React.FC<CityFormProps> = ({ id, ...props }) => {
  const [form] = Form.useForm<City>();
  const [data, setData] = useState<City>();
  const service = useCityService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service
        .getCity(id)
        .then((res) => {
          form.setFieldsValue(res.data);
          setData(res.data);
        })
        .catch(() => {});
    }
  }, [id]);

  const onFinish = (values: City) => {
    // You can add phone number or date formatting here if needed
    values = {...props, ...values};
    setLoading(true);
    if (id) {
      service
        .updateCity(id, values)
        .then(() => router.push(props.detail_navigation || `/admin/organization/citys/${id}`))
        .catch((e) => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service
        .addCity(values)
        .then(() => router.push(props.list_navigation || `/admin/organization/citys`))
        .catch((e) => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <div className="flex justify-end gap-4 mb-4">
        {id ? (
          <Button
            loading={loading}
            href={props.detail_navigation || `/admin/organization/citys/${id}`}
            type="text"
          >
            Cancel
          </Button>
        ) : (
          <Button
            loading={loading}
            href={props.list_navigation || `/admin/organization/citys`}
            type="text"
          >
            Cancel
          </Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input />
        </Form.Item>
        {!props.region && (
          <Form.Item
            name="region"
            label="Region"
            rules={[{ required: true, message: "Region is required" }]}
          >
            <RegionSearchInput
              detail={data?.region_detail}
              className="min-w-sm"
            />
          </Form.Item>
        )}
      </div>
    </Form>
  );
};

export default CityForm;
