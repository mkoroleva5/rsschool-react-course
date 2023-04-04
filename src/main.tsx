import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import './index.css';
import { store } from './store';
import { ApiContext } from './api/ApiContext';
import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: 'E5bvAoy3CzFiyPKWtrefHM0hluG_543-BOZxiJ0XNfY',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApiContext.Provider value={unsplashApi}>
        <App />
      </ApiContext.Provider>
    </Provider>
  </React.StrictMode>
);
