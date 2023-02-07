import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

export const Button = (props: ButtonProps) => {
  return (
    <button className="flex items-center gap-2 bg-blue-200 text-white font-black duration-300 hover:bg-opacity-60 rounded-md p-2 drop-shadow-lg">
      {props.children}
    </button>
  );
};
