import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './components/HomePage/HomePage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import Header from './components/Header/Header';

import s from './App.module.scss';
import Transactions from './components/Transactions/Transactions';
// import ContactsPage from 'components/ContactsPage/ContactsPage';

function App() {
  return (
    <>
      <Header/>
      
      <Routes>
        <Route path="/" element={<HomePage />}/>
          
    
        <Route path="register" element={<RegisterPage />} />
         <Route path="login" element={<LoginPage />} />
        <Route path="transactions" element={<Transactions />} />
      </Routes>

      <ToastContainer
        position={'top-right'}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={'dark'}
      />
    </>
  );
}

export default App;