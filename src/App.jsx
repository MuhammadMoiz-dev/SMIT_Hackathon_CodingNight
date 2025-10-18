import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import Home from './Pages/Home'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import PageNoFound from './Components/PageNoFound';
import DashBoard from './Pages/DashBoard';



function App() {
  return (

    <>
      <BrowserRouter>
        <Routes>

          <Route path='*' element={<PageNoFound />} />
          <Route path='/' element={<Navbar><Home /></Navbar>} />
          <Route path='/home' element={<Navbar><Home /></Navbar>} />
          <Route path='/dashboard' element={<Navbar><DashBoard /></Navbar>} />
          <Route path='/login' element={<Navbar><Login /></Navbar>} />
          <Route path='/signup' element={<Navbar><SignUp /></Navbar>} />
        </Routes>

      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

    </>
  );
}

export default App
