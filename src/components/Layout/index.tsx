import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = (props: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="mt-16 mb-20">{props.children}</main>
      <Footer />
    </>
  );
};
