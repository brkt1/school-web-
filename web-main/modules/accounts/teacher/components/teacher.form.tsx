"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  UploadFile,
  message,
  FormInstance,
} from "antd";
import { Teacher } from "../teacher.model";
import "@ant-design/v5-patch-for-react-19";
import useTeacherService from "../teacher.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import UserSearchInput from "@/modules/auth/user/components/user.search";
import CitySearchInput from "@/modules/organization/city/components/city.search";
import InstitutionSearchInput from "@/modules/organization/institution/components/institution.search";
import RegionSearchInput from "@/modules/organization/region/components/region.search";
import { enumToLabelValueArray } from "@/utils/object";
import { ClassLevel, TeacherType } from "../../student/student.enum";
import PhoneInputWrapper from "@/components/PhoneInput/phoneInput";
import { GenderType } from "@/modules/auth/user/user.enum";
import { UploadOutlined } from "@ant-design/icons";
import { User } from "@/modules/auth/user/user.model";
import { Navigations } from "@/utils/common_models/commons.model";
import LevelSearchInput from "@/modules/lookup/level/components/level.search";
import dayjs from "dayjs";

interface TeacherFormProps
  extends Partial<Teacher & User>,
    Navigations {
      form?: FormInstance<Teacher & User>
      is_client?: boolean
    }


const TeacherForm: React.FC<TeacherFormProps> = ({
  id,
  is_client,
  form: propForm
}) => {
  const [internalForm] = Form.useForm<Teacher & User>();
  const form = propForm || internalForm
  const region = Form.useWatch('region', form)
  const [data, setData] = useState<Teacher>();
  const service = useTeacherService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (id) {
      service
        .getTeacher(id)
        .then((res) => {
          form.setFieldsValue(res.data);
          setData(res.data);
          form.setFieldValue("username", res.data.user_detail.username);
          form.setFieldValue("first_name", res.data.user_detail.first_name);
          form.setFieldValue("middle_name", res.data.user_detail.middle_name);
          form.setFieldValue("last_name", res.data.user_detail.last_name);
          form.setFieldValue("gender", res.data.user_detail.gender);
          form.setFieldValue("email", res.data.user_detail.email);
          form.setFieldValue("phone_number", res.data.user_detail.phone_number);
        })
        .catch(() => {});
    }
  }, [id]);

  const onFinish = (values: Teacher) => {
    // You can add phone number or date formatting here if needed
    if (values.vat_reg_date) {
      values.vat_reg_date = dayjs(values.vat_reg_date).format("YYYY-MM-DD");
    }
    setLoading(true);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key !== "cv" && value != undefined) {
        formData.append(key, value);
      }
    });

    if (fileList?.length > 0) {
      formData.append("cv", fileList[0].originFileObj as File);
    }

    if (id) {
      service
        .updateTeacher(id, formData)
        .then(() => {is_client ? message.success('You are successfully register go to your email to active your account') :router.push(`/admin/accounts/teachers/${id}`)})
        .catch((e) => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service
        .addTeacher(formData)
        .then(() => router.push(`/admin/accounts/teachers`))
        .catch((e) => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      {is_client ? (
        <></>
      ) : (
        <div className="flex justify-end gap-4 mb-4">
          {id ? (
            <Button
              loading={loading}
              href={`/admin/accounts/teachers/${id}`}
              type="text"
            >
              Cancel
            </Button>
          ) : (
            <Button
              loading={loading}
              href={`/admin/accounts/teachers`}
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
      )}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
        <Form.Item
          name="first_name"
          rules={[{ required: true, message: "First name is required" }]}
          label="First Name"
          className="w-full"
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="middle_name"
          rules={[{ required: true, message: "Middle name is required" }]}
          label="Middle Name"
          className="w-full"
        >
          <Input placeholder="Middle Name" />
        </Form.Item>
        <Form.Item name="last_name" label="Last Name" className="w-full"
        rules={[{ required: true, message: "Last name is required" }]}>
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          className="w-full"
          rules={[{ required: true, message: "Gender is required" }]}
        >
          <Select
            optionFilterProp="label"
            options={enumToLabelValueArray(GenderType)}
            placeholder="Gender"
          />
        </Form.Item>
        <Form.Item
          name="username"
          required
          label="Username"
          className="w-full"
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          rules={[{ type: "email" }, {required: true, message: 'Email is required'}]}
          label="Email"
          name="email"
          className="w-full"
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item name="phone_number" label="Phone Number" className="w-full"
        rules={[{ required: true, message: "Phone Number is required" }]}>
          <PhoneInputWrapper datatype="text" placeholder="Phone Number" />
        </Form.Item>

        <Form.Item
          name="level_of_teaching"
          label="Level of Teaching"
          rules={[{ required: true, message: "Level of Teaching is required" }]}
        >
          <LevelSearchInput placeholder="Level of Teaching" />
        </Form.Item>

        {/* <Form.Item
          name="educational_institution"
          label="Educational Institution"
          rules={[{ required: true, message: "Educational Institution is required" }]}
        >
          <Input />
        </Form.Item>  */}

        {/* <Form.Item
          name="institution"
          label="Institution"
          rules={[{ required: true, message: "Institution is required" }]}
        >
          <InstitutionSearchInput detail={data?.institution_detail} />
        </Form.Item> */}

        <Form.Item
          name="region"
          label="Region"
          rules={[{ required: true, message: "Region is required" }]}
        >
          <RegionSearchInput placeholder="Region" detail={data?.region_detail} />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: "City is required" }]}
        >
          <CitySearchInput region={region} detail={data?.city_detail} />
        </Form.Item>

        {/* <Form.Item
          name="woreda"
          label="Woreda"
          rules={[{ required: true, message: "Woreda is required" }]}
        >
          <Input />
        </Form.Item> */}

        {/* <Form.Item name="cv" label="Cv" rules={[]}>
        <Input placeholder="Cv" />
      </Form.Item> */}

        {/* <Form.Item
          name="teacher_type"
          label="Teacher Type"
          rules={[{ required: true, message: "Teacher Type is required" }]}
        >
          <Select
            optionFilterProp="label"
            options={enumToLabelValueArray(TeacherType)}
            placeholder="Teacher Type"
          />
        </Form.Item> */}

        {/* <Form.Item
          name="campus"
          label="Campus"
          rules={[{ required: true, message: "Campus is required" }]}
        >
          <Input />
        </Form.Item> */}

        <Form.Item name="cv" label="CV (PDF)" 
        rules={[{ required: true, message: "CV is required" }]}>
          <Upload
            beforeUpload={() => false}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
          >
            <Button className="w-full" icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="tin_no"
          label="TIN No"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="vat_reg_no"
          label="VAT Reg Number"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="vat_reg_date"
          label="VAT Reg Date"
        >
          <DatePicker />
        </Form.Item>

        {/* <Form.Item name="date" label="Date" rules={[{ required: true, message: "Date is required" }]}>
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="tx_ref" label="Tx Ref" rules={[{ required: true, message: "Tx Ref is required" }]}>
        <Input />
      </Form.Item>

      <Form.Item name="paid" label="Paid" valuePropName="checked" rules={[{ required: true, message: "Paid is required" }]}>
        <Checkbox />
      </Form.Item> */}
      </div>
    </Form>
  );
};

export default TeacherForm;
