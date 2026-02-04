import type { ReactNode } from 'react'

interface WeatherCardProps {
  children: ReactNode
}

const WeatherCard = ({ children }: WeatherCardProps) => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 md:p-8">
      <div className="absolute right-0 top-0 h-40 w-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/5" />
      <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5" />
      <div className="relative z-10">{children}</div>
    </section>
  )
}

export default WeatherCard
