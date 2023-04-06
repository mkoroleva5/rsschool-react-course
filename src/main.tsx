import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { ApiContext } from './api/ApiContext';
import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: 'E5bvAoy3CzFiyPKWtrefHM0hluG_543-BOZxiJ0XNfY',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApiContext.Provider value={unsplashApi}>
      <App />
    </ApiContext.Provider>
  </React.StrictMode>
);
