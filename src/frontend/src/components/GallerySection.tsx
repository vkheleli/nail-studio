import { motion } from "motion/react";
import { useState } from "react";
import { useGallery, useGalleryByService } from "../hooks/useGallery";
import { useServiceTypes } from "../hooks/useServiceTypes";
import type { PortfolioImage, ServiceTypeId } from "../types";
import { GalleryImage, GalleryImageSkeleton } from "./GalleryImage";
import { ImageLightbox } from "./ImageLightbox";

// Static sample gallery for empty/loading state
const SAMPLE_GALLERY: PortfolioImage[] = [
  {
    id: 1n,
    title: "Rose Gel Manicure",
    createdAt: BigInt(Date.now()),
    serviceTypeId: 1n,
    image: {
      getDirectURL: () => "/assets/generated/gallery-gel-nails.dim_600x600.jpg",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: function () {
        return this;
      },
    } as unknown as PortfolioImage["image"],
  },
  {
    id: 2n,
    title: "Classic Acrylics",
    createdAt: BigInt(Date.now()),
    serviceTypeId: 2n,
    image: {
      getDirectURL: () => "/assets/generated/gallery-acrylics.dim_600x600.jpg",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: function () {
        return this;
      },
    } as unknown as PortfolioImage["image"],
  },
  {
    id: 3n,
    title: "Floral Nail Art",
    createdAt: BigInt(Date.now()),
    serviceTypeId: 3n,
    image: {
      getDirectURL: () => "/assets/generated/gallery-nail-art.dim_600x600.jpg",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: function () {
        return this;
      },
    } as unknown as PortfolioImage["image"],
  },
  {
    id: 4n,
    title: "Spa Pedicure",
    createdAt: BigInt(Date.now()),
    serviceTypeId: 4n,
    image: {
      getDirectURL: () => "/assets/generated/gallery-pedicure.dim_600x600.jpg",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: function () {
        return this;
      },
    } as unknown as PortfolioImage["image"],
  },
  {
    id: 5n,
    title: "Gel-X French Tips",
    createdAt: BigInt(Date.now()),
    serviceTypeId: 5n,
    image: {
      getDirectURL: () => "/assets/generated/gallery-gelx.dim_600x600.jpg",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: function () {
        return this;
      },
    } as unknown as PortfolioImage["image"],
  },
  {
    id: 6n,
    title: "Marble Nail Design",
    createdAt: BigInt(Date.now()),
    serviceTypeId: 3n,
    image: {
      getDirectURL: () => "/assets/generated/gallery-marble.dim_600x600.jpg",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: function () {
        return this;
      },
    } as unknown as PortfolioImage["image"],
  },
];

interface GallerySectionProps {
  activeServiceId: ServiceTypeId | null;
}

function GalleryContent({ activeServiceId }: GallerySectionProps) {
  const allQuery = useGallery();
  const byServiceQuery = useGalleryByService(activeServiceId ?? 0n);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isFiltered = activeServiceId !== null;
  const query = isFiltered ? byServiceQuery : allQuery;
  const isLoading = query.isLoading;
  const rawImages = query.data ?? [];

  const filteredSample = isFiltered
    ? SAMPLE_GALLERY.filter((i) => i.serviceTypeId === activeServiceId)
    : SAMPLE_GALLERY;
  const displayImages =
    rawImages.length > 0
      ? rawImages
      : filteredSample.length > 0
        ? filteredSample
        : SAMPLE_GALLERY;

  return (
    <>
      {isLoading ? (
        <div className="gallery-grid" data-ocid="gallery-loading">
          {Array.from({ length: 6 }, (_, i) => `skel-${i}`).map((key, i) => (
            <GalleryImageSkeleton key={key} index={i} />
          ))}
        </div>
      ) : displayImages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 text-center"
          data-ocid="gallery-empty-state"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-5">
            💅
          </div>
          <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
            No designs yet
          </h3>
          <p className="text-muted-foreground text-base max-w-sm">
            Check back soon — our artists are working on something beautiful!
          </p>
        </motion.div>
      ) : (
        <div className="gallery-grid" data-ocid="gallery-grid">
          {displayImages.map((image, index) => (
            <GalleryImage
              key={image.id.toString()}
              image={image}
              index={index}
              onClick={() => setLightboxIndex(index)}
            />
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <ImageLightbox
          images={displayImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}

export function GallerySection({ activeServiceId }: GallerySectionProps) {
  const { data: services } = useServiceTypes();

  const activeLabel =
    activeServiceId !== null
      ? (services?.find((s) => s.id === activeServiceId)?.name ?? "Filtered")
      : "All Designs";

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              Our Work
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
              Portfolio Gallery
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Showing:</span>
            <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              {activeLabel}
            </span>
          </div>
        </motion.div>

        {/* Gallery grid */}
        <GalleryContent activeServiceId={activeServiceId} />
      </div>
    </section>
  );
}
