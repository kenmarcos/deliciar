import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";

import { Header } from "components/Header";
import store from "store";
import "styles/global.css";
import { Footer } from "components/Footer";
import { Layout } from "components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
