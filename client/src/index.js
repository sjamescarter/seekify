import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './context/user';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { InstrumentsProvider } from './context/instrument';
import { MusiciansProvider } from './context/musicians';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <InstrumentsProvider>
        <MusiciansProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MusiciansProvider>
      </InstrumentsProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
