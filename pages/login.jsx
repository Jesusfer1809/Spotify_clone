import React from "react";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import logo from "../public/spotify_logo.png";

function login({ providers }) {
  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col  items-center justify-center  pb-8 px-2">
      <div className="border-b-2 border-yellow-300 flex flex-col items-center pb-4">
        <div className="relative   w-48  cursor-pointer">
          <Image
            src={logo}
            width={400}
            height={200}
            layout="responsive"
            objectFit="contain"
          />
        </div>

        <div className="my-8 mx-2">
          <h1 className="text-3xl font-medium">Sign in</h1>

          <p className="text-sm block mt-4">
            Click on the button below to be redirected to Spotify login page
          </p>
        </div>

        {providers &&
          Object.values(providers).map((provider) => (
            <div className="mt-2 ">
              <button
                className="text-white inline-block bg-[#1ED760] px-7 py-3 rounded-3xl"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Connect with {provider.name}
              </button>
            </div>
          ))}

        <p className="text-xs block mt-12 self-start">
          On continuing, you accept{" "}
          <span className="text-blue-600 border-b-[1px] border-transparent hover:border-blue-600 font-medium">
            use terms
          </span>{" "}
          and{" "}
          <span className="text-blue-600 border-b-[1px] border-transparent hover:border-blue-600 font-medium">
            pivacity advice
          </span>
        </p>
      </div>

      <div className="mt-8 text-xs text-gray-600">
        &copy; 1996-2022 Spotify.com, Inc. or affiliates.
      </div>
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
