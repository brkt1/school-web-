import { SearchComponentProps } from "@/hooks/search";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { FloatInput } from "./FloatLabel/component/FloatInput";

interface TextSearchProps extends SearchComponentProps {
  handleChange: (key: string, value: any) => void;
  prop_key: string
}

const TextSearch = (prop: TextSearchProps) => {
  const [textValue, setTextValue] = useState<string>();
  const debouncedSearch = useCallback(
    debounce((e) => {
      prop.handleChange(prop.prop_key, e.target.value);
    }, prop.debounceTimeout || 500),
    [prop]
  );

  const handleSearch = (e: any) => {
    setTextValue(e.target.value);
    debouncedSearch(e);
  };
  return (
    <FloatInput
      key={prop.prop_key}
      placeholder={prop.placeholder}
      value={textValue}
      suffix={<SearchOutlined key={prop.prop_key} className="text-text-secondary dark:text-dark-text-secondary" />}
      className="w-full sm:w-40 custom-input"
      onChange={handleSearch}
      allowClear
    />
  );
};

export default TextSearch;
