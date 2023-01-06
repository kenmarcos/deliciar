import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "store";

export default function Home() {
  const router = useRouter();
  const auth = useSelector((store: RootState) => store.auth);

  return (
    <>
      <Head>
        <title>Deliciar</title>
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>
    </>
  );
}
