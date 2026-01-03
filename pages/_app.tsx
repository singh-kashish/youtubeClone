import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store";
import { Toaster } from "react-hot-toast";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import AppLayout from "../src/components/layout/AppLayout";

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <Toaster />
          <div className="bg-[#181818] min-h-screen">
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </div>
        </SessionContextProvider>
      </PersistGate>
    </Provider>
  );
}
