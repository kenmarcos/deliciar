import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactNode;
}

export const ActiveLink = ({ children, ...rest }: ActiveLinkProps) => {
  const router = useRouter();

  const active = "bg-pink-200 text-white";
  const inactive = "text-black";

  return (
    <li className={`${router.pathname === rest.href ? active : inactive} p-2`}>
      <Link {...rest} className="block">
        {children}
      </Link>
    </li>
  );
};
