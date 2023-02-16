import { Button } from "components/Button";
import { Input } from "components/Input";
import { RiAddLine, RiDeleteBin2Fill } from "react-icons/ri";
import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface RecipeCreateFormValues {
  name: string;
  image: File;
  video: string;
  ingredients: {
    ingredient: string;
  }[];
  directions: string;
}
interface RecipeCreateFormProps {
  onClose: () => void;
}

const MAX_FILE_SIZE = 250000; //250KB

const validFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};

function isValidFileType(fileName: any) {
  return fileName
    ? validFileExtensions.image.indexOf(fileName.split(".").pop()) > -1
    : true;
}

export const RecipeCreateForm = ({ onClose }: RecipeCreateFormProps) => {
  const schema = yup.object().shape({
    name: yup.string().required("*Campo obrigatório").trim(),
    image: yup
      .mixed<File>()
      .transform((files: FileList) => files[0])
      .test(
        "is-valid-type",
        "Somente arquivos do tipo .jpg, .gif, .png, .jpeg, .svg ou .webp são aceitos",
        (file) => isValidFileType(file && file.name.toLowerCase())
      )
      .test(
        "is-valid-size",
        "Somente arquivos com tamanho máximo de são aceitos",
        (file) => (file ? file.size <= MAX_FILE_SIZE : true)
      ),
    video: yup.string().trim(),
    ingredients: yup.array().of(
      yup.object().shape({
        ingredient: yup.string().required("*Campo obrigatório").trim(),
      })
    ),
    directions: yup.string().required("*Campo obrigatório").trim(),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeCreateFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { ingredients: [{ ingredient: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const onSubmitData = (data: any) => {
    console.log(data);
  };

  return (
    <form
      className="space-y-4 text-black"
      onSubmit={handleSubmit(onSubmitData)}
    >
      <div>
        <label htmlFor="name">Nome</label>
        <Input
          id="name"
          name="name"
          type="text"
          register={register("name")}
          error={errors.name?.message}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="image">Imagem</label>
          <Input
            id="image"
            type="file"
            register={register("image")}
            containerClassName="p-0 overflow-hidden"
            className="file:bg-blue-200 file:text-white file:hover:bg-opacity-60 file:border-none file:cursor-pointer file:p-2 cursor-pointer text-gray-500 pr-1"
            error={errors.image?.message}
          />
        </div>

        <div>
          <label htmlFor="video">Link Vídeo</label>
          <Input
            id="video"
            type="text"
            register={register("video")}
            error={errors.video?.message}
          />
        </div>
      </div>

      <div>
        <label htmlFor="ingredients">Ingredientes</label>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id}>
              <div className="flex gap-2">
                <Input
                  containerClassName={`flex-grow ${
                    errors?.ingredients &&
                    errors.ingredients[index]?.ingredient &&
                    "border-red-500"
                  }`}
                  id="ingredients"
                  type="text"
                  register={register(`ingredients.${index}.ingredient`)}
                />

                <Button btn="danger" onClick={() => remove(index)}>
                  <RiDeleteBin2Fill />
                </Button>
              </div>

              {!!errors?.ingredients && (
                <small className="text-red-500">
                  {errors.ingredients[index]?.ingredient?.message}
                </small>
              )}
            </div>
          ))}

          <Button
            type="button"
            btn="outline-primary"
            className="w-full justify-center"
            onClick={() =>
              append({
                ingredient: "",
              })
            }
          >
            <RiAddLine size={20} />
            Adicionar Ingrediente
          </Button>
        </div>
      </div>

      <div>
        <label htmlFor="directions">Modo de Preparo</label>
        <textarea
          id="directions"
          className={`border-[1px] ${
            errors.directions ? "border-red-500" : "border-blue-200"
          } p-2 gap-2 bg-white rounded-md w-full outline-none text-black`}
          rows={8}
          {...register("directions")}
        />
        {!!errors.directions && (
          <small className="text-red-500">{errors.directions.message}</small>
        )}
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
