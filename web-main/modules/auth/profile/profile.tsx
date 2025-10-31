"use client";

import { useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Card,
  Upload,
  Row,
  Col,
  Typography,
  Space,
  message,
  Divider,
} from "antd";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import dayjs from "dayjs";
import { AppState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { GenderType } from "../user/user.enum";
import { enumToLabelValueArray } from "@/utils/object";
import useUserService from "../user/user.service";
import { User } from "../user/user.model";
import { getUser } from "@/store/slices/userSlices";
import ChangePassword from "@/components/Commons/ChangePassword/ChangePassword";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function ProfilePage() {
  const user = useSelector((state: AppState) => state?.user);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const userService = useUserService();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = async (values: User) => {
    setLoading(true);
    values.date_of_birth = dayjs(values.date_of_birth)?.format("YYYY-MM-DD");
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key !== "profile_pic") {
        formData.append(key, value);
      }
    });
    if (fileList?.length > 0 && fileList[0].originFileObj) {
      formData.append("profile_pic", fileList[0].originFileObj as File);
    }
    try {
      userService.updateUser(user.id, formData).then((res) => {
        console.log("Profile updated:", res.data);
        dispatch(getUser({ ...res.data }));
      });
      message.success("Profile updated successfully!");

      // Here you would make your actual API call to update the profile
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Card>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Title level={2}>Profile Settings</Title>
          <Text type="secondary">
            Update your personal information and preferences
          </Text>
        </div>

        <Divider />

        {/* Profile Form */}
        <Form
          form={form}
          layout="vertical"
          initialValues={{ ...user, date_of_birth: dayjs(user.date_of_birth) }}
          onFinish={handleSubmit}
          size="large"
        >
          <Form.Item
            className="flex w-full justify-center"
            name="profile_pic"
            label="Image"
            rules={[]}
          >
            <Upload
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              listType="picture-card"
              className="min-h-60"
              multiple={false}
              showUploadList={{
                showDownloadIcon: false,
              }}
              onRemove={(file) => {
                setFileList([]);
              }}
              beforeUpload={(file) => {
                setFileList([file]);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Upload File</Button>
            </Upload>
          </Form.Item>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please enter your username!" },
                  {
                    max: 200,
                    message: "Username cannot exceed 200 characters!",
                  },
                ]}
              >
                <Input placeholder="Enter your username" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="First Name"
                name="first_name"
                rules={[
                  { required: true, message: "Please enter your first name!" },
                  {
                    max: 200,
                    message: "First name cannot exceed 200 characters!",
                  },
                ]}
              >
                <Input placeholder="Enter your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Middle Name"
                name="middle_name"
                rules={[
                  { required: true, message: "Please enter your middle name!" },
                  {
                    max: 200,
                    message: "Middle name cannot exceed 200 characters!",
                  },
                ]}
              >
                <Input placeholder="Enter your middle name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Last Name"
                name="last_name"
                rules={[
                  {
                    max: 200,
                    message: "Last name cannot exceed 200 characters!",
                  },
                ]}
              >
                <Input placeholder="Enter your last name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Enter your email address" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Phone Number"
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                  {
                    max: 200,
                    message: "Phone number cannot exceed 200 characters!",
                  },
                ]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Date of Birth" name="date_of_birth">
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Select your date of birth"
                  disabledDate={(current) =>
                    current && current > dayjs().endOf("day")
                  }
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Gender" name="gender">
                <Select
                  placeholder="Select your gender"
                  optionFilterProp="label"
                  options={enumToLabelValueArray(GenderType)}
                ></Select>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label="Bio"
                name="bio"
                rules={[
                  { max: 1500, message: "Bio cannot exceed 1500 characters!" },
                ]}
              >
                <TextArea
                  autoSize={{ minRows: 4 }}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  showCount
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <div style={{ textAlign: "right" }}>
            <Space>
              <Button size="large" onClick={() => form.resetFields()}>
                Reset
              </Button>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
      <ChangePassword />
    </div>
  );
}
