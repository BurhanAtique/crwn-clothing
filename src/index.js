import React from 'react';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom';
// const root = ReactDOMClient.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
