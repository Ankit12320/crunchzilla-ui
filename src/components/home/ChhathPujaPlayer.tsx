"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Icon from "@/components/common/Icon";

export interface ChhathTrack {
  id: string;
  youtubeId: string;
  title: string;
  hindiTitle: string;
  artist: string;
  badge: string;
  year: string;
  duration: string;
}

export const CHHATH_PLAYLIST: ChhathTrack[] = [
  {
    id: "dukhwa-mitayin",
    youtubeId: "KQqoli_tVVY",
    title: "Dukhwa Mitayin Chhathi Maiya",
    hindiTitle: "दुखवा मिटाईं छठी मईया",
    artist: "Padma Bhushan Sharda Sinha",
    badge: "Latest Release",
    year: "Latest",
    duration: "6:15",
  },
  {
    id: "pahile-pahil",
    youtubeId: "DG8F-csoRAQ",
    title: "Pahile Pahil Chhathi Maiya",
    hindiTitle: "पहिले पहिल छठी मईया",
    artist: "Sharda Sinha",
    badge: "Most Beloved",
    year: "Classic",
    duration: "5:42",
  },
  {
    id: "kelwa-ke-paat",
    youtubeId: "y7hrM7PouQM",
    title: "Kelwa Ke Paat Par Ugeelan Suruj Dev",
    hindiTitle: "केलवा के पात पर उगेलन सूरज देव",
    artist: "Sharda Sinha",
    badge: "Heritage Classic",
    year: "Sacred",
    duration: "6:30",
  },
  {
    id: "ghatiye-swarg",
    youtubeId: "GljkiVCbmbg",
    title: "Ghatiye Swarg Lagela",
    hindiTitle: "घाटिये स्वर्ग लागेला",
    artist: "Pawan Singh",
    badge: "Festive Hit",
    year: "Latest",
    duration: "4:50",
  },
];

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayerInstance;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  loadVideoById: (id: string) => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  destroy: () => void;
}

