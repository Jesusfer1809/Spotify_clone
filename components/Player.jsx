import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilState } from "recoil";

import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();
  console.log(songInfo);

  return (
    <div className="text-white">
      {/*left */}
      <div>
        <img
          src={songInfo?.album.images?.[0]?.url}
          className="hidden md:inline w-10 h-10"
        />
      </div>
    </div>
  );
}

export default Player;
