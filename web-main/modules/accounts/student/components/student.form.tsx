"use client";

import PhoneInputWrapper from "@/components/PhoneInput/phoneInput";
import { GenderType } from "@/modules/auth/user/user.enum";
import { User } from "@/modules/auth/user/user.model";
import CitySearchInput from "@/modules/organization/city/components/city.search";
import InstitutionSearchInput from "@/modules/organization/institution/components/institution.search";
import RegionSearchInput from "@/modules/organization/region/components/region.search";
import useHandleError from "@/utils/api/handleError";
import { Navigations } from "@/utils/common_models/commons.model";
import { enumToLabelValueArray } from "@/utils/object";
import "@ant-design/v5-patch-for-react-19";
import { Button, DatePicker, Form, FormInstance, Input, Select } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { StudentType } from "../student.enum";
import { Student } from "../student.model";
import useStudentService from "../student.service";

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
  const prevRegionRef = React.useRef<string | undefined>(undefined);

  // Clear city when region changes
  useEffect(() => {
    if (prevRegionRef.current !== undefined && prevRegionRef.current !== region) {
      form.setFieldValue('city', undefined);
    }
    prevRegionRef.current = region;
  }, [region, form]);
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
          if (res.data.institution) {
            form.setFieldValue("institution", res.data.institution);
          }
          if (res.data.woreda) {
            form.setFieldValue("woreda", res.data.woreda);
          }
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
    <Form form={form} onFinish={onFinish} layout="vertical" className="modern-form">
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
      
      {/* Personal Information Section */}
      {is_client && (
        <div className="form-section">
          <h3 className="form-section__title">Personal Information</h3>
          <p className="form-section__subtitle">Please provide your basic personal details</p>
        </div>
      )}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Form.Item
            name="first_name"
            rules={[{ required: true, message: "First name is required" }]}
            label={
              <span>
                First Name <span className="text-red-500">*</span>
              </span>
            }
            className="w-full modern-form-item"
          >
            <Input placeholder="Enter your first name" size="large" />
          </Form.Item>
          
          <Form.Item
            name="middle_name"
            label={
              <span>
                Middle Name <span className="text-gray-400 text-xs">(Optional)</span>
              </span>
            }
            className="w-full modern-form-item"
          >
            <Input placeholder="Enter your middle name" size="large" />
          </Form.Item>
          
          <Form.Item 
            name="last_name" 
            label={
              <span>
                Last Name <span className="text-gray-400 text-xs">(Optional)</span>
              </span>
            } 
            className="w-full modern-form-item"
          >
            <Input placeholder="Enter your last name" size="large" />
          </Form.Item>

          <Form.Item
            name="gender"
            label={
              <span>
                Gender <span className="text-red-500">*</span>
              </span>
            }
            className="w-full modern-form-item"
            rules={[{ required: true, message: "Gender is required" }]}
          >
            <Select
              size="large"
              showSearch
              allowClear
              optionFilterProp="label"
              options={enumToLabelValueArray(GenderType)}
              placeholder="Select your gender"
            />
          </Form.Item>
        </div>
      </div>

      {/* Account Information Section */}
      {is_client && (
        <div className="form-section mt-8">
          <h3 className="form-section__title">Account Information</h3>
          <p className="form-section__subtitle">Create your account credentials</p>
        </div>
      )}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Form.Item
          name="username"
          label={
            <span>
              Username <span className="text-red-500">*</span>
            </span>
          }
          className="w-full modern-form-item"
          rules={[
            { required: true, message: "Username is required" },
            { min: 3, message: "Username must be at least 3 characters" }
          ]}
        >
          <Input placeholder="Choose a username" size="large" />
        </Form.Item>
        
        <Form.Item
          rules={[
            { type: "email", message: "Please enter a valid email address" }
          ]}
          label={
            <span>
              Email <span className="text-gray-400 text-xs">(Optional)</span>
            </span>
          }
          name="email"
          className="w-full modern-form-item"
        >
          <Input type="email" placeholder="your.email@example.com" size="large" />
        </Form.Item>

        <Form.Item 
          name="phone_number" 
          label={
            <span>
              Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
            </span>
          } 
          className="w-full modern-form-item"
        >
          <PhoneInputWrapper placeholder="Enter your phone number" />
        </Form.Item>
        </div>
      </div>

      {/* Academic Information Section */}
      {is_client && (
        <div className="form-section mt-8">
          <h3 className="form-section__title">Academic Information</h3>
          <p className="form-section__subtitle">Tell us about your academic background</p>
        </div>
      )}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Form.Item
            name="institution"
            label={
              <span>
                Institution <span className="text-red-500">*</span>
              </span>
            }
            className="w-full modern-form-item"
            rules={[{ required: true, message: "Institution is required" }]}
          >
            <InstitutionSearchInput placeholder="Select institution" detail={data?.institution_detail} />
          </Form.Item>

          <Form.Item
            name="grade"
            label={
              <span>
                Grade <span className="text-red-500">*</span>
              </span>
            }
            className="w-full modern-form-item"
            rules={[{ required: true, message: "Grade is required" }]}
          >
            <Input placeholder="Enter your grade" size="large" />
          </Form.Item>

          <Form.Item
            name="student_type"
            label={
              <span>
                Class Type <span className="text-red-500">*</span>
              </span>
            }
            className="w-full modern-form-item"
            rules={[{ required: true, message: "Class Type is required" }]}
          >
            <Select
              size="large"
              showSearch
              allowClear
              optionFilterProp="label"
              options={enumToLabelValueArray(StudentType)}
              placeholder="Select class type"
            />
          </Form.Item>
        </div>
      </div>

      {/* Location Information Section */}
      {is_client && (
        <div className="form-section mt-8">
          <h3 className="form-section__title">Location Information</h3>
          <p className="form-section__subtitle">Where are you located?</p>
        </div>
      )}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Form.Item
            name="region"
            label={
              <span>
                Region <span className="text-red-500">*</span>
              </span>
            }
            className="w-full modern-form-item"
            rules={[{ required: true, message: "Region is required" }]}
          >
            <RegionSearchInput placeholder="Select region" detail={data?.region_detail} />
          </Form.Item>

          <Form.Item
            name="city"
            label={
              <span>
                City <span className="text-red-500">*</span>
              </span>
            }
            className="w-full modern-form-item"
            rules={[{ required: true, message: "City is required" }]}
          >
            <CitySearchInput placeholder="Select city" region={region} detail={data?.city_detail} />
          </Form.Item>

          <Form.Item
            name="woreda"
            label={
              <span>
                Woreda <span className="text-gray-400 text-xs">(Optional)</span>
              </span>
            }
            className="w-full modern-form-item"
          >
            <Input placeholder="Enter woreda" size="large" />
          </Form.Item>
        </div>
      </div>

      {/* Business Information Section (Optional) */}
      {is_client && (
        <div className="form-section mt-8">
          <h3 className="form-section__title">
            Business Information 
            <span className="text-gray-400 text-xs font-normal ml-2">(Optional)</span>
          </h3>
          <p className="form-section__subtitle">Only fill this if applicable for business purposes</p>
        </div>
      )}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Form.Item
          name="tin_no"
          label={
            <span>
              TIN Number <span className="text-gray-400 text-xs">(Optional)</span>
            </span>
          }
          className="w-full modern-form-item"
        >
          <Input placeholder="Enter TIN number" size="large" />
        </Form.Item>

        <Form.Item
          name="vat_reg_no"
          label={
            <span>
              VAT Registration Number <span className="text-gray-400 text-xs">(Optional)</span>
            </span>
          }
          className="w-full modern-form-item"
        >
          <Input placeholder="Enter VAT registration number" size="large" />
        </Form.Item>

        <Form.Item
          name="vat_reg_date"
          label={
            <span>
              VAT Registration Date <span className="text-gray-400 text-xs">(Optional)</span>
            </span>
          }
          className="w-full modern-form-item"
        >
          <DatePicker size="large" className="w-full" placeholder="Select date" />
        </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default StudentForm;
