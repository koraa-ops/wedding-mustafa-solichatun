import { motion } from 'framer-motion';
import { ChevronDown, Heart, Sparkles } from 'lucide-react';
import { CountdownTimer } from '../ui/CountdownTimer';
import { weddingData } from '../../config/weddingData';

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-14 pb-12 overflow-hidden">
      {/* Decorative Fairytale Top Accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-3 mb-2"
      >
        <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#c99557]" />
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#dfa851]/40 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#dfa851]" />
          <span className="font-cinzel text-[11px] tracking-[0.25em] uppercase text-[#8e632b] font-semibold">
            Walimatul 'Ursy
          </span>
        </div>
        <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#c99557]" />
      </motion.div>

      {/* Main Couple Calligraphy & Typography */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="my-3 relative"
      >
        <h1 className="font-script text-5xl sm:text-7xl md:text-8xl py-2 relative z-10 leading-tight">
          <span className="bg-gradient-to-r from-[#942b3b] via-[#b43e52] to-[#842338] bg-clip-text text-transparent font-bold">
            {weddingData.groom.nickName}
          </span>
          <span className="font-serif text-3xl sm:text-5xl text-[#c99557] mx-3 sm:mx-4 font-normal">
            &amp;
          </span>
          <span className="bg-gradient-to-r from-[#942b3b] via-[#b43e52] to-[#842338] bg-clip-text text-transparent font-bold">
            {weddingData.bride.nickName}
          </span>
        </h1>
        <p className="font-serif text-sm sm:text-base text-[#6b4e3d] tracking-wide mt-1 font-semibold">
          {weddingData.groom.fullName} &amp; {weddingData.bride.fullName}
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="font-serif text-sm sm:text-base text-[#8e632b] tracking-wider mb-2 font-medium"
      >
        {weddingData.weddingDateDisplay}
      </motion.p>

      {/* Countdown Timer with Google Calendar Integration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="w-full"
      >
        <CountdownTimer
          targetDate={weddingData.weddingDate}
          calendarUrl={weddingData.events[0]?.calendarUrl}
        />
      </motion.div>

      {/* Quranic Verse / Romantic Quote Card in Clean Frosted Glass */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative max-w-xl w-full mx-auto mt-6 p-6 sm:p-8 rounded-3xl glass-card text-center"
      >
        <div className="flex justify-center mb-3">
          <Heart className="w-5 h-5 text-[#b43e52] fill-[#b43e52]/30" />
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-[#4a343b] font-serif italic">
          "{weddingData.quote.text}"
        </p>
        <p className="font-serif text-xs font-bold text-[#8e632b] mt-3 tracking-widest uppercase">
          {weddingData.quote.source}
        </p>
      </motion.div>

      {/* Scroll Down Indicator */}
      <div className="mt-8 flex flex-col items-center gap-1 opacity-70 animate-bounce">
        <span className="text-[10px] tracking-widest uppercase text-[#8e632b] font-medium">Gulir ke bawah</span>
        <ChevronDown className="w-4 h-4 text-[#c99557]" />
      </div>
    </section>
  );
}
