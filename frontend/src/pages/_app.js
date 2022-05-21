import './index.css'

import { AppWrapper } from "../../state"

import React from "react";
import {ToastProvider} from "react-toast-notifications";

const App = ({ Component, pageProps }) => {

    return  <ToastProvider placement="bottom-right"><AppWrapper><Component {...pageProps} /></AppWrapper></ToastProvider>
}

export default App;
