import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/api/query-keys'
import { authApi } from '@/api/services/auth-services'
import { QUERY_CONFIG } from '@/api/config'


export function useProfileData(userId: string) {
  return useQuery({
    queryKey: queryKeys.profileKeys.profileDetails(userId),
    queryFn: authApi.getProfile,
    enabled: !!userId, 
    ...QUERY_CONFIG.realtime
  })
}
