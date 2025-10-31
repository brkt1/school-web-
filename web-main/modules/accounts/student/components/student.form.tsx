"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, DatePicker, FormInstance } from "antd";
import { Student } from "../student.model";
import "@ant-design/v5-patch-for-react-19";
import useStudentService from "../student.service";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import CitySearchInput from "@/modules/organization/city/components/city.search";
import InstitutionSearchInput from "@/modules/organization/institution/components/institution.search";
import RegionSearchInput from "@/modules/organization/region/components/region.search";
import { enumToLabelValueArray } from "@/utils/object";
import { StudentType } from "../student.enum";
import { GenderType } from "@/modules/auth/user/user.enum";
import PhoneInputWrapper from "@/components/PhoneInput/phoneInput";
import { User } from "@/modules/auth/user/user.model";
import { Navigations } from "@/utils/common_models/commons.model";
import dayjs from "dayjs";

interface StudentFormProps
  extends Partial<Student & User>,
    Navigations {
      form?: FormInstance<Student & User>
      is_client?: boolean
    }

const StudentForm: React.FC<StudentFormProps> = ({
  id,
  is_client,
  form: propForm
}) => {
  const [internalForm] = Form.useForm<Student & User>();
  const form = propForm || internalForm
  const region = Form.useWatch('region', form)
  const [data, setData] = useState<Student>();
  const service = useStudentService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service
        .getStudent(id)
        .then((res) => {
          setData(res.data);
          form.setFieldsValue(res.data);
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

  const onFinish = (values: Student & User) => {
    // You can add phone number or date formatting here if needed
    if (values.vat_reg_date) {
      values.vat_reg_date = dayjs(values.vat_reg_date).format("YYYY-MM-DD");
    }
    setLoading(true);
    if (id) {
      service
        .updateStudent(id, values)
        .then(() => router.push(`/admin/accounts/students/${id}`))
        .catch((e) => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service
        .addStudent(values)
        .then(() => router.push(`/admin/accounts/students`))
        .catch((e) => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      {is_client ? (
        <></>
      ) : (
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-bold">Student Form</h2>
          </div>
          <div className="flex gap-4 mb-4">
            {id ? (
              <Button
                loading={loading}
                href={`/admin/accounts/students/${id}`}
                type="text"
              >
                Cancel
              </Button>
            ) : (
              <Button
                loading={loading}
                href={`/admin/accounts/students`}
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
        <Form.Item name="last_name" label="Last Name" className="w-full">
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
          rules={[{ type: "email" }]}
          label="Email"
          name="email"
          className="w-full"
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item name="phone_number" label="Phone Number" className="w-full">
          <PhoneInputWrapper placeholder="Phone Number" />
        </Form.Item>

        <Form.Item
          name="grade"
          label="Grade"
          rules={[{ required: true, message: "Grade is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="region"
          label="Region"
          rules={[{ required: true, message: "Region is required" }]}
        >
          <RegionSearchInput detail={data?.region_detail} />
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

        {/* <Form.Item
          name="parents_phonenumber"
          label="Parents Phone Number"
          rules={[
            { required: true, message: "Parents Phone Number is required" },
          ]}
        >
          <PhoneInputWrapper placeholder="Phone Number" />
        </Form.Item> */}

        <Form.Item
          name="student_type"
          label="Class Type"
          rules={[{ required: true, message: "Class Type is required" }]}
        >
          <Select
            optionFilterProp="label"
            options={enumToLabelValueArray(StudentType)}
            placeholder="Student Type"
          />
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

        {/* <Form.Item
          name="institution"
          label="Institution"
          rules={[{ required: true, message: "Institution is required" }]}
        >
          <InstitutionSearchInput detail={data?.institution_detail} />
        </Form.Item> */}
      </div>
      {/* {is_client ? (
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      ) : (
        <></>
      )} */}
    </Form>
  );
};

export default StudentForm;
