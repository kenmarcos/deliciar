import React, { useEffect } from "react";
import Image from "next/image";

import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";

import logo from "../../../public/deliciar-logo.png";
import { login, logout } from "store/slices/authSlice";
import { AppDispatch, RootState } from "store";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth as authFirbase } from "services/firebase";

export const Header = () => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const auth = useSelector((store: RootState) => store.auth);

  return (
    <header className="bg-white px-4 py-3 drop-shadow-md">
      <div className="px-4 max-w-6xl mx-auto flex justify-between items-center">
        <Image src={logo} alt="logo" width={90} height={90} />

        {!auth.user ? (
          <button
            className="border rounded-md font-bold p-2 bg-[#1a73e8] text-white flex items-center gap-1"
            onClick={() =>
              dispatch(login()).then(() => router.push("/dashboard"))
            }
          >
            <FcGoogle className="bg-white rounded-full p-[2px]" size={24} />
            Entrar com Google
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <Image
              src={auth.user.photoURL as string}
              width={40}
              height={40}
              alt="profile image"
              className="rounded-full"
            />

            <button
              className="border rounded-md font-bold p-2 bg-[#1a73e8] text-white flex items-center gap-1"
              onClick={() => dispatch(logout()).then(() => router.push("/"))}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
