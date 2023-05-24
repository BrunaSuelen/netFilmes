import './App.css';

import {  Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro';
import PageNotFound from './pages/PageNotFound/PageNotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
