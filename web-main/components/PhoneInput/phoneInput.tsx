// PhoneInputWrapper.jsx
import React from "react";
import PhoneInput, { PhoneInputProps, PhoneNumber } from "antd-phone-input";

interface PhoneInputWrapperProps extends Omit<PhoneInputProps, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
}

const PhoneInputWrapper: React.FC<PhoneInputWrapperProps> = ({ value, onChange, ...rest }) => {
  const handleChange = (phoneData: PhoneNumber | string) => {
    if (typeof phoneData === "object" && phoneData !== null) {
      const { countryCode, areaCode, phoneNumber } = phoneData;
      const formatted = `+${countryCode}${areaCode}${phoneNumber}`;
      onChange?.(formatted);
    } else {
      onChange?.(phoneData);
    }
  };
  return <PhoneInput {...rest} value={value} onChange={handleChange} />;
};

export default PhoneInputWrapper;
