import LocationSearch from '@/features/location/ui/location-search'
import useTitle from '@/shared/lib/use-title'
import FavoriteList from '@/widgets/favorite/ui/favorite-list'
import CurrentWeather from '@/widgets/weather/ui/current-weather'
import { useRef } from 'react'

const Home = () => {
  useTitle()
  const searchRef = useRef<HTMLInputElement>(null)
  const focusSearch = () => searchRef.current?.focus()

  return (
    <>
      <LocationSearch ref={searchRef} />
      <CurrentWeather />
      <FavoriteList onSearchFocus={focusSearch} />
    </>
  )
}

export default Home
