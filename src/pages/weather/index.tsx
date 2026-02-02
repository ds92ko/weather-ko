import { useParams } from 'react-router-dom'

const Weather = () => {
  const { location } = useParams<{ location: string }>()

  return <>Weather {location}</>
}

export default Weather
