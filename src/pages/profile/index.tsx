import Head from "next/head";

const Profile = () => {
  return (
    <>
      <Head>
        <title>Deliciar - Meus Dados</title>
      </Head>

      <header className="p-6 flex flex-col gap-2 sm:flex-row sm:justify-between">
        <h2 className="text-3xl text-black font-extrabold">Meus Dados</h2>
      </header>

      <div className="max-w-sm sm:max-w-none mx-auto px-4 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4"></div>
    </>
  );
};

export default Profile;
