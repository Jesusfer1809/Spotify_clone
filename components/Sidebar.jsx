import React, { useState, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import {
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();

  const [playlists, setPlaylists] = useState(null);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  console.log(`You picked: ${playlistId}`);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <aside className=" hidden sm:flex flex-col space-y-6 text-xs md:text-sm overflow-y-scroll scrollbar-hide  text-gray-500 h-screen p-5 border-r-[0.1px]  border-gray-900 ">
      <div className=" space-y-4  ">
        <button
          className="flex items-center space-x-2  hover:text-white"
          onClick={() => signOut()}
        >
          <HomeIcon className="h-5 w-5 " />
          <span>Log out</span>
        </button>

        <hr className=" border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2  hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <span>Home</span>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <span>Search</span>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <span>Your Library</span>
        </button>

        <hr className=" border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <span>Create Playlist</span>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <span>Liked Songs</span>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <span>Your Episodes</span>
        </button>

        <hr className=" border-t-[0.1px] border-gray-900" />

        {/*Playlists */}

        {playlists?.map((playlist) => (
          <p
            key={playlist.id}
            className=" cursor-pointer hover:text-white"
            onClick={() => setPlaylistId(playlist.id)}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
