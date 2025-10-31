import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

export interface RefreshButtonProps {
  search: () => void;
}

const RefreshButton = ({ search }: RefreshButtonProps) => {
  return (
    <Button type="link" onClick={search}>
      <ReloadOutlined />
    </Button>
  );
};

export default RefreshButton;
