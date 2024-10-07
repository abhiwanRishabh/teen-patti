import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { socket } from './socket/socket.js'
import { socketEvents } from './socket/socketEvents.js';
import './socket/subscribeEvent.js'
import { Toaster } from 'react-hot-toast'


// invoke socket events for connect the socket. 
socketEvents();

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Toaster />
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>,
)
