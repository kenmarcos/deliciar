import { ReactNode } from "react";
import { Dialog } from "@headlessui/react";
import { RecipeCreateForm } from "components/CreateRecipeForm";

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ title, open, onClose, children }: ModalProps) => {
  return (
    <Dialog className="relative z-10" open={open} onClose={onClose}>
      <div className="fixed inset-0 p-4 bg-gray-400 bg-opacity-50 flex justify-center items-center">
        <Dialog.Panel className="w-full max-h-full max-w-sm md:max-w-2xl rounded bg-white p-8 overflow-y-auto">
          <Dialog.Title className="text-2xl font-bold text-black">
            {title}
          </Dialog.Title>

          <hr className="my-4 border-gray-300" />

          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
