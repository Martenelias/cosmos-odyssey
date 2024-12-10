import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from './pages/Intro';
import TravelRoutes from './pages/TravelRoutes';
import Nav from './components/Navbar';
import DataPage from './utils/DataPage';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Intro />} />
      </Routes>
      <Nav />
      <Routes>
        <Route path='/routes' element={<TravelRoutes />} />
        <Route path='/data' element={<DataPage />} />
      </Routes>
    </Router>
  );
}

export default App
