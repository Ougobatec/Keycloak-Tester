import { useState, useCallback, useEffect, useRef } from 'react';
import { GlassPanel } from './GlassPanel';
import { IconBox } from './IconBox';
import { Button } from './Button';
import type { ColorName } from '../styles/colors';

interface ToastProps {
  message: string | null;
  color?: ColorName;
  duration?: number;
  onClose?: () => void;
}

export function Toast({
  message,
  color = 'emerald',
  duration = 3000,
  onClose,
}: ToastProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const autoCloseTimerRef = useRef<number | null>(null);

  const handleClose = useCallback(() => {
    // Annuler le timer auto si existant
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }

    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsEntering(false);
      onClose?.();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (message) {
      setIsEntering(false);
      // Petit délai pour déclencher l'animation
      setTimeout(() => setIsEntering(true), 10);

      // Timer de fermeture automatique
      autoCloseTimerRef.current = window.setTimeout(() => {
        handleClose();
      }, duration);

      return () => {
        if (autoCloseTimerRef.current) {
          clearTimeout(autoCloseTimerRef.current);
          autoCloseTimerRef.current = null;
        }
      };
    }
  }, [message, duration, handleClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isClosing ? 'translate-x-[120%] opacity-0' : isEntering ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'}`}
    >
      <GlassPanel padding="sm" borderColor={color} className="max-w-sm">
        <div className="flex items-center gap-3">
          <IconBox color={color} size="sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </IconBox>
          <p className="text-white font-medium flex-1">{message}</p>
          <Button size="sm" onClick={handleClose} className="p-1.5! shrink-0">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
      </GlassPanel>
    </div>
  );
}
