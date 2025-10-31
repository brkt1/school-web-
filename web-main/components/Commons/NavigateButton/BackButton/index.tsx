import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button type="link" className="p-0 " onClick={() => router.back()}>
      <ArrowLeftOutlined />
    </Button>
  );
};

export default BackButton;
