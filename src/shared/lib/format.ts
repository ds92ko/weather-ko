export const displayLocation = (location: string) => location.replace(/-/g, ' ')

export const formatHourlyTime = (timestamp: number, index: number) =>
  index === 0 ? '지금' : `${new Date(timestamp * 1000).getHours()}시`
