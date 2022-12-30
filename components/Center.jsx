import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "../components/Songs";

function Center() {
  const { data: session, status } = useSession();
  const [color, setColor] = useState();
  const spotifyApi = useSpotify();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  const headColors = [
    "from-red-500",
    "from-orange-500",
    "from-amber-500",
    "from-yellow-500",
    "from-lime-500",
    "from-green-500",
    "from-emerald-500",
    "from-teal-500",
    "from-cyan-500",
    "from-sky-500",
    "from-blue-500",
    "from-indigo-500",
    "from-violet-500",
    "from-purple-500",
    "from-fuchsia-500",
    "from-pink-500",
    "from-rose-500",
  ];

  useEffect(() => {
    setColor(shuffle(headColors).pop());
  }, [playlistId]);

  useEffect(() => {
    if (session) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) => {
          console.error("Something went wrong", err);
        });
    }
  }, [spotifyApi, playlistId, session]);

  return (
    <div className=" flex-grow text-white relative h-screen overflow-y-scroll scrollbar-hide">
      <header className="text-sm flex  space-x-3 items-center absolute top-8 right-5 px-3 py-2 bg-black rounded-full">
        <img
          src={session?.user?.image}
          className="h-8 w-8 md:h-10 md:w-10 rounded-full"
        />
        <span className="text-xs md:text-sm">{session?.user?.name}</span>
        <ChevronDownIcon className="h-5" />
      </header>

      <div
        className={` h-60 2xs:h-80 bg-gradient-to-b  ${color} to-black flex items-end p-8 `}
      >
        <div className="flex items-end space-x-8">
          <img
            src={playlist?.images[0].url}
            className=" w-20 h-20  2xs:w-32 2xs:h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 shadow-xl"
          />
          <div>
            <p>PLAYLIST</p>
            <h1 className=" text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
              {playlist?.name}
            </h1>
          </div>
        </div>
      </div>
      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
