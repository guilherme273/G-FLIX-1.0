/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { Movie as tyoeMovie } from "../../Contexts/Movies/MovieInterface";
import "./MovieWatchStyle.css";
interface MovieProps {
  movie: tyoeMovie;
}
const MovieWatch: React.FC<MovieProps> = ({ movie }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<YT.Player | null>(null);
  useEffect(() => {
    if (!movie) return;

    let userDeuPlay = false;
    let totalWatchTime = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    function onPlayerStateChange(event: YT.OnStateChangeEvent) {
      const YT = (window as any).YT;
      if (event.data === YT.PlayerState.PLAYING) {
        userDeuPlay = true;
        if (!intervalId) {
          intervalId = setInterval(() => {
            totalWatchTime += 1;
          }, 1000);
        }
      } else if (
        event.data === YT.PlayerState.PAUSED ||
        event.data === YT.PlayerState.ENDED
      ) {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }
    }

    function sendWatchTime() {
      if (!userDeuPlay) {
        return;
      }

      const token = localStorage.getItem("token");
      fetch(`https://${import.meta.env.VITE_API_URL}/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_movie: movie?.id,
          seconds_watched: totalWatchTime,
        }),
        keepalive: true,
      });
    }

    function createPlayer() {
      if (!playerRef.current) return;

      playerInstanceRef.current = new (window as any).YT.Player(
        playerRef.current,
        {
          height: "390",
          width: "640",
          videoId: movie?.youtube_id,
          events: {
            onStateChange: onPlayerStateChange,
          },
        }
      );
    }

    if ((window as any).YT?.Player) {
      createPlayer();
    } else {
      if (!(window as any)._ytScriptInjected) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
        (window as any)._ytScriptInjected = true;
      }

      (window as any).onYouTubeIframeAPIReady = createPlayer;
    }

    window.addEventListener("beforeunload", sendWatchTime);

    return () => {
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener("beforeunload", sendWatchTime);
      sendWatchTime();

      playerInstanceRef.current?.destroy();
      playerInstanceRef.current = null;
    };
  }, [movie]);
  return (
    <>
      <div className="player-youtube" ref={playerRef}></div>
    </>
  );
};

export default MovieWatch;
