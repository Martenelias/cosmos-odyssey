import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from './pages/Intro';
import TravelRoutes from './pages/TravelRoutes';
import Nav from './components/Navbar';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
      </Routes>
      <Nav />
      <Routes>
        <Route path="/routes" element={<TravelRoutes />} />
      </Routes>
    </Router>
  );
}

export default App
