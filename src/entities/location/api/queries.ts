import kakaoApi from '@/entities/location/api/kakao'
import type {
  GeocodeQuery,
  RegionNameQuery,
} from '@/entities/location/model/kakao'
import { queryOptions } from '@tanstack/react-query'

export const locationQueries = {
  all: ['location'] as const,
  geocode: (query: GeocodeQuery) =>
    queryOptions({
      queryKey: [...locationQueries.all, 'geocode', query],
      queryFn: () => kakaoApi.getGeocode(query),
    }),
  regionName: (query: RegionNameQuery) =>
    queryOptions({
      queryKey: [...locationQueries.all, 'region-name', query],
      queryFn: () => kakaoApi.getRegionName(query),
    }),
}
