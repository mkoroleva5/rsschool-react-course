import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import './index.css';
import { createStore } from './store';
import { createApi } from 'unsplash-js';

export const unsplashApi = createApi({
  accessKey: 'E5bvAoy3CzFiyPKWtrefHM0hluG_543-BOZxiJ0XNfY',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={createStore(unsplashApi)}>
      <App />
    </Provider>
  </React.StrictMode>
);
