import { useState, useEffect, useCallback } from 'react';
import { GlassPanel } from './GlassPanel';
import { IconBox } from './IconBox';
import { Button } from './Button';
import type { ColorName } from '../styles/colors';

interface ToastItem {
  id: string;
  message: string;
  color: ColorName;
}

interface ToastProps {
  toast: ToastItem;
  index: number;
  onClose: (id: string) => void;
}

function Toast({ toast, index, onClose }: ToastProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(toast.id);
    }, 300);
  }, [toast.id, onClose]);

  useEffect(() => {
    // Animation d'entrée
    setTimeout(() => setIsEntering(true), 10);

    // Timer de fermeture automatique
    const timer = window.setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [handleClose]);

  return (
    <div
      className={`transition-all duration-300 ${isClosing ? 'translate-x-[120%] opacity-0' : isEntering ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'} ${index > 0 ? 'mb-3' : ''}`}
    >
      <GlassPanel padding="sm" borderColor={toast.color} className="max-w-sm">
        <div className="flex items-center gap-3">
          <IconBox color={toast.color} size="sm">
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
          <p className="text-white font-medium flex-1">{toast.message}</p>
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

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end">
      {toasts.map((toast, index) => (
        <Toast key={toast.id} toast={toast} index={index} onClose={onRemove} />
      ))}
    </div>
  );
}
