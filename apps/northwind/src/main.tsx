import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';
import Provider from './app/store';

ReactDOM.render(
  <Provider>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  document.getElementById('root')
);
