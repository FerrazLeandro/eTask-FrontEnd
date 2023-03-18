import Rotas from './Rotas/Rotas';
import Context from './Context/Context';
import { useState } from 'react';
import './reset.css'
import './App.css';

function App() {
  const [user, setUser] = useState('');
  
  return (
    <Context.Provider value={[user, setUser]}>
      <Rotas />
    </Context.Provider>
  );
}

export default App;