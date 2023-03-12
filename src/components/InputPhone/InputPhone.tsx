import React, { useEffect } from "react";
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const InputPhone: React.FC<InputPhoneProps> = ({ mobileNumber, setMobileNumber, setIsGetOTPButtonDisabled }) => {
  useEffect(() => {
    if (mobileNumber) {
      if (isValidPhoneNumber(mobileNumber)) {
        setIsGetOTPButtonDisabled(false);
      } else {
        setIsGetOTPButtonDisabled(true);
      }
    }
  }, [mobileNumber]);

  return (
    <div className="relative">
      <PhoneInput
        placeholder="Enter phone number"
        value={mobileNumber}
        onChange={(number) => setMobileNumber(number as string)}
        defaultCountry="IN"
        className="border bg-white rounded-xl py-8 px-6 text-2xl font-bold"
        error={
          mobileNumber
            ? isPossiblePhoneNumber(mobileNumber)
              ? undefined
              : "Invalid phone number"
            : "Phone number required"
        }
      />
    </div>
  );
};

export default InputPhone;

export interface InputPhoneProps {
  mobileNumber: string;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  setIsGetOTPButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}
