import { SocialLink } from "components/SocialButton";
import Link from "next/link";

import {
  RiComputerFill,
  RiLinkedinBoxFill,
  RiGithubFill,
} from "react-icons/ri";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pink-100 py-6 border-t-8 border-pink-200">
      <div className="max-w-6xl mx-auto">
        <p className="max-w-md mx-auto text-center mb-4 text-gray-500">
          {currentYear} — Desenvolvido por Marcos Kenji Kuribayashi 😉
        </p>

        <ul className="max-w-sm mx-auto grid grid-cols-3 justify-items-center">
          <li>
            <SocialLink link="https://marcos-kuribayashi.vercel.app">
              <RiComputerFill className="text-xl" />
            </SocialLink>
          </li>

          <li>
            <SocialLink link="https://linkedin.com/in/marcos-kuribayashi">
              <RiLinkedinBoxFill className="text-xl" />
            </SocialLink>
          </li>

          <li>
            <SocialLink link="https://github.com/kenmarcos">
              <RiGithubFill className="text-xl" />
            </SocialLink>
          </li>
        </ul>
      </div>
    </footer>
  );
};
