import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import {
  Dashboard,
  Upload,
  Gallery,
  Classification,
  FilingCabinets,
  Settings
} from './pages';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/classify" element={<Classification />} />
        <Route path="/cabinets" element={<FilingCabinets />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

export default App;