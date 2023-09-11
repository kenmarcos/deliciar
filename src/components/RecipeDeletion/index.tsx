import { Button } from "components/Button";
import { deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-hot-toast";
import { db } from "services/firebase";

interface RecipeDeletionProps {
  onClose: () => void;
  recipeId: string;
}

const RecipeDeletion = ({ onClose, recipeId }: RecipeDeletionProps) => {
  const { data: session } = useSession();
  const userId = session?.id;
  const router = useRouter();

  const deleteRecipe = async () => {
    try {
      await deleteDoc(doc(db, "users", userId as string, "recipes", recipeId));

      toast.success("Receita excluída com sucesso!");

      onClose();

      if (router.asPath === `/recipe/${recipeId}`) {
        router.replace("/dashboard");
        return;
      }

      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
      toast.error("Houve um erro. Por favor, tente novamente.");
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-center text-xl">
        Tem certeza que deseja excluir esta receita?
      </p>

      <div className="flex justify-center gap-4">
        <Button
          onClick={deleteRecipe}
          className="btn btn-outline-primary basis-24 justify-center"
        >
          Sim
        </Button>
        <Button
          className="btn btn-danger basis-24 justify-center"
          onClick={onClose}
        >
          Não
        </Button>
      </div>
    </div>
  );
};

export default RecipeDeletion;
