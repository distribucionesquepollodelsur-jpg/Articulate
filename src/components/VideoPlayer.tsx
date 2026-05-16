import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { Play, Pause, RotateCcw, Volume2, Maximize2, Settings } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  type?: string;
  poster?: string;
  onReady?: (player: any) => void;
  onEnded?: () => void;
  title?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  src, 
  type = 'video/mp4', 
  poster,
  onReady,
  onEnded,
  title
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered', 'vjs-articulate');
      videoRef.current?.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        poster,
        sources: [{ src, type }],
        playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
        userActions: {
          hotkeys: true
        }
      }, () => {
        onReady?.(player);
      });

      player.on('ended', () => {
        onEnded?.();
      });
    } else {
      const player = playerRef.current;
      player.autoplay(false);
      player.src({ src, type });
    }
  }, [src, type, poster, onReady]);

  // Dispose the player on unmount
  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className="relative group rounded-[32px] overflow-hidden shadow-2xl border-8 border-brand-primary/5 bg-black">
      {title && (
        <div className="absolute top-0 left-0 right-0 p-6 z-20 bg-gradient-to-b from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <h3 className="text-white font-serif font-bold text-lg">{title}</h3>
        </div>
      )}
      <div data-vjs-player>
        <div ref={videoRef} className="aspect-video" />
      </div>
      
      <style>{`
        .vjs-articulate .vjs-big-play-button {
          background-color: var(--color-brand-accent);
          border-radius: 50%;
          width: 80px;
          height: 80px;
          line-height: 80px;
          border: none;
          box-shadow: 0 20px 40px rgba(var(--color-brand-accent-rgb), 0.4);
        }
        .vjs-articulate .vjs-control-bar {
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(12px);
          height: 60px;
        }
        .vjs-articulate .vjs-play-progress {
          background-color: var(--color-brand-accent);
        }
        .vjs-articulate .vjs-slider {
          background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};
