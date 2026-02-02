import type { Coord } from '@/shared/model/coord'

export interface GeocodeResponse {
  documents: {
    x: string
    y: string
  }[]
}
export type GeocodeQuery = string
type GeocodeResult = Coord | null
type GetGeocode = (query: GeocodeQuery) => Promise<GeocodeResult>

export interface RegionNameResponse {
  documents: {
    region_type: 'H' | 'B'
    region_1depth_name: string
    region_2depth_name: string
    region_3depth_name: string
  }[]
}
export type RegionNameQuery = Coord
type RegionNameResult = string | null
type GetRegionName = (query: RegionNameQuery) => Promise<RegionNameResult>

export interface KakaoApi {
  getGeocode: GetGeocode
  getRegionName: GetRegionName
}
