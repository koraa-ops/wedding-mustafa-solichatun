import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, ExternalLink, Copy } from 'lucide-react';
import { weddingData, type EventDetail } from '../../config/weddingData';

interface EventSectionProps {
  onCopyAddress: (text: string) => void;
}

export function EventSection({ onCopyAddress }: EventSectionProps) {
  return (
    <section id="acara" className="relative py-16 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#8e632b] font-semibold">
            Save The Date
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2d1b22] font-bold mt-2">
            Rangkaian Acara
          </h2>
          <div className="w-16 h-0.5 bg-[#c99557] mx-auto mt-3" />
        </motion.div>

        <p className="max-w-md mx-auto text-xs sm:text-sm text-[#5a3e48] mt-4 font-light">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
      </div>

      {/* Events Grid (3 Balanced Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {weddingData.events.map((event: EventDetail, idx: number) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between p-5 sm:p-6 rounded-3xl glass-card glass-card-hover text-center relative overflow-hidden h-full border border-[#dfa851]/35 shadow-md hover:shadow-xl transition-all"
          >
            {/* Top Ornamental Corner Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#dfa851]/20 to-transparent rounded-bl-full pointer-events-none" />

            <div className="flex-1 flex flex-col">
              {/* Event Subtitle Badge */}
              <div className="mb-2">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-cinzel uppercase tracking-widest text-[#8e632b] bg-[#fbf3e6] border border-[#dfa851]/40 font-bold">
                  {event.subtitle}
                </span>
              </div>

              {/* Event Title with Min Height for Balance */}
              <div className="min-h-[48px] sm:min-h-[54px] flex items-center justify-center mb-3">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2d1b22] leading-snug">
                  {event.title}
                </h3>
              </div>

              {/* Date & Time info box */}
              <div className="flex flex-col gap-2 my-2 py-3 px-2.5 rounded-2xl bg-[#faf4ed] border border-[#dfa851]/30">
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#2d1b22]">
                  <Calendar className="w-3.5 h-3.5 text-[#b38238] shrink-0" />
                  <span className="font-semibold">{event.date}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#5a3e48]">
                  <Clock className="w-3.5 h-3.5 text-[#b38238] shrink-0" />
                  <span className="font-medium">{event.time}</span>
                </div>
              </div>

              {/* Venue & Address */}
              <div className="my-3 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-center gap-1.5 text-[#2d1b22] font-serif font-bold text-base mb-1">
                  <MapPin className="w-4 h-4 text-[#b43e52] shrink-0" />
                  <span>{event.venue}</span>
                </div>
                <p className="text-xs text-[#5a3e48] max-w-xs mx-auto leading-relaxed font-light min-h-[36px] flex items-center justify-center">
                  {event.address}
                </p>
              </div>
            </div>

            {/* Action Buttons: Clean Full-width Vertical Stack */}
            <div className="flex flex-col gap-2 pt-3 border-t border-[#dfa851]/30 mt-2">
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#b38238] via-[#dfa851] to-[#b38238] hover:brightness-110 transition shadow-sm shadow-[#b38238]/20"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Petunjuk Arah (Maps)</span>
              </a>

              <button
                onClick={() => onCopyAddress(`${event.venue}, ${event.address}`)}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-medium text-[#8e632b] bg-white border border-[#dfa851]/45 hover:bg-[#faf4ed] transition cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-[#b38238]" />
                <span>Salin Alamat</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
