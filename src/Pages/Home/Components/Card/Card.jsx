import { FaTrash } from 'react-icons/fa';
import Avatar from '@mui/material/Avatar';
import MenuCard  from '../MenuCard/MenuCard';
import { useState } from 'react';
import { deleteTarefa, getTarefas } from '../../../../services/api';
import TarefaContext from './../../../../Context/TarefaContext';
import { useContext } from 'react';
import './Card.css';

function Card(tarefa) {
    const [tarefaDetalhe, setTarefaDetalhe] = useState(tarefa.state.data);
    const [tarefas, setTarefas] = useContext(TarefaContext);

    const buscarTarefas = async () => {
        try {
            const data = await getTarefas();
            setTarefas(data);
        } catch (e) {
            console.error(e);
        }
    }

    const deletarTarefa = async (tarefa) => {
        try {
            await deleteTarefa(tarefa);
            buscarTarefas()
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className='card' key={tarefa.id}>
            <div className='divTitulo'>
                <Avatar alt="Usuário" sx={{ width: 28, height: 28, mr: 1 }} src={tarefaDetalhe?.usuario?.foto} />
                <textarea className='titulo' spellCheck value={tarefaDetalhe.titulo} maxLength={50} disabled />
                <MenuCard state={{ data: tarefa }}/>
            </div>
            <textarea className='descricao' rows={5} spellCheck type="text" value={tarefaDetalhe?.descricao} maxLength={50} disabled />
            <div className='divFooter'>
                <p className='data'>Criado: {tarefaDetalhe?.criacao}</p>
                <FaTrash className='icone' onClick={() => deletarTarefa(tarefaDetalhe)} />
            </div>
        </div>
    )
}

export default Card;