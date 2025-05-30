import Head from "next/head";
import Header from "../src/components/Header";
import { Roboto } from "next/font/google";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../src/components/Account";
import SuggestedVideos from "../src/components/SuggestedVideos";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  return (
    <div className={roboto.className} style={{minHeight: "100vh",maxWidth:"100wh"}}>
      <Head>
        <title>Youtube Clone</title>
      </Head>
      <SuggestedVideos where="Home" />
    </div>
  );
}
