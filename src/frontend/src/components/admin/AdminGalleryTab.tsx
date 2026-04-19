import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageOff, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteImage, useGallery } from "../../hooks/useGallery";
import { useServiceTypes } from "../../hooks/useServiceTypes";
import type { PortfolioImage } from "../../types";
import { ImageUploadForm } from "./ImageUploadForm";

export function AdminGalleryTab() {
  const { data: images, isLoading } = useGallery();
  const { data: services } = useServiceTypes();
  const deleteImage = useDeleteImage();
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  const getServiceName = (serviceTypeId: bigint) => {
    return services?.find((s) => s.id === serviceTypeId)?.name ?? "Unknown";
  };

  const handleDelete = async (image: PortfolioImage) => {
    setDeletingId(image.id);
    try {
      await deleteImage.mutateAsync(image.id);
      toast.success("Image deleted");
    } catch {
      toast.error("Failed to delete image");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Form */}
      <ImageUploadForm services={services ?? []} />

      {/* Gallery Grid */}
      <div className="space-y-4">
        <h2 className="font-display text-xl text-foreground">Gallery Images</h2>
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="aspect-square rounded-xl" />
            ))}
          </div>
        ) : !images?.length ? (
          <div
            data-ocid="gallery-empty"
            className="bg-muted/40 border border-dashed border-border rounded-xl p-10 text-center space-y-2"
          >
            <ImageOff className="w-10 h-10 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground font-body">
              No images yet. Upload your first photo above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.id.toString()}
                data-ocid={`gallery-item-${image.id}`}
                className="group relative bg-card border border-border rounded-xl overflow-hidden shadow-subtle"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.image.getDirectURL()}
                    alt={image.title}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                  />
                </div>
                <div className="p-3 space-y-1.5">
                  <p className="font-body text-sm text-foreground font-medium truncate">
                    {image.title}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {getServiceName(image.serviceTypeId)}
                  </Badge>
                </div>
                <button
                  type="button"
                  data-ocid={`gallery-delete-btn-${image.id}`}
                  aria-label={`Delete ${image.title}`}
                  onClick={() => handleDelete(image)}
                  disabled={deletingId === image.id}
                  className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-destructive/90 text-destructive-foreground
                    flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth
                    hover:bg-destructive disabled:opacity-40"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {images && images.length > 0 && (
        <p className="text-muted-foreground text-sm font-body text-center">
          {images.length} image{images.length !== 1 ? "s" : ""} in gallery
        </p>
      )}
    </div>
  );
}
