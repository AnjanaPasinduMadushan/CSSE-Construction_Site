import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Weblogin from './pages/Authenication/web-login';
import Mainsignup from './pages/Authenication/main-signup';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signUp' element={<Mainsignup />} />
        <Route path='/login' element={<Weblogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;