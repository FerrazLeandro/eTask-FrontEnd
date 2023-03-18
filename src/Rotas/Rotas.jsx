import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './../Pages/Home/Home';
import Login from './../Pages/Login/Login';

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;