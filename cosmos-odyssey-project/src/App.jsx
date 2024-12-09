import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from './components/Intro';
import Content from './pages/Content';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/content" element={<Content />} />
      </Routes>
    </Router>
  );
}

export default App
