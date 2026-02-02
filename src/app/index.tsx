import Provider from '@/app/providers'
import router from '@/app/routes'
import '@/app/styles/index.css'
import { queryClient } from '@/shared/api/query-client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider router={router} client={queryClient} />
  </StrictMode>
)
