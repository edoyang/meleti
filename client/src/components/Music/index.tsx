import { useEffect, useState, useRef } from "react";

interface MusicProps {
  currentState: "Work Time" | "Short Break" | "Long Break"; // Explicit state types
  isRunning: boolean; // Timer running state
  onReset: boolean; // Reset signal
}

const Music = ({ currentState, isRunning, onReset }: MusicProps) => {
  const [musicList, setMusicList] = useState<string[]>([]);
  const [currentMusic, setCurrentMusic] = useState<string | null>(null);
  const [musicIndex, setMusicIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Persist audio instance

  // Function to shuffle an array
  const shuffle = (arr: string[]): string[] =>
    arr.sort(() => Math.random() - 0.5);

  // Fetch and shuffle the music list on state change
  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/music`
        );
        const data = await response.json();

        const shuffledList: {
          [key in "Work Time" | "Short Break" | "Long Break"]: string[];
        } = {
          "Work Time": shuffle(data.musics),
          "Short Break": shuffle(data.break_music),
          "Long Break": shuffle(data.long_break),
        };

        setMusicList(shuffledList[currentState]);
        setCurrentMusic(shuffledList[currentState][0]);
        setMusicIndex(0);
      } catch (err) {
        console.error("Failed to fetch music:", err);
      }
    };

    fetchMusic();
  }, [currentState]);

  // Initialize or update the audio source
  useEffect(() => {
    if (!currentMusic) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(currentMusic);
    } else {
      audioRef.current.src = currentMusic;
    }

    if (isRunning) {
      audioRef.current
        .play()
        .catch((err) => console.error("Audio playback error:", err));
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentMusic, isRunning]);

  // Reset song progress and go to the next track on reset
  useEffect(() => {
    if (onReset && musicList.length > 0) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset playback position
      }

      // Move to the next track
      const nextIndex = (musicIndex + 1) % musicList.length;
      setMusicIndex(nextIndex);
      setCurrentMusic(musicList[nextIndex]);
    }
  }, [onReset]);

  // Move to the next track when the current one ends
  const handleMusicEnd = () => {
    const nextIndex = (musicIndex + 1) % musicList.length;
    setMusicIndex(nextIndex);
    setCurrentMusic(musicList[nextIndex]);
  };

  // Attach event listener for track end
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener("ended", handleMusicEnd);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleMusicEnd);
      }
    };
  }, [musicIndex, musicList]);

  return null; // No rendering
};

export default Music;