export default function ChhathPujaPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const playerRef = useRef<YTPlayerInstance | null>(null);
  const currentTrack = CHHATH_PLAYLIST[currentTrackIndex];

  // Load YouTube IFrame API Script
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      try {
        playerRef.current = new window.YT.Player("chhath-youtube-iframe", {
          videoId: CHHATH_PLAYLIST[0].youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
            playsinline: 1,
            modestbranding: 1,
            enablejsapi: 1,
          },
          events: {
            onReady: () => {
              setIsPlayerReady(true);
            },
            onStateChange: (event) => {
              // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2) {
                setIsPlaying(false);
              } else if (event.data === 0) {
                // Auto play next song in playlist
                setCurrentTrackIndex((prev) => (prev + 1) % CHHATH_PLAYLIST.length);
              }
            },
          },
        });
      } catch (err) {
        console.error("Failed to initialize Chhath Player:", err);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignore destruction cleanup errors
        }
      }
    };
  }, []);

  // Update video when track changes
  const switchTrack = useCallback(
    (index: number, autoPlay = true) => {
      setCurrentTrackIndex(index);
      const track = CHHATH_PLAYLIST[index];
      if (playerRef.current && isPlayerReady) {
        try {
          playerRef.current.loadVideoById(track.youtubeId);
          if (autoPlay) {
            playerRef.current.playVideo();
            setIsPlaying(true);
          }
        } catch (err) {
          console.error("Error switching track:", err);
        }
      }
    },
    [isPlayerReady]
  );

  const togglePlay = () => {
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch {
      setIsPlaying((prev) => !prev);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch {
      setIsMuted((prev) => !prev);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % CHHATH_PLAYLIST.length;
    switchTrack(nextIdx, isPlaying);
  };

  const handlePrev = () => {
    const prevIdx =
      (currentTrackIndex - 1 + CHHATH_PLAYLIST.length) % CHHATH_PLAYLIST.length;
    switchTrack(prevIdx, isPlaying);
  };

  return (
    <section
      id="chhath-puja-player"
      aria-label="Chhath Puja Mahaparv Sacred Geet Player"
      className="relative w-full border-b border-amber-900/10 bg-gradient-to-r from-[#FFF5EB] via-[#FFF9F2] to-[#FFF0E0] py-6 sm:py-8 shadow-xs"
    >
      {/* Subtle festive background pattern & golden glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.12),_transparent_75%)]"
        aria-hidden="true"
      />

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-5xl rounded-3xl border border-amber-500/25 bg-white/90 p-4 sm:p-6 shadow-premium-sm backdrop-blur-md">
          {/* Top Header Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-200/60">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-600 to-spiced-tangerine text-white shadow-md">
                <span className="text-2xl animate-pulse">🌅</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                    जय छठी मईया
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Chhath Mahaparv Special
                  </span>
                </div>
                <h2 className="font-display text-title-md sm:text-title-lg font-bold text-primary mt-0.5">
                  पावन छठ महापर्व के भक्तिमय गीत • Sacred Chhath Geet
                </h2>
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                type="button"
                onClick={() => setShowVideo((v) => !v)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-label-xs font-bold transition-all ${
                  showVideo
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/80"
                }`}
              >
                <Icon name={showVideo ? "music_note" : "videocam"} className="text-[17px]" />
                <span>{showVideo ? "Audio Mode" : "Watch Video"}</span>
              </button>
            </div>
          </div>

          {/* Main Player Display: Vinyl / Artwork + Track Details + Playback Controls */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Visual Column: Rotating Sacred Disc / Video */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              {showVideo ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg border border-amber-900/10">
                  <div id="chhath-youtube-iframe" className="h-full w-full" />
                </div>
              ) : (
                <div className="relative flex flex-col items-center text-center">
                  {/* Decorative Glowing Disc */}
                  <div
                    className={`relative flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-full bg-gradient-to-tr from-amber-700 via-roasted-terracotta to-spiced-tangerine p-2.5 shadow-2xl transition-transform duration-700 ${
                      isPlaying ? "animate-spin [animation-duration:14s]" : ""
                    }`}
                  >
                    {/* Vinyl Grooves Effect */}
                    <div className="flex h-full w-full items-center justify-center rounded-full border-4 border-amber-300/30 bg-radial from-amber-900 via-black to-zinc-900 shadow-inner">
                      <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 border-amber-300/60 bg-gradient-to-tr from-amber-500 to-spiced-tangerine shadow-md">
                        <span className="text-2xl sm:text-3xl drop-shadow-md">🪔</span>
                      </div>
                    </div>

                    {/* Sun Rays Halo */}
                    <div
                      className="pointer-events-none absolute -inset-2 rounded-full border border-amber-400/40 animate-ping [animation-duration:3s]"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Equalizer animation bar */}
                  <div className="mt-3 flex items-center justify-center gap-1">
                    {[16, 24, 12, 28, 20, 32, 18, 26, 14].map((height, i) => (
                      <span
                        key={i}
                        style={{
                          height: isPlaying ? `${height}px` : "6px",
                          transition: "height 0.25s ease",
                          animationDuration: `${0.4 + (i % 4) * 0.2}s`,
                        }}
                        className={`w-1 rounded-full bg-gradient-to-t from-roasted-terracotta to-amber-500 ${
                          isPlaying ? "animate-pulse" : ""
                        }`}
                      />
                    ))}
                  </div>

                  {/* Hidden iframe placeholder for audio playback when showVideo is false */}
                  <div className="sr-only" aria-hidden="true">
                    <div id="chhath-youtube-iframe" />
                  </div>
                </div>
              )}
            </div>

            {/* Controls & Track Info Column */}
            <div className="md:col-span-7 flex flex-col justify-center space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-label-xs font-bold text-amber-800">
                    {currentTrack.badge}
                  </span>
                  <span className="text-label-xs font-medium text-on-surface-variant">
                    {currentTrack.year} • {currentTrack.duration}
                  </span>
                </div>
                <h3 className="font-display text-title-lg sm:text-headline-sm font-bold text-on-surface mt-1">
                  {currentTrack.hindiTitle}
                </h3>
                <p className="text-body-md font-medium text-roasted-terracotta">
                  {currentTrack.title}
                </p>
                <p className="text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                  <Icon name="mic" className="text-[17px] text-amber-700" />
                  <span className="font-semibold text-primary">{currentTrack.artist}</span>
                </p>
              </div>

              {/* Main Playback Bar Controls */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {/* Previous */}
                <button
                  type="button"
                  onClick={handlePrev}
                  title="Previous Song"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-900 transition-all hover:bg-amber-200 active:scale-90"
                >
                  <Icon name="skip_previous" className="text-[26px]" />
                </button>

                {/* Big Play / Pause Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause Song" : "Play Song"}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-roasted-terracotta via-amber-600 to-spiced-tangerine text-white shadow-xl ring-4 ring-amber-300/40 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Icon
                    name={isPlaying ? "pause" : "play_arrow"}
                    className="text-[34px] ml-0.5"
                  />
                </button>

                {/* Next */}
                <button
                  type="button"
                  onClick={handleNext}
                  title="Next Song"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-900 transition-all hover:bg-amber-200 active:scale-90"
                >
                  <Icon name="skip_next" className="text-[26px]" />
                </button>

                {/* Mute Toggle */}
                <button
                  type="button"
                  onClick={toggleMute}
                  title={isMuted ? "Unmute" : "Mute"}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                    isMuted
                      ? "bg-red-100 text-red-700"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-variant"
                  }`}
                >
                  <Icon
                    name={isMuted ? "volume_off" : "volume_up"}
                    className="text-[20px]"
                  />
                </button>

                {/* Playing Status Pill */}
                <div className="ml-auto inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 border border-amber-200/80 text-label-xs font-semibold text-amber-900">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isPlaying ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"
                    }`}
                  />
                  <span>{isPlaying ? "Playing Now" : "Paused • Tap to Play"}</span>
                </div>
              </div>

              {/* Playlist Selector Tabs */}
              <div className="pt-2">
                <p className="text-label-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                  Select Chhath Geet:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CHHATH_PLAYLIST.map((track, idx) => {
                    const isSelected = idx === currentTrackIndex;
                    return (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() => switchTrack(idx, true)}
                        className={`flex items-center justify-between gap-2 rounded-xl p-2.5 text-left transition-all ${
                          isSelected
                            ? "bg-amber-100/90 border-2 border-amber-600 shadow-xs"
                            : "bg-surface-container-low hover:bg-amber-50 border border-amber-900/10"
                        }`}
                      >
                        <div className="min-w-0">
                          <p
                            className={`truncate text-label-sm font-bold ${
                              isSelected ? "text-amber-950" : "text-on-surface"
                            }`}
                          >
                            {track.hindiTitle}
                          </p>
                          <p className="truncate text-label-xs text-on-surface-variant">
                            {track.artist}
                          </p>
                        </div>
                        <div className="shrink-0 flex items-center gap-1">
                          {isSelected && isPlaying ? (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-white">
                              <Icon name="volume_up" className="text-[14px]" />
                            </span>
                          ) : (
                            <span className="text-label-xs font-bold text-amber-800 bg-amber-200/60 rounded px-1.5 py-0.5">
                              {track.year}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Persistent Bottom Mini Player when playing & user has scrolled down */}
      {isPlaying && !isMinimized && (
        <aside
          aria-label="Chhath Geet Now Playing"
          className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-300 select-none"
        >
          <div className="flex items-center justify-between gap-3 rounded-full bg-charcoal-bark/95 px-4 py-2.5 text-pure-parchment shadow-2xl backdrop-blur-md border border-amber-400/30">
            {/* Spinning Diya icon */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 to-spiced-tangerine text-white shadow-md animate-spin [animation-duration:10s]">
              <span className="text-sm">🪔</span>
            </div>

            {/* Song title info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-label-sm font-bold text-amber-200">
                {currentTrack.hindiTitle}
              </p>
              <p className="truncate text-[11px] text-white/70">
                {currentTrack.artist} • Chhath Mahaparv
              </p>
            </div>

            {/* Mini Player Controls */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                title="Previous"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:text-white active:scale-90"
              >
                <Icon name="skip_previous" className="text-[20px]" />
              </button>

              <button
                type="button"
                onClick={togglePlay}
                title={isPlaying ? "Pause" : "Play"}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-white shadow-md hover:bg-amber-400 active:scale-95"
              >
                <Icon
                  name={isPlaying ? "pause" : "play_arrow"}
                  className="text-[22px] ml-0.5"
                />
              </button>

              <button
                type="button"
                onClick={handleNext}
                title="Next"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:text-white active:scale-90"
              >
                <Icon name="skip_next" className="text-[20px]" />
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                title="Close Mini Bar"
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 hover:text-white active:scale-90 ml-1"
              >
                <Icon name="close" className="text-[16px]" />
              </button>
            </div>
          </div>
        </aside>
      )}
    </section>
  );
}
