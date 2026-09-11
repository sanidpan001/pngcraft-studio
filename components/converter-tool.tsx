'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileImage,
  Download,
  Loader2,
  Trash2,
  Settings2,
  Zap,
  Check,
  X,
  ImageIcon,
  Sparkles,
  Archive,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { AdSlot, NativeAdSlot } from '@/components/ad-slot';
import {
  convertJpgToPng,
  downloadBlob,
  formatFileSize,
  type ConvertedImageFile,
  type ConvertOptions,
  type BackgroundMode,
  type QualityMode,
} from '@/lib/converter';
import { cn } from '@/lib/utils';

const MAX_FILES = 30;
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg'];

type FileStatus = 'pending' | 'converting' | 'done' | 'error';

interface QueueItem {
  id: string;
  file: File;
  previewUrl: string;
  status: FileStatus;
  result?: ConvertedImageFile;
  error?: string;
}

export function ConverterTool() {
  const [queue, setQueue] = React.useState<QueueItem[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isConverting, setIsConverting] = React.useState(false);
  const [hasConverted, setHasConverted] = React.useState(false);
  const [totalDuration, setTotalDuration] = React.useState(0);
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);
  const [previewItem, setPreviewItem] = React.useState<ConvertedImageFile | null>(null);

  const [keepTransparent, setKeepTransparent] = React.useState(true);
  const [background, setBackground] = React.useState<BackgroundMode>('transparent');
  const [customColor, setCustomColor] = React.useState('#ffffff');
  const [quality, setQuality] = React.useState<QualityMode>('lossless');

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (keepTransparent) {
      setBackground('transparent');
    } else {
      setBackground('white');
    }
  }, [keepTransparent]);

  const options: ConvertOptions = React.useMemo(
    () => ({ background, customColor, quality }),
    [background, customColor, quality]
  );

  const handleFiles = React.useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((f) =>
      ACCEPTED_TYPES.includes(f.type) || /\.(jpe?g)$/i.test(f.name)
    );

    const newItems: QueueItem[] = fileArray
      .slice(0, MAX_FILES - queue.length)
      .map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
        status: 'pending' as FileStatus,
      }));

    if (newItems.length === 0) return;

    setQueue((prev) => [...prev, ...newItems]);
    setHasConverted(false);
    setShowPreview(false);
  }, [queue.length]);

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.currentTarget === e.target) setIsDragging(false);
  };

  const removeItem = (id: string) => {
    setQueue((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAll = () => {
    queue.forEach((item) => {
      URL.revokeObjectURL(item.previewUrl);
      if (item.result) {
        URL.revokeObjectURL(item.result.originalUrl);
        URL.revokeObjectURL(item.result.convertedUrl);
      }
    });
    setQueue([]);
    setHasConverted(false);
    setShowPreview(false);
    setPreviewItem(null);
    setTotalDuration(0);
  };

  const convertAll = async () => {
    if (queue.length === 0 || isConverting) return;
    setIsConverting(true);

    const startTime = performance.now();

    for (const item of queue) {
      if (item.status === 'done') continue;
      setQueue((prev) =>
        prev.map((q) => (q.id === item.id ? { ...q, status: 'converting' } : q))
      );
      try {
        const result = await convertJpgToPng(item.file, options);
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id ? { ...q, status: 'done', result } : q
          )
        );
      } catch (err) {
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? { ...q, status: 'error', error: err instanceof Error ? err.message : 'Failed' }
              : q
          )
        );
      }
    }

    const endTime = performance.now();
    setTotalDuration((endTime - startTime) / 1000);
    setIsConverting(false);
    setHasConverted(true);
  };

  const downloadSingle = (item: QueueItem) => {
    if (!item.result) return;
    downloadBlob(item.result.convertedBlob, item.result.convertedName);
  };

  const downloadAllZip = async () => {
    const done = queue.filter((q) => q.status === 'done' && q.result);
    if (done.length === 0) return;

    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    for (const item of done) {
      if (item.result) {
        zip.file(item.result.convertedName, item.result.convertedBlob);
      }
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    downloadBlob(blob, 'pngcraft-converted.zip');
  };

  const openPreview = (item: QueueItem) => {
    if (!item.result) return;
    setPreviewItem(item.result);
    setShowPreview(true);
  };

  const doneCount = queue.filter((q) => q.status === 'done').length;
  const allDone = queue.length > 0 && doneCount === queue.length;

  return (
    <div id="tools" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        {/* Main tool area */}
        <div className="space-y-6">
          {/* Dropzone */}
          <Card className="glass-card relative overflow-hidden p-1">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => inputRef.current?.click()}
              className={cn(
                'relative cursor-pointer rounded-2xl border-2 border-dashed p-10 sm:p-16 text-center transition-all duration-300',
                isDragging
                  ? 'border-primary bg-primary/5 scale-[1.01]'
                  : 'border-border/60 hover:border-primary/50 hover:bg-accent/5'
              )}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".jpg,.jpeg,image/jpeg"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) handleFiles(e.target.files);
                  e.target.value = '';
                }}
              />

              <motion.div
                animate={isDragging ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20"
              >
                <Upload className="h-8 w-8 text-primary" />
              </motion.div>

              <p className="font-display text-lg font-semibold">
                Drop JPGs here or{' '}
                <span className="text-primary underline-offset-4 hover:underline">
                  Browse
                </span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Supports JPG, JPEG to PNG · Bulk up to {MAX_FILES} images
              </p>

              {queue.length > 0 && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <ImageIcon className="h-3 w-3" />
                  {queue.length} {queue.length === 1 ? 'file' : 'files'} ready
                </div>
              )}
            </div>
          </Card>

          {/* File list */}
          <AnimatePresence>
            {queue.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Files ({queue.length}/{MAX_FILES})
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear all
                  </Button>
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto no-scrollbar pr-1">
                  <AnimatePresence>
                    {queue.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: idx * 0.03 }}
                        layout
                      >
                        <FileRow
                          item={item}
                          onRemove={() => removeItem(item.id)}
                          onDownload={() => downloadSingle(item)}
                          onPreview={() => openPreview(item)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Conversion options */}
          {queue.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="glass-card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Settings2 className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold">Conversion Options</h3>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox
                      checked={keepTransparent}
                      onCheckedChange={(checked) => setKeepTransparent(checked === true)}
                    />
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">
                      Keep transparent background
                    </span>
                  </label>

                  <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-full justify-between">
                        <span className="flex items-center gap-2 text-sm">
                          <Sparkles className="h-4 w-4 text-primary" />
                          Advanced options
                        </span>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform',
                            showAdvanced && 'rotate-180'
                          )}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 space-y-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-2 block">
                          PNG Quality
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <QualityButton
                            active={quality === 'lossless'}
                            onClick={() => setQuality('lossless')}
                            label="Lossless"
                          />
                          <QualityButton
                            active={quality === 'compressed'}
                            onClick={() => setQuality('compressed')}
                            label="Compressed"
                          />
                        </div>
                      </div>

                      {!keepTransparent && (
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-2 block">
                            Background
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            <QualityButton
                              active={background === 'white'}
                              onClick={() => setBackground('white')}
                              label="White"
                            />
                            <QualityButton
                              active={background === 'custom'}
                              onClick={() => setBackground('custom')}
                              label="Custom"
                            />
                            <QualityButton
                              active={background === 'transparent'}
                              onClick={() => setBackground('transparent')}
                              label="None"
                            />
                          </div>
                          {background === 'custom' && (
                            <div className="mt-2 flex items-center gap-2">
                              <input
                                type="color"
                                value={customColor}
                                onChange={(e) => setCustomColor(e.target.value)}
                                className="h-9 w-12 rounded-lg border border-border cursor-pointer"
                              />
                              <span className="text-sm font-mono text-muted-foreground">
                                {customColor}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </Card>
            </motion.div>
          )}

          {/* CTA button */}
          {queue.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  onClick={convertAll}
                  disabled={isConverting || allDone}
                  className="group relative h-14 flex-1 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-accent text-base font-semibold shadow-glow"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  {isConverting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Converting...
                    </>
                  ) : allDone && queue.length > 1 ? (
                    <>
                      <Archive className="h-5 w-5 mr-2" />
                      Convert All & Download ZIP
                    </>
                  ) : queue.length > 1 ? (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Convert {queue.length} to PNG & Download
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5 mr-2" />
                      Convert to PNG & Download
                    </>
                  )}
                </Button>

                {allDone && queue.length > 1 && (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={downloadAllZip}
                    className="h-14 rounded-2xl"
                  >
                    <Archive className="h-5 w-5 mr-2" />
                    Download ZIP
                  </Button>
                )}
              </div>

              {/* Conversion time / status */}
              <AnimatePresence>
                {hasConverted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="h-4 w-4 text-success" />
                    Converted in {totalDuration.toFixed(1)}s · {doneCount} {doneCount === 1 ? 'file' : 'files'} · No watermark added
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Privacy notice */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/70">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Your images never leave your device. We don&apos;t store anything.
          </div>

          {/* Before/After Preview */}
          <AnimatePresence>
            {showPreview && previewItem && (
              <PreviewComparison
                item={previewItem}
                onClose={() => setShowPreview(false)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Right sidebar - Sticky ad */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <NativeAdSlot />
            <AdSlot width={300} height={250} />
            <AdSlot width={300} height={250} />
            <Card className="glass-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-success/15">
                  <Check className="h-4 w-4 text-success" />
                </div>
                <span className="text-sm font-semibold">Why it&apos;s free</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We run on ads, not subscriptions. Studio quality without the paywall. Forever.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileRow({
  item,
  onRemove,
  onDownload,
  onPreview,
}: {
  item: QueueItem;
  onRemove: () => void;
  onDownload: () => void;
  onPreview: () => void;
}) {
  return (
    <div className="glass-card group flex items-center gap-3 p-3 transition-all hover:shadow-glow">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border/50 bg-muted/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.previewUrl}
          alt={item.file.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{item.file.name}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatFileSize(item.file.size)}</span>
          {item.status === 'done' && item.result && (
            <>
              <Separator orientation="vertical" className="h-3" />
              <span className="text-success">
                {formatFileSize(item.result.convertedSize)}
              </span>
              <Separator orientation="vertical" className="h-3" />
              <span>{item.result.width}×{item.result.height}</span>
            </>
          )}
          {item.status === 'error' && (
            <span className="text-destructive">{item.error}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        {item.status === 'converting' && (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        )}
        {item.status === 'done' && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onPreview}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onDownload}
            >
              <Download className="h-4 w-4 text-primary" />
            </Button>
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onRemove}
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
        </Button>
      </div>
    </div>
  );
}

function QualityButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-lg border px-3 py-2 text-sm font-medium transition-all',
        active
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-border bg-card/40 text-muted-foreground hover:border-primary/50'
      )}
    >
      {label}
    </button>
  );
}

function PreviewComparison({
  item,
  onClose,
}: {
  item: ConvertedImageFile;
  onClose: () => void;
}) {
  const [sliderPos, setSliderPos] = React.useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pos)));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Card className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <ImageIcon className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-display font-semibold">Before / After</h3>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div
          ref={containerRef}
          className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 cursor-ew-resize select-none"
          onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onClick={(e) => handleMove(e.clientX)}
        >
          {/* After (PNG) - bottom layer */}
          <div className="absolute inset-0 checkerboard">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.convertedUrl}
              alt="PNG result"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Before (JPG) - top layer, clipped */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.originalUrl}
              alt="JPG original"
              className="h-full w-full object-contain"
              style={{ width: `${containerRef.current?.clientWidth || 100}%` }}
            />
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-primary pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-primary shadow-glow flex items-center justify-center">
              <div className="flex">
                <span className="text-white text-xs">‹›</span>
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-2 left-2 rounded-md bg-background/80 backdrop-blur-sm px-2 py-1 text-xs font-medium">
            JPG
          </div>
          <div className="absolute top-2 right-2 rounded-md bg-background/80 backdrop-blur-sm px-2 py-1 text-xs font-medium">
            PNG
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg bg-card/40 p-3">
            <p className="text-xs text-muted-foreground">Original</p>
            <p className="text-sm font-semibold">{formatFileSize(item.originalSize)} JPG</p>
          </div>
          <div className="rounded-lg bg-card/40 p-3">
            <p className="text-xs text-muted-foreground">Converted</p>
            <p className="text-sm font-semibold">{formatFileSize(item.convertedSize)} PNG</p>
          </div>
          <div className="rounded-lg bg-card/40 p-3">
            <p className="text-xs text-muted-foreground">Dimensions</p>
            <p className="text-sm font-semibold">{item.width}×{item.height}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
