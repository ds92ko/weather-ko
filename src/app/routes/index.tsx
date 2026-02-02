import Home from '@/pages/home'
import Weather from '@/pages/weather'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/weather/:location',
    element: <Weather />,
  },
])

export default router
