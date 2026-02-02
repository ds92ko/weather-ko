import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, type RouterProviderProps } from 'react-router-dom'

interface ProviderProps {
  router: RouterProviderProps['router']
  client: QueryClient
}

const Provider = ({ router, client }: ProviderProps) => {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

export default Provider
