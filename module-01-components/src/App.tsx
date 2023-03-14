import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
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
        <header className="header">
          <a className="link" href="/">
            Home
          </a>
          <a className="link" href="/about">
            About Us
          </a>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </>
    );
  }
}
