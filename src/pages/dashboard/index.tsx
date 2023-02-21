import { Input } from "components/Input";
import { RecipeCard } from "components/RecipeCard";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { RiSearchLine } from "react-icons/ri";
import { collection, getDocs } from "firebase/firestore";
import { db } from "services/firebase";
import { Recipe } from "types";
import { useEffect, useState } from "react";

interface DashboardProps {
  allRecipes: Recipe[];
}

const Dashboard = ({ allRecipes }: DashboardProps) => {
  const [recipes, setRecipes] = useState(allRecipes);

  return (
    <>
      <Head>
        <title>Deliciar - Dashboard</title>
      </Head>

      <header className="p-6 flex flex-col gap-2 sm:flex-row sm:justify-between">
        <h2 className="text-3xl text-black font-extrabold">Minhas Receitas</h2>

        <form className="sm:w-1/2">
          <Input
            icon={<RiSearchLine className="text-gray-500" />}
            type="text"
            placeholder="Pesquisar receita"
          />
        </form>
      </header>

      <div className="max-w-sm sm:max-w-none mx-auto px-4 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.name} recipe={recipe} />
        ))}
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

  const subColRef = collection(db, "users", session.id as string, "recipes");
  const querySnapshot = await getDocs(subColRef);

  const allRecipes = querySnapshot.docs.map((doc) => doc.data());

  return {
    props: {
      allRecipes,
    },
  };
};

export default Dashboard;
