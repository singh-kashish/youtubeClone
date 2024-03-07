import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../src/components/Header";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import {Provider} from 'react-redux';
import store from "../store";
import { supabase } from "../src/components/utils/supabase";
export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  return (
    <Provider store={store}>
    <ApolloProvider client={client}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Toaster />
        <div className="bg-[#181818] min-h-screen">
          <Header />
          <Component {...pageProps} />
        </div>
      </SessionContextProvider>
    </ApolloProvider>
    </Provider>
  );
}

