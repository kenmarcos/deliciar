import { Button } from "components/Button";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { db } from "services/firebase";
import { Recipe } from "types";
import logo from "/public/img/deliciar-logo.png";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { data: session } = useSession();
  const userId = session?.id;

  const router = useRouter();

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
        <Button className="btn-primary">Ver Receita</Button>

        <Button onClick={handleToggle}>
          {!isFavorite && <RiHeart3Line className="text-red-600" size={25} />}

          {!!isFavorite && <RiHeart3Fill className="text-red-600" size={25} />}
        </Button>
      </div>
    </div>
  );
};
