
import './App.css';
import Header from './elements/components/Header/Header.js';
import Catalog from './elements/components/Catalog/Catalog.js';
import Main from './elements/components/Main/Main.js';
import Footer from './elements/components/Footer/Footer.js';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/catalog" element={<Catalog/>}/>
        </Routes>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;

