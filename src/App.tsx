import { useState } from 'react'
import { AuthContextProvider } from './context/AuthContext'
import { Login } from './screens/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthContextProvider>
      <Login />
    </AuthContextProvider>
  )
}

export default App
