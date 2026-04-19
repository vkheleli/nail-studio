import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { ContactInfo, ContactMessage } from "../types";

export function useContactInfo() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ContactInfo>({
    queryKey: ["contactInfo"],
    queryFn: async () => {
      if (!actor) {
        return {
          phone: "+1 (555) 234-5678",
          email: "hello@auroranails.com",
          address: "2255 Blossom Avenue, Suite 12, Los Angeles, CA 90028",
          hours: "Tue–Sat: 9am–7pm · Sun: 10am–5pm",
          bookingUrl: "https://auroranails.com/book",
        };
      }
      return actor.getContactInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetContactInfo() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (info: ContactInfo) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setContactInfo(info);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contactInfo"] });
    },
  });
}

export function useSubmitContactMessage() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
      preferredService,
    }: {
      name: string;
      email: string;
      message: string;
      preferredService: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitContact(name, email, message, preferredService);
    },
  });
}

export function useContactMessages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ContactMessage[]>({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listContacts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
