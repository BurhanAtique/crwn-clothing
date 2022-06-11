import React from 'react';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store'

// const root = ReactDOMClient.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );


ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
