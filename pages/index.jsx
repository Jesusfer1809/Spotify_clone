import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import Player from "../components/Player";
import { getSession } from "next-auth/react";

export default function Home() {
  //xs
  return (
    <div className=" font-rubik h-screen bg-black overflow-hidden">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      {/*Player*/}

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
