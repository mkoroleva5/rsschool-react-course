import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './components/HomePageComponent/HomePage';
import { CatsPage } from './components/CatsPageComponent/CatsPage';
import { AboutPage } from './components/AboutPageComponent/AboutPage';
import { NotFoundPage } from './components/NotFoundPageComponent/NotFoundPage';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cats" element={<CatsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
