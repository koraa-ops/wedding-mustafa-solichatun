import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
  calendarUrl?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export function CountdownTimer({ targetDate, calendarUrl }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPassed: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-6 my-6">
      {/* 4 Box Countdown Grid */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-sm sm:max-w-md w-full px-2">
        {units.map((unit, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center py-3 sm:py-4 px-2 rounded-2xl bg-white/85 border border-[#dfa851]/45 backdrop-blur-md shadow-md shadow-[#8e632b]/10"
          >
            <span className="font-serif text-2xl sm:text-4xl font-bold gold-gradient-text tracking-tight">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8e632b] mt-1 font-semibold">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* Save to Google Calendar Button */}
      {calendarUrl && (
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-[#b38238] via-[#dfa851] to-[#b38238] border border-[#fef3c7] hover:brightness-110 transition shadow-md shadow-[#b38238]/20 active:scale-95"
        >
          <Calendar className="w-4 h-4 text-[#fef3c7]" />
          <span>Simpan ke Google Calendar</span>
        </a>
      )}
    </div>
  );
}
