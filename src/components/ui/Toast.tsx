import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-white/95 border-2 border-[#dfa851] text-[#2d1b22] shadow-2xl backdrop-blur-md"
        >
          <CheckCircle2 className="w-5 h-5 text-[#dfa851] shrink-0" />
          <span className="text-sm font-semibold tracking-wide">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-xs text-[#8e632b]/80 hover:text-[#8e632b] cursor-pointer"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
