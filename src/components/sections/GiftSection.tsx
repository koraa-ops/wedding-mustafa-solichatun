import { motion } from 'framer-motion';
import { Copy, CreditCard, Package } from 'lucide-react';
import { weddingData, type BankAccount } from '../../config/weddingData';

interface GiftSectionProps {
  onCopyText: (text: string, label: string) => void;
}

export function GiftSection({ onCopyText }: GiftSectionProps) {
  return (
    <section id="hadiah" className="relative py-16 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#8e632b] font-semibold">
            Wedding Gift
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2d1b22] font-bold mt-2">
            Tanda Kasih (Amplop Digital)
          </h2>
          <div className="w-16 h-0.5 bg-[#c99557] mx-auto mt-3" />
        </motion.div>
        <p className="max-w-md mx-auto text-xs sm:text-sm text-[#5a3e48] mt-4 font-light">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, Anda dapat menyalurkannya melalui:
        </p>
      </div>

      {/* Bank Accounts List (1 Baris per Rekening) */}
      <div className="space-y-4 max-w-2xl mx-auto mb-8">
        {weddingData.bankAccounts.map((bank: BankAccount, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="p-4 sm:p-5 rounded-2xl glass-card glass-card-hover flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#dfa851]/40"
          >
            {/* Left: Bank Icon & Info */}
            <div className="flex items-center gap-3.5 w-full sm:w-auto text-left">
              <div className="w-12 h-12 rounded-xl bg-[#fbf3e6] border border-[#dfa851]/45 flex items-center justify-center shrink-0 shadow-xs">
                <CreditCard className="w-6 h-6 text-[#b38238]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-sm sm:text-base text-[#2d1b22]">
                    {bank.bankName}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#fbf3e6] border border-[#dfa851]/30 text-[#8e632b]">
                    {bank.logo || 'BANK'}
                  </span>
                </div>
                <p className="font-mono text-base sm:text-lg font-bold text-[#842338] tracking-wider my-0.5">
                  {bank.accountNumber}
                </p>
                <p className="text-xs text-[#5a3e48] font-medium">
                  a.n {bank.accountHolder}
                </p>
              </div>
            </div>

            {/* Right: Salin Button */}
            <button
              onClick={() => onCopyText(bank.accountNumber, `Nomor Rekening ${bank.bankName}`)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#b38238] via-[#dfa851] to-[#b38238] text-white text-xs font-semibold shadow-md shadow-[#b38238]/20 hover:brightness-110 active:scale-95 transition cursor-pointer shrink-0"
            >
              <Copy className="w-3.5 h-3.5 text-white" />
              <span>Salin No. Rekening</span>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Physical Gift Address Card */}
      {weddingData.physicalGiftAddress && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-3xl glass-card text-center max-w-xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-3 text-[#b38238]">
            <Package className="w-5 h-5 text-[#b43e52]" />
            <h3 className="font-serif font-bold text-[#2d1b22] text-base">
              Kirim Kado Fisik
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#5a3e48] font-light leading-relaxed mb-4">
            Penerima: <strong className="text-[#2d1b22] font-semibold">{weddingData.physicalGiftAddress.recipient}</strong> ({weddingData.physicalGiftAddress.phone})<br />
            {weddingData.physicalGiftAddress.address}
          </p>

          <button
            onClick={() =>
              onCopyText(
                `${weddingData.physicalGiftAddress.recipient} (${weddingData.physicalGiftAddress.phone}) - ${weddingData.physicalGiftAddress.address}`,
                'Alamat Pengiriman Kado'
              )
            }
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#faf4ed] border border-[#dfa851]/50 text-xs text-[#8e632b] hover:bg-[#f3e8dc] transition font-medium cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-[#b38238]" />
            <span>Salin Alamat Pengiriman</span>
          </button>
        </motion.div>
      )}
    </section>
  );
}
