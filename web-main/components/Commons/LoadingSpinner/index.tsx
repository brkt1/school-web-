import { Spin, Alert } from "antd";

export default function LoadingSpinner() {

    return (<main className="text-center w-full min-h-screen !bg-bg-blur flex items-center justify-center">
        <div role="status" className="z-10  flex flex-col gap-y-3 w-full items-center justify-center text-secondary">
            <Spin tip="Loading..." className="!text-secondary" >
            </Spin>
            <p>Please Wait.....</p>
        </div>
    </main>)
}