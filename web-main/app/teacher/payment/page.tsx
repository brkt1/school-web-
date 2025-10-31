"use client";
import { AppState } from "@/store/store";
import { useSelector } from "react-redux";
import PaymentList from "@/modules/finance/payment/components/payment.list";

export default function RequestShiftPage() {
  const teacher = useSelector((state: AppState) => state.teacher);

  return (
    <>
      <h2 className="text-lg font-bold mt-8 mb-3">Payment</h2>
      <PaymentList user={teacher.user_detail.id}/>
    </>
  );
}
