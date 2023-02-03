import Link from "next/link";
import React, { ReactNode } from "react";

interface SocialLinkProps {
  link: string;
  children: ReactNode;
}

export const SocialLink = (props: SocialLinkProps) => {
  return (
    <Link
      className="block bg-white p-2 rounded-full border-4 drop-shadow-lg duration-300 border-pink-200 text-pink-200 hover:text-white hover:bg-blue-200 hover:border-blue-200"
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </Link>
  );
};
