import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { weddingData, type StoryMilestone } from '../../config/weddingData';

export function StorySection() {
  return (
    <section id="cerita" className="relative py-16 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#8e632b] font-semibold">
            Our Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2d1b22] font-bold mt-2">
            Kisah Cinta Kami
          </h2>
          <div className="w-16 h-0.5 bg-[#c99557] mx-auto mt-3" />
        </motion.div>
        <p className="max-w-md mx-auto text-xs sm:text-sm text-[#5a3e48] mt-4 font-light">
          Setiap kisah cinta itu indah, namun bagi kami, kisah cinta kamilah yang paling istimewa.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative border-l-2 border-[#dfa851]/40 ml-4 sm:ml-32 space-y-12">
        {weddingData.stories.map((story: StoryMilestone, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative pl-6 sm:pl-10"
          >
            {/* Timeline Dot with Heart Icon */}
            <div className="absolute -left-[17px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-[#dfa851] shadow-md">
              <Heart className="w-3.5 h-3.5 text-[#b43e52] fill-[#b43e52]" />
            </div>

            {/* Year Badge */}
            <div className="sm:absolute sm:-left-32 sm:top-1 text-left sm:text-right sm:w-24 mb-2 sm:mb-0">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-serif font-bold text-[#8e632b] bg-[#fbf3e6] border border-[#dfa851]/40 shadow-xs">
                {story.year}
              </span>
            </div>

            {/* Content Card */}
            <div className="p-6 rounded-2xl glass-card glass-card-hover max-w-xl">
              <h3 className="font-serif text-xl font-bold text-[#2d1b22] mb-2">
                {story.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5a3e48] leading-relaxed font-light mb-4">
                {story.description}
              </p>
              {story.image && (
                <div className="overflow-hidden rounded-xl aspect-[16/10] sm:aspect-[21/9] w-full shadow-sm">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
