export const displayLocation = (location: string) => location.replace(/-/g, ' ')

export const encodeLocation = (location: string) => location.replace(/\s/g, '-')
