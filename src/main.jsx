import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {MantineProvider} from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
