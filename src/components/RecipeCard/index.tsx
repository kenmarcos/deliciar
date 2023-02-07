import { Button } from "components/Button";
import Image from "next/image";
import { RiHeart3Fill } from "react-icons/ri";
import logo from "/public/img/deliciar-logo.png";

export const RecipeCard = () => {
  return (
    <div className="bg-white overflow-hidden rounded-tr-sm rounded-tl-3xl rounded-br-3xl rounded-bl-sm">
      <Image
        src={logo}
        alt="logo"
        width={100}
        height={100}
        className="w-full"
        quality={100}
      />

      <h3 className="p-4 text-xl text-gray-500">Nome da receita culinária</h3>

      <div className="p-4 border-t-[1px] border-pink-200 flex justify-between items-center">
        <Button>Ver Receita</Button>

        <RiHeart3Fill size={25} />
      </div>
    </div>
  );
};
