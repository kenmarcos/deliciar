import { ActiveLink } from "components/ActiveLink";
import { Button } from "components/Button";
import { RiAddLine } from "react-icons/ri";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { Input } from "components/Input";
import { Modal } from "components/Modal";

const AsideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <aside className="bg-pink-100 flex justify-center border-b-8 md:border-b-0 border-pink-200">
        <div className="flex flex-col gap-4 items-center md:items-start">
          <div className="pt-4">
            <Button
              className="btn-primary text-xl"
              onClick={() => setIsModalOpen(true)}
            >
              <RiAddLine size={28} />
              Nova Receita
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

      <Modal
        title="Adicionar Receita"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AsideBar;
