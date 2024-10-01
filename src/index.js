import { GoogleOAuthProvider } from "@react-oauth/google";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import App from './App';
import './index.css';
import { ContextProvider } from ".//Context/context";
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import ChatContextProvider from "./Context/ChatContext";
const CLIENT_KEY = process.env.REACT_APP_GOOGLE_CLIENT_KEY;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={CLIENT_KEY}> 
    <Provider store={store}>
      <Router>
        <ContextProvider>
          <App />
        </ContextProvider>
      </Router>
    </Provider>
    <ToastContainer />
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
