import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, Sparkles, Heart } from 'lucide-react';
import { RomanticScene3D } from '../3d/RomanticScene3D';
import { weddingData } from '../../config/weddingData';

interface EnvelopeCoverProps {
  guestName: string;
  onOpen: () => void;
}

export function EnvelopeCover({ guestName, onOpen }: EnvelopeCoverProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);
    // Smooth transition delay to let 3D wax seal and letter slide up
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -40, scale: 0.98 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#140e13] via-[#0d090c] to-[#170e14] px-4 py-8 select-none"
      >
        {/* Semi-realistic Corner Floral Overlays (Realistic Depth Framing) */}
        <div className="absolute -top-6 -right-6 w-64 sm:w-96 pointer-events-none mix-blend-screen opacity-65 animate-float-slow select-none z-10">
          <img
            src="/images/floral_corner.jpg"
            alt="Romantic Floral Corner"
            className="w-full h-auto object-contain filter drop-shadow-[0_10px_20px_rgba(201,149,87,0.3)]"
          />
        </div>
        <div className="absolute -bottom-6 -left-6 w-64 sm:w-96 pointer-events-none mix-blend-screen opacity-65 animate-float-slow rotate-180 select-none z-10">
          <img
            src="/images/floral_corner.jpg"
            alt="Romantic Floral Corner"
            className="w-full h-auto object-contain filter drop-shadow-[0_10px_20px_rgba(201,149,87,0.3)]"
          />
        </div>

        {/* 3D Scene Layer (Floating 3D Petals, 3D Flowers, & Interactive 3D Envelope) */}
        <RomanticScene3D
          showEnvelope={true}
          isEnvelopeOpen={isOpening}
          onEnvelopeClick={handleOpenClick}
        />

        {/* Top Header Information */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-20 text-center pt-2 pointer-events-none"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c99557]" />
            <Sparkles className="w-4 h-4 text-[#dfa851]" />
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c99557]" />
          </div>
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-[#eed7ba]">
            The Wedding of
          </p>
          <h1 className="font-script text-4xl sm:text-6xl text-white mt-1 drop-shadow-md">
            <span className="gold-gradient-text">{weddingData.groom.nickName}</span>
            <span className="text-[#e8a598] font-serif text-2xl sm:text-3xl mx-2">&amp;</span>
            <span className="gold-gradient-text">{weddingData.bride.nickName}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#d6c7b9] font-serif tracking-widest mt-1 opacity-80">
            {weddingData.weddingDateDisplay}
          </p>
        </motion.div>

        {/* Bottom Card: Kepada Yth & Tombol Buka Undangan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-20 max-w-sm w-full text-center pb-4 flex flex-col items-center"
        >
          <div className="w-full p-6 rounded-2xl bg-[#1a1217]/85 backdrop-blur-md border border-[#c99557]/40 shadow-2xl shadow-black/80 mb-4">
            <p className="text-xs font-light tracking-widest uppercase text-[#eed7ba]/80 mb-2">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <div className="py-2 px-4 rounded-xl bg-[#281c24]/60 border border-[#c99557]/20 my-2">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white tracking-wide">
                {guestName}
              </h2>
            </div>
            <p className="text-[11px] text-[#cfbeaf] italic mt-2">
              *Mohon maaf bila ada kesalahan penulisan nama/gelar
            </p>
          </div>

          {/* Interactive Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleOpenClick}
            disabled={isOpening}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase text-[#140e13] bg-gradient-to-r from-[#f5d089] via-[#dfa851] to-[#ffd700] shadow-xl shadow-[#c99557]/30 hover:shadow-[#c99557]/50 transition-all border border-[#fff2cc] cursor-pointer"
          >
            <MailOpen className="w-5 h-5 text-[#3b250e] group-hover:rotate-12 transition-transform" />
            <span className="text-[#2a1705] font-bold">
              {isOpening ? 'Membuka Surat...' : 'Buka Undangan'}
            </span>
            <Heart className="w-4 h-4 text-[#8a1c2d] fill-[#8a1c2d] animate-pulse" />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
