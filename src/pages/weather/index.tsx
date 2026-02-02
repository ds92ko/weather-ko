import { useParams } from 'react-router-dom'

const Weather = () => {
  const { location } = useParams<{ location: string }>()
  return <main>Weather {location}</main>
}

export default Weather
