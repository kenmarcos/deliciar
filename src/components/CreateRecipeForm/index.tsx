import { Button } from "components/Button";
import { Input } from "components/Input";
import { RiAddLine, RiDeleteBin2Fill, RiLoader4Fill } from "react-icons/ri";
import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { db, storage } from "services/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { RecipeCreateFormValues } from "types";

interface RecipeCreateFormProps {
  onClose: () => void;
}

const MAX_FILE_SIZE = 250000; //250KB

const validFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};

const isValidFileType = (fileName?: string) => {
  return fileName
    ? validFileExtensions.image.indexOf(fileName.split(".").pop() as string) >
        -1
    : true;
};

export const RecipeCreateForm = ({ onClose }: RecipeCreateFormProps) => {
  const { data: session } = useSession();
  const userId = session?.id;

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("*Campo obrigatório").trim(),
    image: yup
      .mixed<File>()
      .transform((files: FileList) => files[0])
      .test(
        "is-valid-type",
        "Somente arquivos do tipo .jpg, .gif, .png, .jpeg, .svg ou .webp são aceitos",
        (file) => isValidFileType(file?.name?.toLowerCase())
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

  const onSubmitData = async (data: RecipeCreateFormValues) => {
    setIsLoading(true);

    if (data.image) {
      const imageRef = ref(storage, `images/${userId}/${data.image.name}`);
      const uploadTask = uploadBytesResumable(imageRef, data.image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("O Upload está " + progress + "% feito");
          switch (snapshot.state) {
            case "paused":
              console.log("O Upload está pausado");
              break;
            case "running":
              console.log("O Upload está sendo executado");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          alert("Ocorreu um erro, tente novamente!");
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              const recipeData = {
                name: data.name,
                image: downloadURL,
                video: data.video,
                ingredients: data.ingredients,
                directions: data.directions,
                isFavorite: false,
              };

              await addDoc(
                collection(db, "users", userId as string, "recipes"),
                recipeData
              );

              toast.success("Receita adicionada com sucesso!");

              onClose();

              if (router.asPath !== "/dashboard") {
                router.replace("/dashboard");
                return;
              }

              router.replace(router.asPath);
            } catch (error) {
              console.log(error);
              toast.error("Houve um erro. Por favor, tente novamente.");
            }
          });
        }
      );
    } else {
      try {
        const recipeData = {
          name: data.name,
          video: data.video,
          ingredients: data.ingredients,
          directions: data.directions,
          isFavorite: false,
        };

        await addDoc(
          collection(db, "users", userId as string, "recipes"),
          recipeData
        );

        toast.success("Receita adicionada com sucesso!");

        onClose();

        if (router.asPath !== "/dashboard") {
          router.replace("/dashboard");
          return;
        }

        router.replace(router.asPath);
      } catch (error) {
        console.log(error);
        toast.error("Houve um erro. Por favor, tente novamente.");
      }
    }

    setIsLoading(false);
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

                <Button className="btn-danger" onClick={() => remove(index)}>
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
            className="btn-outline-primary w-full justify-center"
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
          className="btn-outline-primary text-lg"
          type="button"
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button className="btn-primary text-lg" type="submit">
          {!!isLoading ? (
            <RiLoader4Fill size={26} className="animate-spin" />
          ) : (
            "Salvar"
          )}
        </Button>
      </div>
    </form>
  );
};
