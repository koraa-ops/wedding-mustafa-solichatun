import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { weddingData, type GalleryPhoto } from '../../config/weddingData';

export function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  return (
    <section id="galeri" className="relative py-16 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#8e632b] font-semibold">
            Our Memories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2d1b22] font-bold mt-2">
            Galeri Pre-Wedding
          </h2>
          <div className="w-16 h-0.5 bg-[#c99557] mx-auto mt-3" />
        </motion.div>
        <p className="max-w-md mx-auto text-xs sm:text-sm text-[#5a3e48] mt-4 font-light">
          Potret kenangan manis yang mengabadikan langkah kami menuju hari bahagia.
        </p>
      </div>

      {/* Gallery Grid (Responsive Mobile Masonry/Grid, 4 columns on Desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
        {weddingData.gallery.map((photo: GalleryPhoto, idx: number) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelectedPhoto(photo)}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-[#faf4ed] border border-[#dfa851]/35 shadow-md hover:shadow-xl transition-all ${
              idx === 3
                ? 'col-span-2 md:col-span-1 aspect-[16/10] md:aspect-[3/4]'
                : 'col-span-1 aspect-[3/4]'
            }`}
          >
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Romantic Overlay on Hover / Active Tap */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
              <span className="text-xs text-[#fef3c7] font-serif italic drop-shadow-sm">
                {photo.caption}
              </span>
              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-[#f5d089]">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full max-h-[85vh] rounded-2xl overflow-hidden bg-white border border-[#dfa851]/50 shadow-2xl flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:text-[#dfa851] transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full h-full max-h-[75vh] flex items-center justify-center bg-stone-100">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.alt}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Caption */}
              <div className="w-full p-4 text-center bg-white border-t border-[#dfa851]/30">
                <p className="text-sm font-serif text-[#2d1b22] italic font-medium">
                  "{selectedPhoto.caption}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
