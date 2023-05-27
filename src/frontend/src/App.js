import { Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Cadastro from './pages/Cadastro';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';
import Streamings from './pages/Streamings';
import Layout from './components/Layout';
import EditSerie from './pages/EditSerie';
import AddSerie from './pages/AddSerie';
import EditStreaming from './pages/EditStreaming';
import AddStreaming from './pages/AddStreaming';

function App() {
  //Identar o código 
  //Refatorar o nome dos forms EditSerie->UpdateSerie, AddSerie -> CreateSerie 
  
  return (
    <Layout props={{hideHeaderPaths:['/', '/cadastro']}}>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path='home' element={<Home />} />
        <Route path='streamings' element={<Streamings />} />
        <Route path='serie/adicionar' element={<AddSerie/>}/>
        <Route path='serie/editar/:id' element={<EditSerie/>}/>
        <Route path='streaming/adicionar' element={<AddStreaming/>}/>
        <Route path='streaming/editar/:id' element={<EditStreaming/>}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>

  );
}

export default App;
