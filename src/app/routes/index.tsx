import Layout from '@/app/layout'
import Home from '@/pages/home'
import NotFound from '@/pages/not-found'
import Weather from '@/pages/weather'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/weather/:location',
        element: <Weather />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export default router
