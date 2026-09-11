import { cn } from '@/lib/utils';

interface AdSlotProps {
  width: number;
  height: number;
  label?: string;
  className?: string;
}

export function AdSlot({ width, height, label = 'Advertisement', className }: AdSlotProps) {
  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <span className="ad-label">{label}</span>
      <div
        className="ad-slot"
        style={{
          width: '100%',
          maxWidth: `${width}px`,
          minHeight: `${height}px`,
        }}
      >
        <span className="text-xs text-muted-foreground/40 font-medium">
          Ad Space - Replace with AdSense
        </span>
      </div>
    </div>
  );
}
