import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

//quite el <StrictMode> para que no muestre un doble alert
createRoot(document.getElementById('root')!).render(

    <App />

)
