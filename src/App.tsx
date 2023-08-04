import { AuthContextProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes/Router'
import "./styles/index.css"

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
