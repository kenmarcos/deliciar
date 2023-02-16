import { Dialog } from "@headlessui/react";
import { CreateRecipeForm } from "components/CreateRecipeForm";

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
}

export const Modal = ({ title, open, onClose }: ModalProps) => {
  return (
    <Dialog className="relative z-10" open={open} onClose={onClose}>
      <div className="fixed inset-0 p-4 flex justify-center bg-gray-400 bg-opacity-50">
        <Dialog.Panel className="w-full max-w-sm md:max-w-2xl rounded bg-white p-8 overflow-y-auto">
          <Dialog.Title className="text-2xl font-bold text-black">
            {title}
          </Dialog.Title>

          <hr className="my-4 border-gray-300" />

          <CreateRecipeForm onClose={onClose} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};