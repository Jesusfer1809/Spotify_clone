import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  PlayIcon,
  PauseIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  ReplyIcon,
  FastForwardIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";

import { VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";

import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo";

import { debounce } from "lodash";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  //uwu

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data?.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data?.body?.is_playing);
        });
      });
    }
  };

  const play_pause_Song = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const deboucedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume);
    }, 500),
    []
  );

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdState, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      deboucedAdjustVolume(volume);
    }
  }, [volume]);

  return (
    <div className="text-white h-24 grid grid-cols-2 xs:grid-cols-3 bg-gradient-to-b from-black to-gray-900 items-center p-2 md:p-8">
      {/*left */}
      <div className="flex items-center space-x-4 ">
        <img
          src={songInfo?.album.images?.[0]?.url}
          className="w-8 h-8 md:w-10 md:h-10"
        />

        <div className="flex flex-col">
          <span className="text-sm w-40 lg:w-56 truncate">
            {songInfo?.name}
          </span>
          <span className="text-xs text-gray-500">
            {songInfo?.artists?.[0]?.name}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center xs:justify-end sm:justify-center space-x-3 sm:space-x-6">
        <SwitchHorizontalIcon className="h-5 w-5 text-gray-400 hover:text-white transition-all ease-out hidden md:inline" />
        <RewindIcon className="h-5 w-5 text-gray-400 hover:text-white transition-all ease-out" />
        {isPlaying ? (
          <PauseIcon
            className="h-10 w-10 hover:scale-105 transition-all ease-out"
            onClick={play_pause_Song}
          />
        ) : (
          <PlayIcon
            className="h-10 w-10 hover:scale-105 transition-all ease-out"
            onClick={play_pause_Song}
          />
        )}
        <FastForwardIcon className="h-5 w-5 text-gray-400 hover:text-white transition-all ease-out" />
        <ReplyIcon className="h-5 w-5 text-gray-400 hover:text-white transition-all ease-out hidden md:inline" />
      </div>
      <div className=" hidden xs:flex items-center justify-end space-x-4">
        <VolumeDownIcon
          className="h-5 w-5 hover:scale-105 transition-all ease-out"
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          type="range"
          onChange={(e) => setVolume(Number(e.target.value))}
          value={volume}
          min={0}
          max={100}
          className="w-14 md:w-28"
        />
        <VolumeUpIcon
          className="h-5 w-5 hover:scale-105 transition-all ease-out"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  );
}

export default Player;
