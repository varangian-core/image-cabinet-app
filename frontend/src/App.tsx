import { Routes, Route } from 'react-router-dom';
import { FlexibleLayout } from './components/layout';
import {
  Dashboard,
  FileManager,
  Gallery,
  Classification,
  FilingCabinets,
  Settings
} from './pages';

function App() {
  return (
    <FlexibleLayout defaultNavType="topbar">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<FileManager />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/classify" element={<Classification />} />
        <Route path="/cabinets" element={<FilingCabinets />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </FlexibleLayout>
  );
}

export default App;