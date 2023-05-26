import './App.css';

import { Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Home from './pages/Home/Home';
import Streamings from './pages/Streamings/Streamings';
import Layout from './components/Layout/Layout';
import EditSerie from './pages/EditSerie/EditSerie';
import AddSerie from './pages/AddSerie/AddSerie';
import EditStreaming from './pages/EditStreaming/EditStreaming';

function App() {
  //Identar o código 
  //Refatorar o nome dos forms EditSerie->UpdateSerie, AddSerie -> CreateSerie 
  
  return (
    <Layout props={{hideHeaderPaths:['/', '/cadastro']}}>
      <Routes>
        <Route index element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path='home' element={<Home />} />
        <Route path='streamings' element={<Streamings />} />
        <Route path='serie/adicionar' element={<AddSerie/>}/>
        <Route path='serie/editar' element={<EditSerie/>}/>
        <Route path='streaming/adicionar' element=''/>
        <Route path='streaming/editar' element={<EditStreaming/>}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>

  );
}

export default App;
