import Head from "next/head";
import Header from "../components/Header";
import { Roboto } from "@next/font/google";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account";
import SuggestedVideos from "../components/SuggestedVideos";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  return (
    <div className={roboto.className} style={{minHeight: "100vh"}}>
      <Head>
        <title>Youtube Clone</title>
      </Head>
      <SuggestedVideos where="Home" />
    </div>
  );
}
