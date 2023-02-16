import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  btn?: "primary" | "outline-primary";
}

export const Button = ({ children, btn = "primary", ...rest }: ButtonProps) => {
  let btnStyle = "";
  switch (btn) {
    case "primary":
      btnStyle = "bg-blue-200 text-white duration-300 hover:bg-opacity-60";
      break;
    case "outline-primary":
      btnStyle =
        "border border-blue-200 text-blue-200 hover:bg-blue-200 hover:text-white";
      break;
  }

  return (
    <button
      {...rest}
      className={`${btnStyle} ${rest.className} flex items-center gap-2 font-black rounded-md p-2 drop-shadow-lg`}
    >
      {children}
    </button>
  );
};
