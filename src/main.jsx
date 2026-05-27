import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouter } from './router/index.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AppRouter />
    </StrictMode>
)
