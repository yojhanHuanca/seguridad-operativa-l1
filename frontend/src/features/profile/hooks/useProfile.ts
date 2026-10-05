import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { ActivityItem, MyProfile } from "../types";

async function fetchMe(): Promise<MyProfile> {
  const { data } = await api.get<ApiEnvelope<MyProfile>>("/profile/me");
  if (!data.data) throw new Error("No se pudo cargar el perfil");
  return data.data;
}

async function fetchActividad(): Promise<ActivityItem[]> {
  const { data } = await api.get<ApiEnvelope<ActivityItem[]>>("/profile/me/actividad");
  return data.data ?? [];
}

export function useMyProfile() {
  return useQuery({ queryKey: ["profile", "me"], queryFn: fetchMe });
}

export function useMyActivity() {
  return useQuery({ queryKey: ["profile", "me", "actividad"], queryFn: fetchActividad });
}

export function useUpdatePhone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (telefono: string) => {
      const { data } = await api.patch<ApiEnvelope<MyProfile>>("/profile/me", { telefono });
      return data.data;
    },
    onSuccess: profile => {
      if (profile) queryClient.setQueryData(["profile", "me"], profile);
      return queryClient.invalidateQueries({ queryKey: ["profile", "me"] });
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData();
      form.append("foto", file);
      const { data } = await api.post<ApiEnvelope<MyProfile>>("/profile/me/foto", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    },
    onSuccess: async profile => {
      if (profile) queryClient.setQueryData(["profile", "me"], profile);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["profile", "me"] }),
        queryClient.invalidateQueries({ queryKey: ["users"] }),
        queryClient.invalidateQueries({ queryKey: ["users-paginado"] }),
      ]);
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (input: { password_actual: string; password_nueva: string }) => {
      const { data } = await api.patch<ApiEnvelope<null>>("/profile/me/password", input);
      return data;
    },
  });
}

export function useRemoveAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.delete<ApiEnvelope<MyProfile>>("/profile/me/foto");
      return data.data;
    },
    onSuccess: async profile => {
      if (profile) queryClient.setQueryData(["profile", "me"], profile);
      queryClient.removeQueries({ queryKey: ["avatar"] });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["profile", "me"] }),
        queryClient.invalidateQueries({ queryKey: ["users"] }),
        queryClient.invalidateQueries({ queryKey: ["users-paginado"] }),
      ]);
    },
  });
}
