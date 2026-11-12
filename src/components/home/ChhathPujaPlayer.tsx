"use client";

import React, { useState } from "react";
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
  description: string;
}

export const CHHATH_PLAYLIST: ChhathTrack[] = [
  {
    id: "dukhwa-mitayin",
    youtubeId: "KQqoli_tVVY",
    title: "Dukhwa Mitayin Chhathi Maiya",
    hindiTitle: "दुखवा मिटाईं छठी मईया",
    artist: "Padma Bhushan Sharda Sinha",
    badge: "Latest Release",
    year: "Latest 2024",
    duration: "6:15",
    description: "The latest heartfelt Chhath geet by the legendary voice of Bihar, Sharda Sinha.",
  },
  {
    id: "pahile-pahil",
    youtubeId: "DG8F-csoRAQ",
    title: "Pahile Pahil Chhathi Maiya",
    hindiTitle: "पहिले पहिल छठी मईया",
    artist: "Sharda Sinha",
    badge: "All-Time Favorite",
    year: "Classic",
    duration: "5:42",
    description: "The iconic anthem of Chhath Puja celebrating the sacred tradition and reverence.",
  },
  {
    id: "kelwa-ke-paat",
    youtubeId: "y7hrM7PouQM",
    title: "Kelwa Ke Paat Par Ugeelan Suruj Dev",
    hindiTitle: "केलवा के पात पर उगेलन सूरज देव",
    artist: "Sharda Sinha",
    badge: "Sacred Arghya Geet",
    year: "Heritage",
    duration: "6:30",
    description: "The timeless morning and evening Arghya bhajan offered to Lord Surya.",
  },
  {
    id: "ghatiye-swarg",
    youtubeId: "GljkiVCbmbg",
    title: "Ghatiye Swarg Lagela",
    hindiTitle: "घाटिये स्वर्ग लागेला",
    artist: "Pawan Singh",
    badge: "Festive Hit",
    year: "Latest 2024",
    duration: "4:50",
    description: "Energetic festive song depicting the celestial beauty of Chhath Ghats.",
  },
];

