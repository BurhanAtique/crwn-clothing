import React from 'react';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';

// const root = ReactDOMClient.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

// we wrap our app in this persist gate so that our app has access to persistance flow 
// itself and rehydarte our store


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}> 
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
