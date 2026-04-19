import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState } from "react";
import type { PortfolioImage } from "../types";

interface GalleryImageProps {
  image: PortfolioImage;
  index: number;
  onClick: () => void;
}

export function GalleryImage({ image, index, onClick }: GalleryImageProps) {
  const [loaded, setLoaded] = useState(false);
  const src = image.image.getDirectURL();

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-muted surface-card w-full text-left"
      onClick={onClick}
      data-ocid={`gallery-image-${image.id.toString()}`}
      aria-label={`View ${image.title}`}
    >
      {!loaded && <Skeleton className="w-full aspect-square rounded-2xl" />}
      <img
        src={src}
        alt={image.title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          "w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105",
          loaded ? "opacity-100" : "opacity-0 absolute inset-0",
        )}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <p className="text-primary-foreground text-sm font-medium truncate">
          {image.title}
        </p>
      </div>
    </motion.button>
  );
}

export function GalleryImageSkeleton({ index }: { index: number }) {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden bg-muted animate-pulse",
        index % 5 === 0 ? "aspect-[3/4]" : "aspect-square",
      )}
    />
  );
}
