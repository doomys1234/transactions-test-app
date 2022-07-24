import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./components/HomePage/HomePage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import Header from "./components/Header/Header";

import Transactions from "./components/Transactions/Transactions";



function App() {
  return (
    <>
      <ChakraProvider >
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="transactions" element={<Transactions />} />
        </Routes>
        <ToastContainer
          position={"top-right"}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={"dark"}
        />
      </ChakraProvider>
    </>
  );
}

export default App;
