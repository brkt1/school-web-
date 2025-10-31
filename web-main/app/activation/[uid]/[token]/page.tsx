"use client";
import { Button, Carousel, Form, message } from "antd";
import FloatInput from "@/components/Commons/FloatInput";
import { useParams, useRouter } from "next/navigation";
import { UserActivaion } from "@/modules/auth/authorize/authorize.model";
import useAuthorizeService from "@/modules/auth/authorize/authorize.service";
import { useState } from "react";

export default function Actuvation() {
  const userService = useAuthorizeService();
  const [activationForm] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();

  const onFinish = (value: UserActivaion) => {
    value.token = params.token as string;
    value.uid = params.uid as string;
    setLoading(true);
    userService
      .activateUser(value)
      .then((value) => {
        router.replace("/login");
      })
      .catch((error) => {
        const errors = error.response.data.error.details;
        for (const err in errors) {
          if (err == "non_field_errors") {
            activationForm.setFields([
              {
                errors: errors[err],
                name: ["root"],
              },
            ]);
          } else if (err == "uid" || err == "token") {
            message.error(
              "The link is expired or invalid, please reset again!"
            );
          } else {
            activationForm.setFields([
              {
                errors: errors[err],
                name: [err],
              },
            ]);
          }
        }
        // loading.stopLoading()
      }).finally(() => {
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #ed5900 40%, #f7b733 100%)",
      }}
      className="h-screen w-screen flex items-center justify-center"
    >
      <div className="w-xl">
        <div className="flex flex-wrap  bg-white py-2 px-4 rounded-2xl">
          {/* <div className="w-full hidden sm:block lg:w-3/5">
				<Carousel autoplay infinite>
					<div className="bg-[url('/images/login-1.jpg')] h-96 lg:h-screen w-full bg-cover bg-center"></div>
					<div className="bg-[url('/images/login-2.jpg')] h-96 lg:h-screen w-full bg-cover bg-center"></div>
				</Carousel>
			</div> */}
          <div className="flex flex-col w-full mx-auto">
            <div className="">
              <div className="flex flex-col mx-auto mb-7">
                <h1 className="text-4xl font-bold text-center italic text-primary">Welcome Back</h1>
                <p className="text-center text-primary">Add New Password</p>
              </div>
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                form={activationForm}
              >
                <Form.Item
                  name="new_password1"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                  hasFeedback
                >
                  <FloatInput
                    className="custom-input bg-gray-F7"
                    label="Password"
                    placeholder="Password"
                    type="password"
                  />
                </Form.Item>
                <Form.Item
                  name="new_password2"
                  dependencies={["new_password1"]}
                  hasFeedback
                  rules={[
                    { required: true, message: "Please input your password!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          !value ||
                          getFieldValue("new_password1") === value
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <FloatInput
                    className="custom-input bg-gray-F7"
                    label="Repeat Password"
                    placeholder="Repeat Password"
                    type="password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    loading={loading}
                    className="bg-tertiary w-full h-12"
                    type="primary"
                    htmlType="submit"
                  >
                    Activate
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
