import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import type { PortfolioImage } from "../types";

interface ImageLightboxProps {
  images: PortfolioImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const image = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && hasNext) onNavigate(currentIndex + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, hasPrev, hasNext, onNavigate]);

  if (!image) return null;

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-4xl w-full p-0 overflow-hidden bg-foreground border-0 shadow-2xl"
        data-ocid="lightbox-dialog"
      >
        <DialogTitle className="sr-only">{image.title}</DialogTitle>

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close lightbox"
          data-ocid="lightbox-close"
          className="absolute top-3 right-3 z-20 bg-foreground/60 hover:bg-foreground/80 text-primary-foreground rounded-full w-9 h-9"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="relative flex items-center">
          {/* Prev */}
          {hasPrev && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate(currentIndex - 1)}
              aria-label="Previous image"
              data-ocid="lightbox-prev"
              className="absolute left-3 z-20 bg-foreground/60 hover:bg-foreground/80 text-primary-foreground rounded-full w-9 h-9"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          )}

          {/* Image */}
          <img
            src={image.image.getDirectURL()}
            alt={image.title}
            className="w-full max-h-[80vh] object-contain"
          />

          {/* Next */}
          {hasNext && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate(currentIndex + 1)}
              aria-label="Next image"
              data-ocid="lightbox-next"
              className="absolute right-3 z-20 bg-foreground/60 hover:bg-foreground/80 text-primary-foreground rounded-full w-9 h-9"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Caption */}
        <div className="px-6 py-4 bg-foreground/95">
          <p className="text-primary-foreground font-medium text-sm">
            {image.title}
          </p>
          <p className="text-primary-foreground/50 text-xs mt-0.5">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
