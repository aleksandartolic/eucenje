import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './pages/index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import store from './redux/store'
import { Provider } from 'react-redux'
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ToastProvider placement="bottom-right">
                <App />
            </ToastProvider>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
)
