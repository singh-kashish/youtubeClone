// pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../src/components/Header";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
          <>
            <Toaster />
            <div className="bg-[#181818] min-h-screen">
              <Header />
              <Component {...pageProps} />
            </div>
          </>
        </SessionContextProvider>
      </PersistGate>
    </Provider>
  );
}
