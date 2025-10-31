import FloatInput from "@/components/Commons/FloatInput";
import { PasswordChangeType } from "@/modules/auth/authorize/authorize.model";
import useAuthorizeService from "@/modules/auth/authorize/authorize.service";
// import useUserService from "@/app/[locale]/admin/user/user.api";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Carousel, FloatButton, Form, message } from "antd";
// import { PasswordChangeType } from "@/app/[locale]/admin/user/user.model";

const ChangePassword = () =>{
    const userService  = useAuthorizeService()


	const [passwordChangeForm] = Form.useForm();


	const onFinish = (passwordChange: PasswordChangeType) => {
        userService
			.passwordChange(passwordChange)
			.then((value) => {
                message.success(value.data.detail)
			})
			.catch((error) => {
				const errors = error.response.data.error.details;
				for (const err in errors) {
					if (err == "non_field_errors") {
						passwordChangeForm.setFields([
							{
								errors: errors[err],
								name: ["root"],
							},
						]);
					} else {
						passwordChangeForm.setFields([
							{
								errors: errors[err],
								name: [err],
							},
						]);
					}
				}
			});

    }

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

    return <>
	<div className="w-full flex flex-col pt-16 px-2 lg:px-16 bg-white  lg:h-screen">

        <div className="w-full mx-auto h-3/4">
            <div className="flex flex-col mx-auto mb-7">
                <h1 className="font-bold text-center text-4xl"> Change Password</h1>
            </div>
            
       
					<Form
						name="basic"
						labelCol={{ span: 8 }}
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						layout="vertical"
						form={passwordChangeForm}
					>
						<label htmlFor="" className="text-left pb-2">Please Enter Your New  Password</label>
		                <Form.Item
							name="new_password1"
							rules={[
								{ required: true, message: "Please input your password!" },
							]}
							hasFeedback
						>
							<FloatInput
								className="h-10 bg-gray-F7"
								label="Password"
								placeholder="Password"
								type="password"
							/>
						</Form.Item>
						<Form.Item
							name="new_password2"
							dependencies={['new_password1']}
							hasFeedback
							rules={[
								{ required: true, message: "Please input your password!" },
								({ getFieldValue }) => ({
									validator(_, value) {
									  if (!value || getFieldValue('new_password1') === value) {
										return Promise.resolve();
									  }
									  return Promise.reject(new Error('The two passwords that you entered do not match!'));
									},
								  }),
							]}
						>
							<FloatInput
								className="h-10 bg-gray-F7"
								label="Repeat Password"
								placeholder="Repeat Password"
								type="password"
							/>
						</Form.Item>

						<Form.Item>
							<Button
								className="bg-tertiary w-full h-12"
								type="primary"
								htmlType="submit"
							>
								Submit
							</Button>
						</Form.Item>
					</Form>
                    </div>

    </div>
	</> 
}

export default ChangePassword;