import React, { useState } from 'react';
import './index.css';
import { Home } from './Screens/Home';
import { BrowserRouter as Router } from "react-router-dom";
import IndexRoutes from './Routes/routes';
import { Loading } from './Components/Loading';

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <Router>
      {loading ? <Loading /> : <IndexRoutes />}
    </Router>
  );
}

export default App;
