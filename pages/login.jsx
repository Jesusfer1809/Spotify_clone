import React from "react";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import logo from "../public/spotify_logo.png";

function login({ providers }) {
  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center ">
      <div className="mb-4 w-72 h-44 flex justify-center relative">
        <Image src={logo} layout="fill" />
      </div>

      {providers &&
        Object.values(providers).map((provider) => (
          <div>
            <button
              className="text-white inline-block bg-[#1ED760] px-5 py-3 rounded-3xl"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Connect with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
}

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
