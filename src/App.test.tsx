import { render } from '@testing-library/react';
import { App } from './App';
import { createStore } from './store/index';
import { createApi } from 'unsplash-js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const unsplashMock = createApi({
  accessKey: '',
});

const store = createStore(unsplashMock);

describe('App tests', () => {
  it('renders app', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  });
});
