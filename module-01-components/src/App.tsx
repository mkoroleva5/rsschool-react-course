import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './components/HomePageComponent/HomePage';
import { AboutPage } from './components/AboutPageComponent/AboutPage';
import { NotFoundPage } from './components/NotFoundPageComponent/NotFoundPage';
import React from 'react';

export class App extends React.Component {
  constructor(props: object) {
    super(props);
  }
  render() {
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
        </Routes>
      </>
    );
  }
}
