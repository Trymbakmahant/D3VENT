import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import AppWrapper from './components/context/AddressContext'

import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <AppWrapper>
      <App />
    </AppWrapper>
  </BrowserRouter>
)
