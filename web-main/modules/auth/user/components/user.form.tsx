"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { User } from "../user.model";
import "@ant-design/v5-patch-for-react-19";
import useUserService from "../user.service";
import PhoneInput from "antd-phone-input";
import { GenderType, UserType } from "../user.enum";
import { enumToLabelValueArray } from "@/utils/object";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import { phoneNumberString } from "@/utils/stringUtills";

const UserForm: React.FC<{ id?: string }> = ({ id }) => {
  const [form] = Form.useForm<User>();
  const userService = useUserService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, []);

  const fetchData = (id: string) => {
    setLoading(true);
    userService
      .getUser(id)
      .then((res) => {
        form.setFieldsValue(res.data);
      })
      .catch((e) => {
      })
      .finally(() => setLoading(false));;
  };

  const updateData = (id: string, values: User) => {
    setLoading(true)
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key !== "profile_pic") {
        formData.append(key, value);
      }
    });
    userService.updateUser(id, formData).then((res) => {
      router.push(`/admin/users/${id}`)
    }).catch((e) => {
      errorHandler.handleError(e, form)
    })
    .finally(() => setLoading(false));
  }

  const addData = (value: User) => {
    setLoading(true)
    userService.addUser(value).then((res) => {
      router.push(`/admin/users`)
    }).catch((e) => {
      errorHandler.handleError(e, form)
    })
    .finally(() => setLoading(false));
  }

  const onFinish = (value: User) => {
    value.phone_number = phoneNumberString(value.phone_number)
    if(id){
      updateData(id, value)
    } else {
      addData(value)
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <div className="flex justify-end gap-4">
        {id ? (
          <Button loading={loading} href={`/admin/users/${id}`} type="text">
            Cancel
          </Button>
        ) : (
          <Button loading={loading} href="/admin/users" type="text">
            Cancel
          </Button>
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </div>
      <div className="flex gap-4">
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
      </div>
      <div className="flex gap-4">
        <Form.Item name="gender" label="Gender" className="w-full">
            <Select
              optionFilterProp="label"
              options={enumToLabelValueArray(GenderType)}
              placeholder="Gender"
            />
          </Form.Item>
        <Form.Item name="username" required label="Username" className="w-full">
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          rules={[{ type: "email" }]}
          required
          label="Email"
          name="email"
          className="w-full"
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
      </div>
      <div className="flex gap-4">
        <Form.Item name="phone_number" label="Phone Number" className="w-full">
          <PhoneInput datatype="text" placeholder="Phone Number" />
        </Form.Item>
        <div className="w-full flex gap-4">
          <Form.Item name="user_type" label="User Type" className="w-full">
            <Select
              optionFilterProp="label"
              options={enumToLabelValueArray(UserType)}
              placeholder="User Type"
            />
          </Form.Item>
          <div className="w-full flex gap-4">
            <Form.Item
              name="is_superuser"
              label="Super User"
              className="w-full"
              valuePropName="checked"
            >
              <Checkbox  />
            </Form.Item>
            <Form.Item valuePropName="checked" name="is_staff" label="Is Staff" className="w-full">
              <Checkbox />
            </Form.Item>
          </div>
        </div>
      </div>
      <Form.Item name="bio" label="Bio">
        <Input.TextArea autoSize={{minRows: 5}} />
      </Form.Item>
    </Form>
  );
};

export default UserForm;
