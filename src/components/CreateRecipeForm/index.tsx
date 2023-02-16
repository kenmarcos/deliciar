import { Button } from "components/Button";
import { Input } from "components/Input";
import { RiAddLine } from "react-icons/ri";

interface CreateRecipeFormProps {
  onClose: () => void;
}

export const CreateRecipeForm = ({ onClose }: CreateRecipeFormProps) => {
  return (
    <form className="space-y-4 text-black">
      <div>
        <label htmlFor="">Nome</label>
        <Input type="text" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="">Imagem</label>
          <Input type="text" />
        </div>

        <div>
          <label htmlFor="">Link Vídeo</label>
          <Input type="text" />
        </div>
      </div>

      <div>
        <label>Ingredientes</label>

        <div className="space-y-4">
          <div>
            <Input type="text" />
          </div>

          <div>
            <Input type="text" />
          </div>

          <Button btn="outline-primary" className="w-full justify-center">
            <RiAddLine size={20} />
            Adicionar Ingrediente
          </Button>
        </div>
      </div>

      <div>
        <label htmlFor="">Modo de Preparo</label>
        <textarea
          className="border-[1px] border-blue-200 p-2 gap-2 bg-white rounded-md w-full outline-none text-black"
          rows={8}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button
          className="text-lg"
          type="button"
          btn="outline-primary"
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button className="text-lg" type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
};
