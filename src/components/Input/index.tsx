import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export const Input = ({ icon = null, ...rest }: InputProps) => {
  return (
    <div className="border-[1px] border-blue-200 flex items-center p-2 gap-2 bg-white rounded-md">
      {icon}
      <input {...rest} className="w-full bg-white outline-none text-black" />
    </div>
  );
};
