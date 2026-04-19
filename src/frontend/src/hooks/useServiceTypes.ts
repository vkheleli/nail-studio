import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { ServiceType, ServiceTypeId } from "../types";

export function useServiceTypes() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ServiceType[]>({
    queryKey: ["serviceTypes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useServiceType(id: ServiceTypeId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ServiceType | null>({
    queryKey: ["serviceType", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getService(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddServiceType() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      description,
      slug,
    }: {
      name: string;
      description: string;
      slug: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addService(name, description, slug);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceTypes"] });
    },
  });
}

export function useUpdateServiceType() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      description,
      slug,
    }: {
      id: ServiceTypeId;
      name: string;
      description: string;
      slug: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateService(id, name, description, slug);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceTypes"] });
    },
  });
}

export function useDeleteServiceType() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: ServiceTypeId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceTypes"] });
    },
  });
}