export default function ChhathPujaPlayer() {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = CHHATH_PLAYLIST[selectedTrackIndex];

  const handleSelectTrack = (index: number) => {
    setSelectedTrackIndex(index);
    setIsPlaying(true);
  };

  const handleStartPlay = () => {
    setIsPlaying(true);
  };

  return (
    <section
      id="chhath-puja-player"
      aria-label="Chhath Puja Mahaparv Sacred Geet and Video Player"
      className="relative w-full border-b border-amber-900/10 bg-gradient-to-r from-[#FFF5EB] via-[#FFF9F2] to-[#FFF0E0] py-8 sm:py-10 shadow-xs"
    >
      {/* Subtle festive background golden glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.14),_transparent_75%)]"
        aria-hidden="true"
      />

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-5xl rounded-3xl border border-amber-500/25 bg-white/95 p-4 sm:p-7 shadow-premium-md backdrop-blur-md">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-amber-200/60">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-600 via-roasted-terracotta to-spiced-tangerine text-white shadow-md">
                <span className="text-2xl animate-pulse">🌅</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                    जय छठी मईया
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Chhath Mahaparv 2024–2026
                  </span>
                </div>
                <h2 className="font-display text-title-md sm:text-headline-sm font-bold text-primary mt-0.5">
                  पावन छठ महापर्व के भक्तिमय गीत • Sacred Chhath Songs & Video
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <a
                href={`https://www.youtube.com/watch?v=${currentTrack.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 px-3.5 py-1.5 text-label-xs font-bold border border-amber-200/80 transition-all hover:scale-105 active:scale-95"
              >
                <span>Open in YouTube</span>
                <Icon name="open_in_new" className="text-[15px]" />
              </a>
            </div>
          </div>

          {/* Main Showcase: Left = Responsive Embedded Player, Right = Interactive Track Selector */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Video & Song Player Frame (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-3">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-charcoal-bark shadow-xl border border-amber-900/15">
                {isPlaying ? (
                  <iframe
                    key={currentTrack.youtubeId}
                    src={`https://www.youtube-nocookie.com/embed/${currentTrack.youtubeId}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
                    title={`${currentTrack.hindiTitle} - ${currentTrack.artist}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                ) : (
                  /* Custom Click-to-Play Poster Overlay */
                  <div className="group relative h-full w-full cursor-pointer overflow-hidden" onClick={handleStartPlay}>
                    {/* YouTube High-Res Poster Thumbnail */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${currentTrack.youtubeId}/hqdefault.jpg`}
                      alt={currentTrack.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="eager"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25 flex flex-col justify-between p-4 sm:p-5" />

                    {/* Top badge */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/90 backdrop-blur-md px-3 py-1 text-label-xs font-bold text-white shadow-md">
                        <span>🪔</span>
                        <span>{currentTrack.badge}</span>
                      </span>
                      <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-label-xs font-semibold text-white">
                        {currentTrack.duration}
                      </span>
                    </div>

                    {/* Central Play Button */}
                    <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                      <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-tr from-roasted-terracotta via-amber-600 to-spiced-tangerine text-white shadow-[0_8px_30px_rgba(217,91,27,0.6)] ring-4 ring-amber-300/50 transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                        <Icon name="play_arrow" className="text-[38px] sm:text-[46px] ml-1" />
                      </div>
                      <p className="mt-3 text-label-md sm:text-title-sm font-bold text-pure-parchment drop-shadow-md">
                        Tap to Play Song & Video
                      </p>
                    </div>

                    {/* Bottom song title bar */}
                    <div className="relative z-10">
                      <p className="text-title-md sm:text-title-lg font-bold text-white drop-shadow-md">
                        {currentTrack.hindiTitle}
                      </p>
                      <p className="text-body-sm text-amber-200 drop-shadow-sm">
                        {currentTrack.artist} • {currentTrack.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Current Track Info & Description */}
              <div className="rounded-2xl bg-amber-50/70 p-3.5 border border-amber-200/60 flex items-start gap-3">
                <span className="text-xl">🪔</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-label-sm text-primary">
                      {currentTrack.hindiTitle} ({currentTrack.title})
                    </span>
                    <span className="text-label-xs text-on-surface-variant">• {currentTrack.artist}</span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant mt-0.5">
                    {currentTrack.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Playlist (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-2.5">
              <div className="flex items-center justify-between pb-1">
                <p className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                  Chhath Mahaparv Playlist ({CHHATH_PLAYLIST.length} Songs)
                </p>
                <span className="text-label-xs font-semibold text-roasted-terracotta">
                  Select to Play
                </span>
              </div>

              {CHHATH_PLAYLIST.map((track, idx) => {
                const isSelected = idx === selectedTrackIndex;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => handleSelectTrack(idx)}
                    className={`group relative flex items-center gap-3 rounded-2xl p-3 text-left transition-all duration-200 ${
                      isSelected
                        ? "bg-amber-100/90 border-2 border-amber-600 shadow-sm ring-2 ring-amber-400/25"
                        : "bg-surface-container-low hover:bg-amber-50/80 border border-amber-900/10 hover:border-amber-400/40"
                    }`}
                  >
                    {/* Small Thumbnail with Play overlay */}
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-charcoal-bark shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://img.youtube.com/vi/${track.youtubeId}/mqdefault.jpg`}
                        alt={track.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                          isSelected && isPlaying
                            ? "bg-amber-900/60"
                            : "bg-black/35 group-hover:bg-black/20"
                        }`}
                      >
                        {isSelected && isPlaying ? (
                          <div className="flex items-center gap-0.5">
                            <span className="h-4 w-1 rounded-full bg-amber-300 animate-pulse" />
                            <span className="h-6 w-1 rounded-full bg-white animate-pulse [animation-delay:150ms]" />
                            <span className="h-3 w-1 rounded-full bg-amber-300 animate-pulse [animation-delay:300ms]" />
                          </div>
                        ) : (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-amber-900 shadow-sm transition-transform group-hover:scale-110">
                            <Icon name="play_arrow" className="text-[18px] ml-0.5" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Song Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`rounded px-1.5 py-0.2 text-[10px] font-bold uppercase tracking-wider ${
                            isSelected
                              ? "bg-amber-600 text-white"
                              : "bg-amber-200/70 text-amber-900"
                          }`}
                        >
                          {track.badge}
                        </span>
                        <span className="text-[11px] font-medium text-on-surface-variant">
                          {track.duration}
                        </span>
                      </div>
                      <p
                        className={`truncate text-label-md font-bold mt-1 ${
                          isSelected ? "text-amber-950 font-extrabold" : "text-on-surface"
                        }`}
                      >
                        {track.hindiTitle}
                      </p>
                      <p className="truncate text-body-sm text-on-surface-variant">
                        {track.artist}
                      </p>
                    </div>

                    {/* Playing indicator / Chevron */}
                    <div className="shrink-0">
                      {isSelected ? (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-600 text-white shadow-xs">
                          <Icon name="volume_up" className="text-[16px]" />
                        </span>
                      ) : (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full text-on-surface-variant group-hover:text-primary transition-colors">
                          <Icon name="chevron_right" className="text-[20px]" />
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
    </section>
  );
}
