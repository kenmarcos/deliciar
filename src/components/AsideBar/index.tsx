import { ActiveLink } from "components/ActiveLink";
import { Button } from "components/Button";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";

const AsideBar = () => {
  return (
    <aside className="bg-pink-100 flex justify-center border-b-8 md:border-b-0 border-pink-200">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <div className="pt-4">
          <Button>
            <RiAddLine size={28} />
            <span className="text-xl">Nova Receita</span>
          </Button>
        </div>

        <nav className="md:w-full md:mt-4">
          <ul className="flex md:flex-col gap-2">
            <ActiveLink href="/dashboard">Dashboard</ActiveLink>

            <ActiveLink href="/favorites">Favoritos</ActiveLink>

            <ActiveLink href="/profile">Meus Dados</ActiveLink>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AsideBar;
