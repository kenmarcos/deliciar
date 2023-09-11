import { Button } from "components/Button";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { RiDeleteBin6Line, RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { db } from "services/firebase";
import { Recipe } from "types";
import logo from "/public/img/deliciar-logo.png";
import { Modal } from "components/Modal";
import RecipeDeletion from "components/RecipeDeletion";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { data: session } = useSession();
  const userId = session?.id;

  const router = useRouter();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite);

  const handleToggle = async () => {
    const recipeRef = doc(
      collection(db, "users", userId as string, "recipes"),
      recipe.id
    );

    await updateDoc(recipeRef, { isFavorite: !isFavorite });

    if (router.asPath === "/favorites") {
      router.replace(router.asPath);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <div className="bg-white overflow-hidden rounded-tr-sm rounded-tl-3xl rounded-br-3xl rounded-bl-sm drop-shadow-lg">
        <div className="h-40 relative">
          <Image
            src={recipe.image ?? logo}
            alt="logo"
            fill
            sizes="100%"
            quality={100}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMMvAYAAX4BKd5Md4EAAAAASUVORK5CYII="
          />
        </div>

        <h3 className="p-4 text-xl text-gray-500">{recipe.name}</h3>

        <div className="p-4 border-t-[1px] border-pink-200 flex justify-between items-center">
          <Link href={`/recipe/${recipe.id}`} className="btn btn-primary">
            Ver Receita
          </Link>

          <div className="flex">
            <Button onClick={handleToggle} className="hover:scale-105">
              {!isFavorite && (
                <RiHeart3Line className="text-red-600" size={25} />
              )}

              {!!isFavorite && (
                <RiHeart3Fill className="text-red-600" size={25} />
              )}
            </Button>

            <Button
              className="hover:scale-105"
              onClick={() => setModalIsOpen(true)}
            >
              <RiDeleteBin6Line size={24} className="text-gray-500" />
            </Button>
          </div>
        </div>
      </div>

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
