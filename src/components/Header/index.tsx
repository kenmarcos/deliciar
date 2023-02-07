import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { FcGoogle } from "react-icons/fc";

import logo from "/public/img/deliciar-logo.png";

export const Header = () => {
  const { data: session } = useSession();

  const handleSession = () => {
    if (session) {
      signOut();
    } else {
      signIn("google");
    }
  };

  return (
    <header className="bg-white px-4 py-2 drop-shadow-md">
      <div className="px-4 max-w-6xl mx-auto flex justify-between items-center">
        <Image src={logo} alt="logo" width={65} height={65} quality={100} />

        {!session ? (
          <button
            onClick={handleSession}
            className="border rounded-lg font-bold p-2 bg-[#1a73e8] text-white flex items-center gap-2 transition-all hover:bg-opacity-80"
          >
            <FcGoogle className="bg-white rounded-full p-[2px]" size={24} />
            Entrar com Google
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <Image
              src={session?.user?.image as string}
              width={40}
              height={40}
              alt="profile image"
              className="rounded-full"
            />

            <button
              onClick={handleSession}
              className="border rounded-md font-bold p-2 bg-[#1a73e8] text-white flex items-center gap-2"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
