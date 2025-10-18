import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {


  const notify = () => toast.error("File uploaded successfully!");

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      <button className='border-2 p-3 rounded-2xl m-4' onClick={notify}>Show Toast</button>
    </div>
  );
}

export default App
