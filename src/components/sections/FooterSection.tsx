import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { weddingData } from '../../config/weddingData';

export function FooterSection() {
  return (
    <footer className="relative pt-16 pb-28 px-4 text-center border-t border-[#dfa851]/30 bg-gradient-to-b from-transparent via-[#fbf7f4] to-[#f4ebe3]">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Monogram Badge - Fully Responsive */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#dfa851] flex items-center justify-center mb-5 bg-white shadow-md shadow-[#8e632b]/15"
        >
          <span className="font-script text-2xl sm:text-3xl text-[#842338] font-bold leading-none select-none">
            {weddingData.groom.nickName[0]} &amp; {weddingData.bride.nickName[0]}
          </span>
        </motion.div>

        <h3 className="font-script text-4xl sm:text-5xl text-[#842338] font-bold mb-3">
          Terima Kasih
        </h3>

        <p className="text-xs sm:text-sm text-[#5a3e48] leading-relaxed font-light max-w-md mx-auto mb-4 px-2">
          {weddingData.invitationNote.closing}
        </p>

        <p className="font-serif text-sm sm:text-base text-[#8e632b] mb-6 font-semibold">
          {weddingData.invitationNote.salamClosing}
        </p>

        <div className="space-y-1 mb-5">
          <p className="text-[11px] sm:text-xs text-[#8e632b] uppercase tracking-widest font-cinzel font-semibold">
            Hormat Kami:
          </p>
          <p className="font-serif text-base sm:text-lg font-bold text-[#2d1b22] tracking-wider">
            {weddingData.invitationNote.hosts}
          </p>
          <p className="text-xs text-[#6b4e3d] italic">
            Beserta Seluruh Keluarga Besar Kedua Mempelai
          </p>
        </div>

        {/* Dynamic & Responsive Couple Signature */}
        <div className="mt-2 mb-4 px-2">
          <p className="font-script text-3xl sm:text-4xl text-[#842338] mb-1">
            {weddingData.groom.nickName} &amp; {weddingData.bride.nickName}
          </p>
          <p className="font-serif text-xs sm:text-sm font-semibold text-[#5a3e48] tracking-wide max-w-sm sm:max-w-md mx-auto leading-relaxed">
            {weddingData.groom.fullName}
            <span className="mx-1.5 text-[#dfa851]">&amp;</span>
            {weddingData.bride.fullName}
          </p>
        </div>

        {/* Small copyright / romantic seal */}
        <div className="mt-10 flex items-center justify-center gap-1.5 text-[11px] text-[#6b4e3d]/70 font-light">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-[#b43e52] fill-[#b43e52]" />
          <span>for {weddingData.groom.nickName} &amp; {weddingData.bride.nickName}'s Blessed Wedding</span>
        </div>
      </div>
    </footer>
  );
}
