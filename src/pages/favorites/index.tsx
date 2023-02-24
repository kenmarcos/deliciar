import { RecipeCard } from "components/RecipeCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { db } from "services/firebase";
import { AppDispatch, RootState } from "store";
import { getFavoriteRecipes } from "store/slices/favoriteRecipesSlice";
import { Recipe } from "types";

interface FavoritesProps {
  favorites: Recipe[];
}

const Favorites = ({ favorites }: FavoritesProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const favoriteRecipes = useSelector(
    (store: RootState) => store.favoriteRecipes
  );

  useEffect(() => {
    dispatch(getFavoriteRecipes(favorites));
  }, []);

  return (
    <>
      <Head>
        <title>Deliciar - Favoritos</title>
      </Head>

      <header className="p-6 flex flex-col gap-2 sm:flex-row sm:justify-between">
        <h2 className="text-3xl text-black font-extrabold">Favoritos</h2>

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

      <section className="max-w-sm sm:max-w-none mx-auto px-4">
        {!!favoriteRecipes.length && (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {favoriteRecipes.map((recipe) => (
              <li key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </li>
            ))}
          </ul>
        )}
      </section>
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
  const querySnapshot = await getDocs(
    query(subColRef, where("isFavorite", "==", true))
  );

  const favorites = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return {
    props: {
      favorites,
    },
  };
};

export default Favorites;
