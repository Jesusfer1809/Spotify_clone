import Image from "next/image";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";

function Song({ track, order }) {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);

    spotifyApi
      .play({
        uris: [track.track.uri],
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div
      className="flex text-gray-500 px-0 py-3 xs:px-5 xs:py-4 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4 ">
        <p>{order + 1}</p>

        <div className="h-10 w-10 relative">
          <Image src={track?.track.album.images[0].url} layout="fill" />
        </div>

        <div>
          <p className="w-36  2xs:w-64 sm:w-36 md:w-64 truncate text-white">
            {track?.track.name}
          </p>
          <p className="w-40 md:w-56">{track?.track.artists[0].name}</p>
        </div>
      </div>

      <div className=" hidden xs:flex items-center justify-between ml-auto space-x-16">
        <p className="w-40 hidden lg:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track?.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
