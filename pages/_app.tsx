import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div>
        <Header />
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}
