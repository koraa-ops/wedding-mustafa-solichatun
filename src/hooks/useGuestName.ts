import { useState, useEffect } from 'react';

export function useGuestName(): string {
  const [guestName, setGuestName] = useState<string>('Tamu Undangan');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const name = params.get('to') || params.get('u') || params.get('nama') || params.get('guest');
      if (name && name.trim().length > 0) {
        setGuestName(name.trim());
      }
    }
  }, []);

  return guestName;
}
