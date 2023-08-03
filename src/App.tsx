import { AuthContextProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes/Router'
import "./styles/index.css"

function App() {

  return (
    <AuthContextProvider >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
