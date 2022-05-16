import React from 'react'
import ReactDOM from 'react-dom'
// import { createRoot } from 'react-dom'
import App from './App'
import { initContract } from './utils/near'

import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.querySelector('#root')
      )
  })
  .catch(console.error)
