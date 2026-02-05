import Layout from '@/app/layout'
import Home from '@/pages/home'
import NotFound from '@/pages/not-found'
import TestErrorPage from '@/pages/test-error'
import Weather from '@/pages/weather'
import RouteErrorFallback from '@/shared/ui/route-error-fallback'
import { createBrowserRouter } from 'react-router-dom'

const children = [
  { path: '/', element: <Home /> },
  { path: '/weather/:location', element: <Weather /> },
  ...(import.meta.env.DEV
    ? [
        { path: '/test-error', element: <TestErrorPage /> },
        {
          path: '/test-route-error',
          loader: () => {
            throw new Error('라우터 errorElement 테스트 (loader 에러)')
          },
          element: null,
        },
      ]
    : []),
  { path: '*', element: <NotFound /> },
]

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <RouteErrorFallback />,
    children,
  },
])

export default router
