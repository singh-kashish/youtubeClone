import Head from "next/head";
import Header from "../components/Header";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: "400",
});
export default function Home() {
  return (
    <div className={roboto.className}>
      <Head>
        <title>Youtube Clone</title>
      </Head>
      <Header />
    </div>
  );
}
