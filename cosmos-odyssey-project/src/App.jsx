import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from './pages/Intro';
import TravelRoutes from './pages/TravelRoutes';
import Nav from './components/Navbar';
import Reservations from './pages/Reservations';
import { ReservationProvider } from './components/ReservationContext';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Intro />} />
      </Routes>
      <Nav />
      <ReservationProvider>
        <Routes>
          <Route path='/routes' element={<TravelRoutes />} />
          <Route path='/reservations' element={<Reservations />} />
        </Routes>
      </ReservationProvider>
    </Router>
  );
}

export default App
