import { RenderToPipeableStreamOptions, renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App';
import { Provider } from 'react-redux';
import { createStore } from './store/';
import { createApi } from 'unsplash-js';

export const unsplashApi = createApi({
  accessKey: 'E5bvAoy3CzFiyPKWtrefHM0hluG_543-BOZxiJ0XNfY',
});

export const render = (url: string, options: RenderToPipeableStreamOptions) => {
  const store = createStore(unsplashApi);
  const stream = renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>,
    options
  );
  const preloadedState = store.getState();
  return { stream, preloadedState };
};
