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
        <main className="min-h-screen">{props.children}</main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-64px-144px)]">
        <div className="grid grid-rows-[auto_1fr] md:grid-rows-none md:grid-cols-[200px_1fr] min-h-[calc(100vh-64px-144px)]">
          <AsideBar />

          <section className="mb-20">{props.children}</section>
        </div>
      </main>
      <Footer />
    </>
  );
};
