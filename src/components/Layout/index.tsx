import AsideBar from "components/AsideBar";
import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = (props: LayoutProps) => {
  const router = useRouter();

  if (router.pathname === "/") {
    return (
      <>
        <Header />
        <main>{props.children}</main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <div className="grid grid-rows-[auto_1fr] md:grid-rows-none md:grid-cols-[200px_1fr]">
          <AsideBar />

          <section className="mb-20 max-w-6xl mx-auto">
            {props.children}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};
