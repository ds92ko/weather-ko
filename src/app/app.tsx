import Provider from '@/app/providers'
import { queryClient } from '@/shared/api/query-client'

function App() {
  return (
    <Provider client={queryClient}>
      <div>날씨 앱</div>
    </Provider>
  )
}

export default App
