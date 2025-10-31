"use client";

// import useCompanySubscription from "@/app/admin/company/email-subscription/email-subscription.api";
// import { CompanySubscriptionType } from "@/app/admin/company/email-subscription/email-subscription.model";
import { Space, Button, Input, message, Form } from "antd";
import { FloatInput } from "../FloatLabel";

type Props = {
    hide_title?: boolean;
    title?: string;
    className?: string;
};
export const StayUpToDate: React.FC<Props> = (props: Props) => {
    // const emailSubService = useCompanySubscription();
    // const [form] = Form.useForm<CompanySubscriptionType>();

    // const subscribe = (val:CompanySubscriptionType) => {
    //     console.log(val);
    //     emailSubService.addCompanySubscription(val).then(res => {
    //         if (res.status) {
    //             message.success('Thank you! You have subscribed to our company successfuly!');
    //         }
    //     }).catch(e=>{
    //         console.log('e==> ',e);
            
    //     })
    // }


    return (
        <>
            <div className=" my-20">
                <div className={`bg-primary text-white rounded-md py-5 px-5 sm:px-10 flex flex-col sm:flex-row gap-2 justify-between sm:items-center border-solid border-gray-300 border-1 ${props.className}`}>
                    <div className="">
                        <p className="text-fs5"> Stay Up to date</p>
                        <p className="text-fs1 text-[#EAEDF3]">For any news and events at RAKAN</p>
                    </div>
                    <div>
                        <Form
                            layout="vertical"
                            className=" "
                            // onFinish={subscribe}
                            // form={form}
                        >
                            <Space.Compact style={{ width: '100%' }} >
                                <Form.Item
                                className="z-1"
                                    name="email"
                                    rules={[{ required: true, message: "Please input valid email!" }]}
                                >
                                    <FloatInput className="h-10 min-w-[200px] text-white" placeholder={"Your email here"} />
                                </Form.Item>
                                {/* <Button onClick={form.submit} className="rounded-e-3xl text-primary z-10 -ml-2 h-10">Subscribe</Button> */}
                            </Space.Compact>
                        </Form>
                    </div>

                </div>

            </div></>
    )

}



