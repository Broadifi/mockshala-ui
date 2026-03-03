import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/query-keys";
import { authApi } from "@/api/services/auth-services";
import { QUERY_CONFIG } from "@/api/config";
import { useAuthStore } from "@/stores/authStore";

export function useProfileData(userId: string) {
  const token = useAuthStore((state) => state.auth.accessToken);

  const isReady = Boolean(userId && token);

  return useQuery({
    queryKey: queryKeys.profileKeys.profileDetails(userId),
    queryFn: authApi.getProfile,
    enabled: isReady,
    ...QUERY_CONFIG.realtime,
  });
}
