import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, MessageSquareHeart, CheckCircle, HelpCircle, XCircle } from 'lucide-react';
import { weddingData, type WishMessage } from '../../config/weddingData';

interface RsvpSectionProps {
  initialGuestName?: string;
  onSuccessToast: (msg: string) => void;
}

export function RsvpSection({ initialGuestName = '', onSuccessToast }: RsvpSectionProps) {
  const [name, setName] = useState(initialGuestName);
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [pax, setPax] = useState('1');
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState<WishMessage[]>([]);

  // Load saved wishes from localStorage or fall back to weddingData.initialWishes
  useEffect(() => {
    const saved = localStorage.getItem('wedding_wishes');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch {
        setWishes(weddingData.initialWishes);
      }
    } else {
      setWishes(weddingData.initialWishes);
    }
  }, []);

  // Update name if initialGuestName changes or read directly from URL query
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlGuest = params.get('to') || params.get('u') || params.get('nama') || params.get('guest');
      if (urlGuest && urlGuest.trim()) {
        setName(urlGuest.trim());
        return;
      }
    }
    if (initialGuestName && initialGuestName !== 'Tamu Undangan') {
      setName(initialGuestName);
    }
  }, [initialGuestName]);

  const sendTelegramNotification = async (
    guestName: string,
    attend: string,
    guestPax: string,
    wishMsg: string
  ) => {
    const { botToken, chatId } = weddingData.telegram;
    if (!botToken || !chatId) return;

    const attendanceLabel =
      attend === 'hadir'
        ? `✅ Hadir (${guestPax} Orang)`
        : attend === 'ragu'
        ? '❓ Masih Ragu'
        : '❌ Belum Bisa Hadir';

    const now = new Date();
    const timeString =
      now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WIB';

    const wishContent = wishMsg && wishMsg.trim() ? `"${wishMsg.trim()}"` : `_(Tanpa pesan/doa khusus)_`;

    const text =
      `💌 *NOTIFIKASI RSVP BARU!*\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Nama*: ${guestName}\n` +
      `📋 *Status*: ${attendanceLabel}\n` +
      `💬 *Doa & Pesan*:\n` +
      `${wishContent}\n\n` +
      `⏰ *Waktu*: ${timeString}\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `_The Wedding of Mustafa & Chaca (Kun Sholichatun)_`;

    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'Markdown',
        }),
      });
    } catch (err) {
      console.warn('Telegram notification failed:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Mohon isi nama lengkap Anda.');
      return;
    }

    const trimmedMsg = message.trim();

    const newWish: WishMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      message: trimmedMsg || 'Turut berbahagia dan mendoakan keberkahan untuk kedua mempelai.',
      attendance,
      timestamp: 'Baru saja',
    };

    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    localStorage.setItem('wedding_wishes', JSON.stringify(updatedWishes));

    // Send Real-Time Push Notification to Telegram Bot
    sendTelegramNotification(name.trim(), attendance, pax, trimmedMsg);

    setMessage('');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#dfa851', '#f472b6', '#ffffff', '#c99557'],
      });
    } catch {
      // ignore
    }

    onSuccessToast('Terima kasih! Doa dan konfirmasi kehadiran Anda telah terkirim.');
  };

  const getAttendanceBadge = (status: 'hadir' | 'tidak_hadir' | 'ragu') => {
    switch (status) {
      case 'hadir':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 border border-emerald-500/40 text-emerald-700">
            <CheckCircle className="w-3 h-3" /> Hadir
          </span>
        );
      case 'ragu':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 border border-amber-500/40 text-amber-700">
            <HelpCircle className="w-3 h-3" /> Masih Ragu
          </span>
        );
      case 'tidak_hadir':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 border border-rose-500/40 text-rose-700">
            <XCircle className="w-3 h-3" /> Belum Hadir
          </span>
        );
    }
  };

  return (
    <section id="rsvp" className="relative py-16 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#8e632b] font-semibold">
            RSVP &amp; Wishes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2d1b22] font-bold mt-2">
            Konfirmasi &amp; Doa Restu
          </h2>
          <div className="w-16 h-0.5 bg-[#c99557] mx-auto mt-3" />
        </motion.div>
        <p className="max-w-md mx-auto text-xs sm:text-sm text-[#5a3e48] mt-4 font-light">
          Mohon konfirmasi kehadiran Anda agar kami dapat mempersiapkan jamuan terbaik untuk Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* RSVP Form */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 sm:p-8 rounded-3xl glass-card"
        >
          <h3 className="font-serif text-xl font-bold text-[#2d1b22] mb-6 flex items-center gap-2">
            <MessageSquareHeart className="w-5 h-5 text-[#b38238]" />
            <span>Kirim Ucapan &amp; RSVP</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-xs uppercase font-semibold tracking-wider text-[#8e632b] mb-1.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda..."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#dfa851]/40 text-[#2d1b22] placeholder-stone-400 text-sm focus:outline-none focus:border-[#b38238]"
              />
            </div>

            {/* Attendance Radio */}
            <div>
              <label className="block text-xs uppercase font-semibold tracking-wider text-[#8e632b] mb-1.5">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'hadir', label: 'Hadir' },
                  { value: 'ragu', label: 'Masih Ragu' },
                  { value: 'tidak_hadir', label: 'Tidak Hadir' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAttendance(opt.value as any)}
                    className={`py-2 px-1 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                      attendance === opt.value
                        ? 'bg-gradient-to-r from-[#b38238] to-[#dfa851] border-[#b38238] text-white shadow-sm'
                        : 'bg-white border-[#dfa851]/35 text-[#5a3e48] hover:bg-[#faf4ed]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pax Selector */}
            {attendance === 'hadir' && (
              <div>
                <label className="block text-xs uppercase font-semibold tracking-wider text-[#8e632b] mb-1.5">
                  Jumlah Tamu
                </label>
                <select
                  value={pax}
                  onChange={(e) => setPax(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#dfa851]/40 text-[#2d1b22] text-sm focus:outline-none focus:border-[#b38238]"
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                  <option value="3">3 Orang</option>
                  <option value="4">4 Orang</option>
                </select>
              </div>
            )}

            {/* Message Textarea (Optional) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs uppercase font-semibold tracking-wider text-[#8e632b]">
                  Doa Restu &amp; Pesan
                </label>
                <span className="text-[10px] text-[#8e632b]/70 font-medium italic">(Opsional)</span>
              </div>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan ucapan dan doa terbaik Anda (boleh dikosongkan)..."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#dfa851]/40 text-[#2d1b22] placeholder-stone-400 text-sm focus:outline-none focus:border-[#b38238] resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-full font-semibold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-[#b38238] via-[#dfa851] to-[#b38238] hover:brightness-110 transition shadow-md shadow-[#b38238]/20 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <Send className="w-4 h-4 text-white" />
              <span>Kirim Konfirmasi &amp; Doa</span>
            </button>
          </form>
        </motion.div>

        {/* Wishes List Feed */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 sm:p-8 rounded-3xl glass-card flex flex-col h-[520px]"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#dfa851]/30">
            <h3 className="font-serif text-xl font-bold text-[#2d1b22]">
              Doa &amp; Ucapan ({wishes.length})
            </h3>
            <span className="text-[10px] text-[#8e632b] uppercase tracking-wider font-semibold">
              Live Feed
            </span>
          </div>

          {/* Scrollable messages container */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {wishes.map((w: WishMessage) => (
              <div
                key={w.id}
                className="p-3.5 rounded-2xl bg-[#faf4ed]/90 border border-[#dfa851]/25 flex flex-col gap-1.5 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#2d1b22] font-serif">
                    {w.name}
                  </h4>
                  {getAttendanceBadge(w.attendance)}
                </div>
                <p className="text-xs text-[#5a3e48] font-light leading-relaxed">
                  {w.message}
                </p>
                <span className="text-[10px] text-stone-400 mt-0.5">
                  {w.timestamp}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
