import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { ExternalBlob } from "../backend";
import type { ImageId, PortfolioImage, ServiceTypeId } from "../types";

export function useGallery() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PortfolioImage[]>({
    queryKey: ["gallery"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listGalleryItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGalleryByService(serviceTypeId: ServiceTypeId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PortfolioImage[]>({
    queryKey: ["gallery", "byService", serviceTypeId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listGalleryItemsByService(serviceTypeId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddImage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      serviceTypeId,
      image,
    }: {
      title: string;
      serviceTypeId: ServiceTypeId;
      image: ExternalBlob;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addGalleryItem(title, serviceTypeId, image);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}

export function useDeleteImage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: ImageId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteGalleryItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}
