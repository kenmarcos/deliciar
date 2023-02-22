import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";

import { store } from "store";
import "styles/global.css";
import { Layout } from "components/Layout";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}
