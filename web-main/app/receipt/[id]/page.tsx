'use client';
import usePaymentService from "@/modules/finance/payment/payment.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Spin } from "antd";

export default function ReceiptPage() {
  const paymentService = usePaymentService();
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasOpenedRef = useRef(false); // to prevent multiple redirects

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const res = await paymentService.getPayment(id);
        const receiptUrl = res.data.receipt;

        if (receiptUrl && !hasOpenedRef.current) {
          hasOpenedRef.current = true;

          // Stop polling
          if (intervalRef.current) clearInterval(intervalRef.current);

          // Open PDF in new tab
          window.open(receiptUrl, '_blank');

          // Redirect to home in current tab
          router.replace('/');
        }
      } catch (err) {
        console.error("Polling error:", err);
        if (intervalRef.current) clearInterval(intervalRef.current);
        router.replace("/error");
      }
    };

    fetchReceipt();
    intervalRef.current = setInterval(fetchReceipt, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [id, paymentService, router]);

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <Spin size="large" tip="Preparing your receipt..." />
    </div>
  );
}
