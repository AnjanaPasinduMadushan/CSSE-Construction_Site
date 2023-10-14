import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Weblogin from './pages/Authenication/web-login';
import Mainsignup from './pages/Authenication/main-signup';
import ManagingStaff from './pages/Home/managingStaff';

const App = () => {

  const isLogged = useSelector((state) => state.isLogged)
  console.log(isLogged);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/managingHome' element={<ManagingStaff />} />
        <Route path='/signUp' element={<Mainsignup />} />
        <Route path='/login' element={<Weblogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;