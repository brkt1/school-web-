"use client";
import { Button, Card, Carousel, Checkbox, Form, message } from "antd";
import { useState } from "react";
import { isVisible } from "@/utils/visibility";
import useHandleError from "@/utils/api/handleError";
import {
  AppleOutlined,
  GoogleOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getUser } from "@/store/slices/userSlices";
import { FloatInput } from "@/components/Commons/FloatLabel/component/FloatInput";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FloatPassword } from "@/components/Commons/FloatLabel";
import { useRouter } from "next/navigation";
import { AuthUser, UserLogin } from "@/modules/auth/authorize/authorize.model";
import useAuthorizeService from "@/modules/auth/authorize/authorize.service";
import { tokenKey, refreshKey } from "@/utils/api/api";
import "@ant-design/v5-patch-for-react-19";
import { UserType } from "../user/user.enum";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const authService = useAuthorizeService();
  const [loginForm] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const handleError = useHandleError();
  const [errors, setErrors] = useState<string[]>([]);

const addToken = (value: AuthUser) => {
  localStorage.setItem(tokenKey, value.access_token);
  localStorage.setItem(refreshKey, value.refresh_token);

  dispatch(
    getUser({
      ...value.user,
      phone_number: value.user.phone_number as string,
    })
  );

  if (value.user.is_staff) {
    router.replace("/admin");    // ✅ replace instead of push
    router.refresh();            // ensure fresh data
  } else if (value.user.user_type === UserType.TEACHER) {
    router.replace("/teacher");
    router.refresh();
  } else if (value.user.user_type === UserType.STUDENT) {
    router.replace("/student");
    router.refresh();
  } else {
    router.replace("/");
    router.refresh();
  }
};


  const onFinish = (values: UserLogin) => {
    if (isLogin) {
      setLoading(true);
      authService
        .login(values)
        .then(({ data: value }) => {
          if (value.refresh_token) {
            addToken(value);
          }
        })
        .catch((error) => {
          if (error?.response?.data?.error?.details?.non_field_errors) {
            setErrors(error?.response?.data?.error?.details?.non_field_errors);
          }

          handleError.handleError(error, loginForm);
        }).finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      authService.resetPassword(values.email).then(({ data: value }) => {
        message.success(value.detail);
        setIsLogin(!isLogin);
      }).catch((error) => {
        if (error?.response?.data?.error?.details?.non_field_errors) {
          setErrors(error?.response?.data?.error?.details?.non_field_errors);
        } else {
          handleError.handleError(error, loginForm);
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const changeForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-wrap bg-white py-2 px-4 rounded-2xl">
      {/* <div className="hidden w-3/5 h-full lg:block ">
				<Carousel autoplay infinite>
					<div className="bg-[url('/images/logo.png')] h-96 lg:h-screen w-full bg-cover bg-center"></div>
					<div className="bg-[url('/web/images/bg-14.png')] h-96 lg:h-screen w-full bg-cover bg-center"></div>
				</Carousel>
			</div> */}
      <div className="flex flex-col w-full mx-auto">
        <div>
          <div className="flex flex-col mx-auto mb-7">
            <h1 className="text-4xl font-bold text-center italic text-primary">
              {isLogin ? "Take The Stage" : "Reset Password"}
            </h1>
            <p className="text-center text-primary">
              {isLogin
                ? "Please Signin into your account"
                : "Please Enter your account email"}
            </p>
          </div>
          <div className="mb-2">
            {errors &&
              errors?.map((msg, index) => (
                <p
                  key={index}
                  className="text-red-5 border rounded-xl border-red-1 p-2"
                >
                  {msg}
                </p>
              ))}
          </div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            form={loginForm}
            id="login"
          >
            <Form.Item
              className={`${isVisible(isLogin)}`}
              name="username"
              rules={[
                {
                  type: "string",
                  required: isLogin,
                  message: "Please input your username!",
                },
              ]}
            >
              <FloatInput className="py-2" placeholder="Username" />
            </Form.Item>

            <Form.Item
              className={`${isVisible(isLogin)}`}
              name="password"
              rules={[
                { required: isLogin, message: "Please input your password!" },
              ]}
            >
              <FloatPassword
                className="py-2"
                placeholder="Password"
                type="password"
              />
            </Form.Item>

            <Form.Item
              className={`${isVisible(!isLogin)}`}
              name="email"
              rules={[
                {
                  type: "email",
                  required: !isLogin,
                  message: "Please input your email!",
                },
              ]}
            >
              <FloatInput
                className="bg-gray-F7"
                placeholder="Email Address"
                name="email"
              />
            </Form.Item>

            <div className={`flex justify-between ${isVisible(isLogin)}`}>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Button
                type="link"
                onClick={() => changeForm()}
                className="text-text-secondary dark:text-dark-text-secondary"
              >
                Forgot Password?
              </Button>
            </div>

            <div
              className={`flex justify-between text-xl ${isVisible(!isLogin)}`}
            >
              <Button
                type="link"
                onClick={() => changeForm()}
                className="font-bold text-text-secondary dark:text-dark-text-secondary"
              >
                Back to Login?
              </Button>
            </div>

            <Form.Item>
              <Button
                loading={loading}
                className="w-full h-12 bg-tertiary"
                type="primary"
                htmlType="submit"
              >
                {isLogin ? "Login" : "Send"}
              </Button>
            </Form.Item>
          </Form>
          {/* <Card>
            <p className="text-center">
              If you don<span>&apos;</span>t hove an account,
              <Button type="link" className="p-0 font-bold text-tertiary">
                Register Here
              </Button>
            </p>
            <div className="flex flex-col items-center text-text-secondary dark:text-dark-text-secondary">
              <p>or continue with</p>
              <div className="flex gap-3 my-5">
                <FacebookFilled
                  style={{ fontSize: 28, color: "blue", borderRadius: "100%" }}
                />
                <AppleOutlined
                  style={{ fontSize: 28, color: "black", borderRadius: "100%" }}
                />
                <GoogleOutlined
                  style={{ fontSize: 28, color: "red", borderRadius: "100%" }}
                />
              </div>
            </div>
          </Card> */}
        </div>
      </div>
    </div>
  );
}
