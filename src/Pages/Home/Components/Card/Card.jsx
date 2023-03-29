import { FaTrash } from 'react-icons/fa';
import Avatar from '@mui/material/Avatar';
import MenuCard from '../MenuCard/MenuCard';
import { useState } from 'react';
import { deleteTarefa, getTarefas } from '../../../../services/api';
import TarefaContext from './../../../../Context/TarefaContext';
import { useContext } from 'react';
import Context from './../../../../Context/Context';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import './Card.css';

function Card(tarefa) {
    const [tarefaDetalhe, setTarefaDetalhe] = useState(tarefa.state.data);
    const [tarefas, setTarefas] = useContext(TarefaContext);
    const [user, setUser] = useContext(Context);

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
            handleShow("Tarefa excluída com sucesso", "success")
        } catch (e) {
            console.error(e);
        }
    }

    function handleShow(mensagem, tipo) {
        Store.addNotification({
            title: "eTask",
            message: mensagem,
            type: tipo,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }

    return (
        <div className='card' key={tarefa.id}>
            <div className='divTitulo'>
                <Avatar alt="Usuário" sx={{ width: 28, height: 28, mr: 1 }} src={tarefaDetalhe?.usuario?.foto} />
                <textarea className='titulo' spellCheck value={tarefaDetalhe.titulo} maxLength={50} disabled />
                {tarefaDetalhe?.usuario?.id == user?.id &&
                    <MenuCard state={{ data: tarefa }} />
                }
            </div>
            <textarea className='descricao' rows={5} spellCheck type="text" value={tarefaDetalhe?.descricao} maxLength={50} disabled />
            <div className='divFooter'>
                <p className='data'>Criado: {tarefaDetalhe?.criacao}</p>
                {tarefaDetalhe?.usuario?.id == user?.id &&
                    <FaTrash className='icone' onClick={() => deletarTarefa(tarefaDetalhe)} />
                }
            </div>
        </div>
    )
}

export default Card;