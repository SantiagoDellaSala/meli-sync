import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import Contact from './pages/Contact';

function App() {
  console.log('Renderizando App...');

  return (
    <>
      <Header />
      <div className="mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
