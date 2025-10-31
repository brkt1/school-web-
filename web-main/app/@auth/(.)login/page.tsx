'use client'
import Login from "@/modules/auth/login/login";
import { Modal } from "antd";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
  return (
    <Modal open onCancel={() => router.back()} onClose={() =>router.back()} footer={<></>}>
      <Login />
    </Modal>
  )
}