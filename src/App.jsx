import Rotas from './Rotas/Rotas';
import { useState } from 'react';
import Context from './Context/Context';
import TarefaContext from './Context/TarefaContext';
import './reset.css';
import './App.css';

function App() {
  const [user, setUser] = useState('');
  const [tarefas, setTarefas] = useState([]);

  return (
    <Context.Provider value={[user, setUser]}>
      <TarefaContext.Provider value={[tarefas, setTarefas]}>
        <Rotas />
      </TarefaContext.Provider>
    </Context.Provider>
  );
}

export default App;