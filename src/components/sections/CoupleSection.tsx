import { motion } from 'framer-motion';
import { Heart, MapPin } from 'lucide-react';
import { weddingData } from '../../config/weddingData';

function InstagramIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export function CoupleSection() {
  return (
    <section id="mempelai" className="relative py-16 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#8e632b] font-semibold">
            The Happy Couple
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2d1b22] font-bold mt-2">
            Mempelai Bahagia
          </h2>
          <div className="w-16 h-0.5 bg-[#c99557] mx-auto mt-3" />
        </motion.div>

        {/* Official Invitation Greeting from PDF */}
        <div className="max-w-xl mx-auto mt-4 space-y-2">
          <p className="font-serif text-base sm:text-lg text-[#842338] font-bold">
            {weddingData.invitationNote.greeting}
          </p>
          <p className="text-xs sm:text-sm text-[#5a3e48] leading-relaxed font-light">
            {weddingData.invitationNote.intro}
          </p>
        </div>
      </div>

      {/* Couple Profiles Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Mempelai Pria: Mustafa Masykur */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl glass-card glass-card-hover overflow-hidden"
        >
          {/* Circular Photo with Luxury Golden Floral Border */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-5">
            <div className="absolute inset-0 rounded-full border-2 border-[#dfa851] animate-spin [animation-duration:25s] border-dashed opacity-80" />
            <div className="absolute -inset-2 rounded-full border border-[#b43e52]/30" />
            <img
              src={weddingData.groom.photo}
              alt={weddingData.groom.fullName}
              className="w-full h-full object-cover object-center rounded-full shadow-lg p-1.5"
            />
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#2d1b22] tracking-wide">
            {weddingData.groom.fullName}
          </h3>
          <p className="text-xs text-[#842338] uppercase tracking-widest font-semibold mt-1 mb-3">
            - Mempelai Pria ({weddingData.groom.nickName}) -
          </p>
          <p className="text-xs sm:text-sm text-[#5a3e48] leading-relaxed max-w-xs font-light">
            {weddingData.groom.description}:<br />
            <strong className="text-[#2d1b22] font-semibold">{weddingData.groom.fatherName}</strong>
            <br />&amp;<br />
            <strong className="text-[#2d1b22] font-semibold">{weddingData.groom.motherName}</strong>
          </p>

          <div className="flex items-center gap-1.5 mt-3 text-xs text-[#6b4e3d] font-medium max-w-xs justify-center">
            <MapPin className="w-3.5 h-3.5 text-[#b43e52] shrink-0" />
            <span>{weddingData.groom.origin}</span>
          </div>

          {weddingData.groom.instagram && (
            <a
              href={`https://instagram.com/${weddingData.groom.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full text-xs text-[#842338] bg-rose-50 border border-[#b43e52]/30 hover:bg-rose-100 transition"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#b43e52]" />
              <span>@{weddingData.groom.instagram}</span>
            </a>
          )}
        </motion.div>

        {/* Center Golden Ampersand Divider for Desktop */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#dfa851] shadow-xl items-center justify-center text-[#c99557] font-serif font-bold text-xl">
          &amp;
        </div>

        {/* Mempelai Wanita: Kun Sholichatun (Chaca) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl glass-card glass-card-hover overflow-hidden"
        >
          {/* Circular Photo with Luxury Golden Floral Border */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-5">
            <div className="absolute inset-0 rounded-full border-2 border-[#dfa851] animate-spin [animation-duration:25s] border-dashed opacity-80" />
            <div className="absolute -inset-2 rounded-full border border-[#b43e52]/30" />
            <img
              src={weddingData.bride.photo}
              alt={weddingData.bride.fullName}
              className="w-full h-full object-cover object-center rounded-full shadow-lg p-1.5"
            />
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#2d1b22] tracking-wide">
            {weddingData.bride.fullName}
          </h3>
          <p className="text-xs text-[#842338] uppercase tracking-widest font-semibold mt-1 mb-3">
            - Mempelai Wanita ({weddingData.bride.nickName}) -
          </p>
          <p className="text-xs sm:text-sm text-[#5a3e48] leading-relaxed max-w-xs font-light">
            {weddingData.bride.description}:<br />
            <strong className="text-[#2d1b22] font-semibold">{weddingData.bride.fatherName}</strong>
            <br />&amp;<br />
            <strong className="text-[#2d1b22] font-semibold">{weddingData.bride.motherName}</strong>
          </p>

          <div className="flex items-center gap-1.5 mt-3 text-xs text-[#6b4e3d] font-medium max-w-xs justify-center">
            <MapPin className="w-3.5 h-3.5 text-[#b43e52] shrink-0" />
            <span>{weddingData.bride.origin}</span>
          </div>

          {weddingData.bride.instagram && (
            <a
              href={`https://instagram.com/${weddingData.bride.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full text-xs text-[#842338] bg-rose-50 border border-[#b43e52]/30 hover:bg-rose-100 transition"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#b43e52]" />
              <span>@{weddingData.bride.instagram}</span>
            </a>
          )}
        </motion.div>
      </div>

      {/* Romantic Floating Heart Divider */}
      <div className="flex justify-center items-center gap-3 mt-12 text-[#c99557]">
        <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#c99557]/50" />
        <Heart className="w-4 h-4 fill-[#b43e52] text-[#b43e52] animate-pulse" />
        <div className="w-20 h-px bg-gradient-to-l from-transparent to-[#c99557]/50" />
      </div>
    </section>
  );
}
