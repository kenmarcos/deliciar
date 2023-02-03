import { FeatureCard } from "components/FeatureCard";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import book from "/public/img/book.gif";
import film from "/public/img/film.gif";
import food from "/public/img/food.gif";

export default function Home() {
  return (
    <>
      <Head>
        <title>Deliciar</title>
      </Head>
      <section className="max-w-6xl mb-20 mt-3 mx-auto flex justify-center items-center">
        <div className="drop-shadow-xl">
          <h1 className="leading-snug text-6xl text-white font-bold text-center mb-6 rounded-md">
            Venha se{" "}
            <span className="text-blue-200 font-serif font-normal bg-pink-200 p-1 rounded-sm">
              Deliciar
            </span>
          </h1>

          <h2 className="text-center mb-4 text-xl sm:text-2xl max-w-xl">
            Organize seus pratos favoritos e acesse todas as suas receitas com
            apenas alguns cliques!
          </h2>
          {/* 
              <button className="w-full max-w-xs mx-auto shadow-xl block bg-blue-200 text-white font-black text-xl sm:text-2xl rounded-lg p-3 hover:bg-blue-300">
                Comece Agora!
              </button> */}
        </div>
      </section>

      <section className="max-w-6xl mx-auto flex justify-center items-center">
        <div className="flex flex-col md:flex-row justify-center gap-24 md:gap-12">
          <FeatureCard
            imageSrc={book}
            imageAlt="Livro de receitas"
            title="Encontre a receita perfeita mais rapidamente!"
            description="Gaste menos tempo procurando o que fazer e
                mais tempo se tornando criativo na cozinha. Obtenha o conhecimento necessário para preparar deliciosas refeições."
          />

          <FeatureCard
            imageSrc={film}
            imageAlt="Filme de vídeo"
            title="Desvende os segredos da cozinha com os vídeos das receitas!"
            description="Leve suas habilidades culinárias a um nível totalmente novo e
                tenha em mãos vídeos passo-a-passo de cada receita."
          />

          <FeatureCard
            imageSrc={food}
            imageAlt="Vegetais"
            title="Assuma o controle de sua cozinha com Deliciar!"
            description=" Gerencie facilmente suas receitas, para que você possa ter
                tudo o que precisa na ponta dos dedos, sem precisar separar
                pilhas de livros ou pesquisar em infinitas páginas da web."
          />
          {/* <div className="sm:w-1/3 bg-pink-200 p-6 text-gray-500 rounded-md border-2 border-gray-400">
                <div className="flex justify-center mb-4">
                  <Image
                    className="border-2 border-gray-400 rounded-full p-2"
                    src={film}
                    alt="Filme de vídeo"
                    width={90}
                    height={90}
                  />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-4">
                  Desvende os segredos da cozinha com os vídeos das receitas
                </h3>
                <p className="text-justify">
                  Leve suas habilidades culinárias a um nível totalmente novo e
                  tenha em mãos vídeos passo-a-passo de cada receita.
                </p>
              </div>
              <div className="sm:w-1/3 bg-pink-200 p-6 rounded-md border-2 border-gray-400">
                <div className="flex justify-center mb-4">
                  <Image
                    className="border-2 border-gray-400 rounded-full p-2"
                    src={food}
                    alt="Vegetais"
                    width={90}
                    height={90}
                  />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-4">
                  Assuma o controle de sua cozinha com Deliciar
                </h3>
                <p className="text-justify">
                  Gerencie facilmente suas receitas, para que você possa ter
                  tudo o que precisa na ponta dos dedos, sem precisar separar
                  pilhas de livros ou pesquisar em infinitas páginas da web.
                </p>
              </div> */}
        </div>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
