import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Weblogin from './pages/Authenication/web-login';
import Mainsignup from './pages/Authenication/main-signup';
import ManagingStaff from './pages/Home/managingStaff';
import MiniDrawer from './components/drawer/Drawer.jsx';
import ViewAllSites from './pages/ManagingSites/ViewAllSites';
import AddSiteForm from './components/forms/AddSiteForm';
import AddSite from './pages/ManagingSites/AddSite';

const App = () => {

  const isLogged = useSelector((state) => state.isLogged)
  console.log(isLogged);

  return (
    <BrowserRouter>
      {/* {isLogged && <MiniDrawer />} */}
      <MiniDrawer />
      <Routes>
        <Route path='/managingHome' element={<ManagingStaff />} />
        <Route path='/viewSites' element={<ViewAllSites />} />
        <Route path='/signUp' element={<Mainsignup />} />
        <Route path='/login' element={<Weblogin />} />
        <Route path='/addSite' element={<AddSite />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;