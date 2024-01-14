import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Calendar from './routes/Calendar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path='calendar' element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
