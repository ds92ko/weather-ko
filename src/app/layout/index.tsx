import Footer from '@/app/layout/footer'
import Header from '@/app/layout/header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-950 p-4 text-white md:p-8">
      <Header />
      <main className="w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-900 shadow-2xl">
        <div className="space-y-6 p-5 md:p-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
