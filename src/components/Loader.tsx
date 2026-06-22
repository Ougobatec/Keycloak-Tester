import { Backdrop } from './Backdrop';
import { GlassPanel } from './GlassPanel';

interface LoaderProps {
  message?: string;
}

export function Loader({ message = 'Chargement...' }: LoaderProps) {
  return (
    <Backdrop>
      <GlassPanel padding="md" className="flex items-center gap-4">
        <div className="relative w-6 h-6">
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
        </div>
        <p className="text-white text-sm font-medium">{message}</p>
      </GlassPanel>
    </Backdrop>
  );
}
