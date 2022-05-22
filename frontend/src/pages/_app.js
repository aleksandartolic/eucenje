import './index.css'


import React from "react";
import {ToastProvider} from "react-toast-notifications";

const App = ({ Component, pageProps }) => {

    return  <ToastProvider placement="bottom-right"><Component {...pageProps} /></ToastProvider>
}

export default App;
