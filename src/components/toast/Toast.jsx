import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PixelSprite from '../pixel/PixelSprite.jsx';
import './Toast.css';

const ToastContext = createContext(() => {});

/** One-line, chat-bubble style notifications. useToast()(text, 'heart'?) */
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timer = useRef(0);

  const show = useCallback((text, icon) => {
    clearTimeout(timer.current);
    setToast({ id: Date.now(), text, icon });
    timer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="toast-region" role="status" aria-live="polite" aria-atomic="true">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              className="toast"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            >
              {toast.icon === 'heart' && <PixelSprite sprite="heart" scale={2} palette={{ B: '#8FA2FF' }} />}
              <span>{toast.text}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
