import { RecipeCard } from "components/RecipeCard";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { RiSearchLine } from "react-icons/ri";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Deliciar - Dashboard</title>
      </Head>

      <header className="p-6 flex flex-col gap-2 sm:flex-row sm:justify-between">
        <h2 className="text-3xl text-black font-extrabold">Minhas Receitas</h2>

        <form className="sm:w-1/2">
          <div className="border-[1px] border-blue-200 flex items-center p-2 gap-2 bg-white rounded-md">
            <RiSearchLine className="text-gray-500" />
            <input
              className="w-full bg-white outline-none text-black"
              type="text"
              placeholder="Pesquisar receita"
            />
          </div>
        </form>
      </header>

      <div className="max-w-sm sm:max-w-none mx-auto px-4 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
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

  return {
    props: {},
  };
};

export default Dashboard;
