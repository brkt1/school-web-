"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import {Institution } from "../institution.model";
import "@ant-design/v5-patch-for-react-19";
import useInstitutionService from "../institution.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import CitySearchInput from "../../city/components/city.search";
import RegionSearchInput from "../../region/components/region.search";
import { enumToLabelValueArray } from "@/utils/object";
import { InstitutionLevel } from "../institution.enum";
import { Navigations } from "@/utils/common_models/commons.model";
import LevelSearchInput from "@/modules/lookup/level/components/level.search";

interface InstutionFormProps extends Partial<Institution>, Navigations {}

const InstitutionForm: React.FC<InstutionFormProps> = ({ id, ...props }) => {
  const [form] = Form.useForm<Institution>();
  const region = Form.useWatch('region', form)
  const [data, setData] = useState<Institution>();
  const service = useInstitutionService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service.getInstitution(id)
        .then(res => {
          form.setFieldsValue(res.data);
          setData(res.data);
        })
        .catch(() => {})
    }
  }, [id]);

  const onFinish = (values: Institution) => {
    // You can add phone number or date formatting here if needed
    values = {...props, ...values};
    setLoading(true);
    if (id) {
      service.updateInstitution(id, values)
        .then(() => router.push(props.detail_navigation || `/admin/organization/institutions/${id}`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service.addInstitution(values)
        .then(() => router.push(props.list_navigation || `/admin/organization/institutions`))
        .catch(e => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" >
      <div className="flex justify-between">
        <div>
            <h2 className="text-2xl font-bold">Insitution Form</h2>
        </div>
        <div className="flex gap-4 mb-4">
        {id ? (
          <Button loading={loading} href={props.detail_navigation || `/admin/organization/institutions/${id}`} type="text">Cancel</Button>
        ) : (
          <Button loading={loading} href={props.list_navigation || `/admin/organization/institutions`} type="text">Cancel</Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
        
    
      <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
        <Input />
      </Form.Item>

      <Form.Item  name="level" label="Level" rules={[{ required: true, message: "Level is required" }]}>
         <LevelSearchInput mode="multiple" placeholder="Level" detail={data?.level_detail} />
      </Form.Item>

      {!props.city &&

        (<Form.Item name="region" label="Region" rules={[{ required: true, message: "Region is required" }]}>
            <RegionSearchInput detail={data?.region_detail} />
        </Form.Item>)}
        {!props.city &&(
        <Form.Item name="city" label="City" rules={[{ required: true, message: "City is required" }]}>
            <CitySearchInput region={region} detail={data?.city_detail} />
        </Form.Item>)

      }

      {/* <Form.Item name="woreda" label="Woreda" rules={[{ required: true, message: "Woreda is required" }]}>
        <Input />
      </Form.Item> */}
      </div>
    </Form>
  );
};

export default InstitutionForm;
