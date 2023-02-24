import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button {...rest} className={`btn ${rest.className}`}>
      {children}
    </button>
  );
};
