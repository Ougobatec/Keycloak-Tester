import { GlassPanel } from './GlassPanel';
import { IconBox } from './IconBox';
import { Button } from './Button';
import type { ColorName } from '../styles/colors';

interface ToastProps {
  message: string | null;
  color?: ColorName;
  onClose: () => void;
}

export function Toast({ message, color = 'emerald', onClose }: ToastProps) {
  return (
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
        <p className="text-white text-xs font-normal leading-tight flex-1">
          {message}
        </p>
        <Button size="sm" onClick={onClose} className="p-1.5! shrink-0">
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
  );
}
