import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";

interface ProfileProps {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

const Profile = (props: ProfileProps) => {
  return (
    <>
      <Head>
        <title>Deliciar - Meus Dados</title>
      </Head>

      <header className="p-6 flex flex-col gap-2 sm:flex-row sm:justify-between">
        <h2 className="text-3xl text-black font-extrabold">Meus Dados</h2>
      </header>

      <div className="px-4">
        <div className="bg-white px-6 py-14 rounded-sm drop-shadow-lg max-w-xl mx-auto flex flex-col md:flex-row gap-12 md:items-center md:justify-evenly rounded-tr-sm rounded-tl-3xl rounded-br-3xl rounded-bl-sm ">
          <div>
            <Image
              className="rounded-full mx-auto"
              src={props.user.image}
              width={140}
              height={140}
              quality={100}
              alt={props.user.name}
            />
          </div>

          <ul className="text-xl text-gray-500 space-y-6">
            <li>
              <strong>Nome</strong>
              <span className="block">{props.user.name}</span>
            </li>

            <li>
              <strong>E-mail</strong>
              <span className="block">{props.user.email}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = session.user;

  return {
    props: {
      user,
    },
  };
};

export default Profile;
