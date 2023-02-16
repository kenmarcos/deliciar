import { InputHTMLAttributes, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  register?: UseFormRegisterReturn;
  containerClassName?: string;
}

export const Input = ({
  icon = null,
  register,
  containerClassName,
  ...rest
}: InputProps) => {
  return (
    <div
      className={`border-[1px] border-blue-200 flex items-center p-2 gap-2 bg-white rounded-md ${containerClassName}`}
    >
      {icon}
      <input
        {...rest}
        {...register}
        className={`w-full bg-white outline-none text-black ${rest.className}`}
      />
    </div>
  );
};
