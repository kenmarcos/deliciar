import { Button } from "components/Button";
import { Modal } from "components/Modal";
import RecipeDeletion from "components/RecipeDeletion";
import { collection, doc, getDoc, query } from "firebase/firestore";
import { GetServerSideProps, GetStaticProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { db } from "services/firebase";
import { Recipe } from "types";
import { getVideoId } from "utils";

interface RecipeDetailsProps {
  recipe: Recipe;
}

const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  console.log(recipe);

  return (
    <>
      <Head>
        <title>Deliciar - Detalhes da Receita</title>
      </Head>

      <header className="p-6 flex justify-between">
        <h2 className="text-3xl text-black font-extrabold">{recipe.name}</h2>

        <Button
          className="hover:scale-105"
          onClick={() => setModalIsOpen(true)}
        >
          <RiDeleteBin6Line size={24} className="text-gray-500" />
        </Button>
      </header>

      <section className="max-w-sm sm:max-w-none mx-auto px-4">
        <div className="text-gray-500 max-w-2xl bg-white p-4 mx-auto space-y-8 rounded-tr-sm rounded-tl-3xl rounded-br-3xl rounded-bl-sm">
          {!!recipe.video && (
            <div>
              <h3 className="text-2xl border-b-2 border-pink-100 mb-2">
                Vídeo
              </h3>

              <div className="relative overflow-hidden pt-[56.25%]">
                <iframe
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                  src={`https://youtube.com/embed/${getVideoId(recipe.video)}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {!recipe.video && !!recipe.image && (
            <figure className="relative h-80">
              <Image
                src={recipe.image}
                alt={recipe.image}
                fill
                sizes="100%"
                quality={100}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMMvAYAAX4BKd5Md4EAAAAASUVORK5CYII="
              />
            </figure>
          )}

          <div>
            <h3 className="text-2xl border-b-2 border-pink-100 mb-2">
              Ingredientes
            </h3>

            <ul className="list-inside list-disc">
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item.ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl border-b-2 border-pink-100 mb-2">
              Modo de Preparo
            </h3>

            <p className="sm:columns-2">{recipe.directions}</p>
          </div>
        </div>
      </section>

      <Modal
        title="Excluir Receita"
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      >
        <RecipeDeletion
          onClose={() => setModalIsOpen(false)}
          recipeId={recipe.id}
        />
      </Modal>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const recipeId = params?.recipeId;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const subColRef = collection(db, "users", session.id as string, "recipes");
  const docRef = doc(subColRef, recipeId as string);
  const docSnap = await getDoc(docRef);

  const recipe = { ...docSnap.data(), id: docSnap.id };

  return {
    props: {
      recipe,
    },
  };
};

export default RecipeDetails;
