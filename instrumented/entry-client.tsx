import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import React from 'react';
import './index.css';
import { createStore } from './store';
import { createApi } from 'unsplash-js';
import { BrowserRouter } from 'react-router-dom';

export const unsplashApi = createApi({
  accessKey: 'E5bvAoy3CzFiyPKWtrefHM0hluG_543-BOZxiJ0XNfY',
});

const root = document.getElementById('root') as HTMLElement;

ReactDOM.hydrateRoot(
  root,
  <React.StrictMode>
    <Provider store={createStore(unsplashApi)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
