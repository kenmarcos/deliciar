import { Button } from "components/Button";
import Image from "next/image";
import { RiHeart3Fill } from "react-icons/ri";
import { Recipe } from "types";
import logo from "/public/img/deliciar-logo.png";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="bg-white overflow-hidden rounded-tr-sm rounded-tl-3xl rounded-br-3xl rounded-bl-sm drop-shadow-lg">
      <div className="h-40 relative">
        <Image
          src={recipe.image ?? logo}
          alt="logo"
          fill
          sizes="100%"
          priority
          quality={100}
        />
      </div>

      <h3 className="p-4 text-xl text-gray-500">{recipe.name}</h3>

      <div className="p-4 border-t-[1px] border-pink-200 flex justify-between items-center">
        <Button className="btn-primary">Ver Receita</Button>

        <Button>
          <RiHeart3Fill size={25} />
        </Button>
      </div>
    </div>
  );
};
