import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  title?: string;
}

export function MusicPlayer({ isPlaying, onToggle, title }: MusicPlayerProps) {
  return (
    <div className="fixed top-5 right-5 z-40 flex items-center gap-3">
      {/* Title chip */}
      {title && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#dfa851]/40 text-xs text-[#8e632b] font-medium shadow-sm"
        >
          <Music className={`w-3.5 h-3.5 text-[#dfa851] ${isPlaying ? 'animate-bounce' : ''}`} />
          <span className="max-w-[170px] truncate">{title}</span>
        </motion.div>
      )}

      {/* Spinning Vinyl Record Toggle Button */}
      <button
        onClick={onToggle}
        aria-label={isPlaying ? 'Pause Musik' : 'Putar Musik'}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/90 border-2 border-[#dfa851]/60 shadow-lg shadow-[#8e632b]/20 transition-transform active:scale-95 hover:border-[#dfa851] cursor-pointer"
      >
        {/* Vinyl Grooves & Gold Rim */}
        <div
          className={`absolute inset-0.5 rounded-full border border-dashed border-[#dfa851]/50 flex items-center justify-center ${
            isPlaying ? 'animate-spin [animation-duration:5s]' : ''
          }`}
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#9e6d2b] to-[#f5d089] opacity-80" />
        </div>

        {/* Center Play/Mute Icon */}
        <div className="relative z-10 text-[#8e632b] group-hover:text-[#b38238] transition-colors">
          {isPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400" />
          )}
        </div>

        {/* Subtle Pulse Halo when playing */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full border border-[#dfa851]/40 animate-ping pointer-events-none" />
        )}
      </button>
    </div>
  );
}
