import { Heart, Calendar, Image, Gift, MessageCircleHeart, Users } from 'lucide-react';

interface BottomNavProps {
  activeSection?: string;
}

export function BottomNav({ activeSection }: BottomNavProps) {
  const navItems = [
    { id: 'mempelai', label: 'Pasangan', icon: Users },
    { id: 'acara', label: 'Acara', icon: Calendar },
    { id: 'cerita', label: 'Kisah', icon: Heart },
    { id: 'galeri', label: 'Galeri', icon: Image },
    { id: 'hadiah', label: 'Hadiah', icon: Gift },
    { id: 'rsvp', label: 'Ucapan', icon: MessageCircleHeart },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-fit px-3 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-[#dfa851]/45 shadow-2xl shadow-[#8e632b]/20 flex items-center gap-1.5 sm:gap-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 sm:px-3 rounded-full transition-all text-xs cursor-pointer ${
              isActive
                ? 'text-white bg-gradient-to-r from-[#b38238] to-[#dfa851] shadow-xs'
                : 'text-[#6b4e3d] hover:text-[#b38238]'
            }`}
          >
            <Icon className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] hidden sm:inline tracking-wider font-semibold">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
