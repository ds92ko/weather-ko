import { API_KEY, BASE_URL } from '@/entities/location/config'
import type {
  GeocodeResponse,
  KakaoApi,
  RegionNameResponse,
} from '@/entities/location/model/kakao'
import { ApiError } from '@/shared/api/api-error'

const headers = { Authorization: `KakaoAK ${API_KEY}` }

const kakaoApi: KakaoApi = {
  getGeocode: async (query) => {
    const res = await fetch(
      `${BASE_URL}/search/address.json?query=${encodeURIComponent(query)}`,
      { headers }
    )
    if (!res.ok) throw new ApiError(res.status)

    const data: GeocodeResponse = await res.json()
    const doc = data.documents?.[0]

    if (!doc) return null

    return {
      lat: parseFloat(doc.y),
      lon: parseFloat(doc.x),
    }
  },
  getRegionName: async ({ lat, lon }) => {
    const res = await fetch(
      `${BASE_URL}/geo/coord2regioncode.json?x=${lon}&y=${lat}`,
      { headers }
    )
    if (!res.ok) throw new ApiError(res.status)

    const data: RegionNameResponse = await res.json()
    const doc = data.documents?.find(({ region_type }) => region_type === 'B')

    if (!doc) return null

    return `${doc.region_1depth_name} ${doc.region_2depth_name} ${doc.region_3depth_name}`
  },
}

export default kakaoApi
