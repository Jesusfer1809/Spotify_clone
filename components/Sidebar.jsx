import React from "react";
import {
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";

function Sidebar() {
  const { data: session, status } = useSession();

  console.log(session);

  return (
    <aside className="flex flex-col space-y-6 text-sm p-5 text-gray-500  ">
      <div className=" space-y-4">
        <button
          className="flex items-center space-x-2  hover:text-white"
          onClick={() => signOut()}
        >
          <HomeIcon className="h-5 w-5" />
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

        <p className=" cursor-pointer hover:text-white">Playlist name...</p>
        <p className=" cursor-pointer hover:text-white">Playlist name...</p>
        <p className=" cursor-pointer hover:text-white">Playlist name...</p>
        <p className=" cursor-pointer hover:text-white">Playlist name...</p>
        <p className=" cursor-pointer hover:text-white">Playlist name...</p>
        <p className=" cursor-pointer hover:text-white">Playlist name...</p>
        <p className=" cursor-pointer hover:text-white">Playlist name...</p>
        <p className=" cursor-pointer hover:text-white">Playlist name...</p>
        <p className=" cursor-pointer hover:text-white">Playlist name...</p>
        <p className=" cursor-pointer hover:text-white">Playlist name...</p>
      </div>
    </aside>
  );
}

export default Sidebar;
