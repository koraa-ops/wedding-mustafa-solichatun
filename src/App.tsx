import { useState } from 'react';
import { useGuestName } from './hooks/useGuestName';
import { useAudio } from './hooks/useAudio';
import { weddingData } from './config/weddingData';
import { FairytaleStorybookCover } from './components/sections/FairytaleStorybookCover';
import { HeroSection } from './components/sections/HeroSection';
import { CoupleSection } from './components/sections/CoupleSection';
import { EventSection } from './components/sections/EventSection';
import { StorySection } from './components/sections/StorySection';
import { GallerySection } from './components/sections/GallerySection';
import { GiftSection } from './components/sections/GiftSection';
import { RsvpSection } from './components/sections/RsvpSection';
import { FooterSection } from './components/sections/FooterSection';
import { MusicPlayer } from './components/ui/MusicPlayer';
import { BottomNav } from './components/ui/BottomNav';
import { Toast } from './components/ui/Toast';
import { RomanticScene3D } from './components/3d/RomanticScene3D';

export function App() {
  const guestName = useGuestName();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { isPlaying, playAudio, toggleAudio } = useAudio(weddingData.music.url);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    playAudio();
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Berhasil disalin: ${label}`);
  };

  return (
    <div className="relative min-h-screen bg-[#fbf7f4] text-[#2d1b22] selection:bg-[#dfa851] selection:text-white">
      {/* 1. Fairytale Pop-Up Storybook Cover (Inspired by Reference Video) */}
      {!isOpened && (
        <FairytaleStorybookCover
          guestName={guestName}
          onOpen={handleOpenInvitation}
          isPlaying={isPlaying}
          onToggleMusic={toggleAudio}
        />
      )}

      {/* 2. Main Invitation Content (Revealed upon Opening) */}
      {isOpened && (
        <>
          {/* Subtle 3D Ambient Background Layer (Floating rose petals & glowing sparkles) */}
          <div className="fixed inset-0 pointer-events-none z-0 opacity-60">
            <RomanticScene3D interactivePetalsOnly={true} />
          </div>

          {/* Floating UI Controls */}
          <MusicPlayer
            isPlaying={isPlaying}
            onToggle={toggleAudio}
            title={weddingData.music.title}
          />
          <BottomNav />
          <Toast
            message={toastMessage}
            onClose={() => setToastMessage(null)}
          />

          {/* Main Content Sections */}
          <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
            <HeroSection />
            <CoupleSection />
            <EventSection onCopyAddress={(addr) => handleCopyText(addr, 'Alamat Lokasi Acara')} />
            <StorySection />
            <GallerySection />
            <GiftSection onCopyText={handleCopyText} />
            <RsvpSection
              initialGuestName={guestName}
              onSuccessToast={(msg) => showToast(msg)}
            />
            <FooterSection />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
