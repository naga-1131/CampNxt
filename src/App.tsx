import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import Layout from './components/Layout';
import Gallery from './pages/Gallery';
import Evaluation from './pages/Evaluation';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/gallery" replace />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="evaluate/:id" element={<Evaluation />} />
          </Route>
          <Route path="*" element={<Navigate to="/gallery" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
