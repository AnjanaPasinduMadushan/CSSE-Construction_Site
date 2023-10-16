import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Weblogin from './pages/Authenication/web-login';
import Mainsignup from './pages/Authenication/main-signup';
import ManagingStaff from './pages/Home/managingStaff';
import MiniDrawer from './components/drawer';
import MaterialTable from './pages/Supplier/MeterialTable';
import AddMaterial from './pages/Supplier/MateriealAddForm'
const App = () => {

  const isLogged = useSelector((state) => state.isLogged)
  console.log(isLogged);

  return (
    <BrowserRouter>
      {isLogged && <MiniDrawer />}
      <Routes>
        <Route path='/managingHome' element={<ManagingStaff />} />
        <Route path='/signUp' element={<Mainsignup />} />
        <Route path='/login' element={<Weblogin />} />
        <Route path='/material' element={<MaterialTable />} />
        <Route path='/addmaterial' element={<AddMaterial />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;