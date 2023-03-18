import { getTarefas } from '../../../../Services/api';
import { useState } from 'react';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { FaTrash } from 'react-icons/fa';
import './Colunas.css'
import { deleteTarefa } from './../../../../Services/api';

function Colunas() {
    const [tarefas, setTarefas] = useState([]);

    const buscarTarefas = async () => {
        try {
            const data = await getTarefas();
            setTarefas(data);
            console.log(data);
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

    useEffect(() => {
        buscarTarefas()
    }, [])

    return (
        <div className='container'>
            <div className="coluna">
                <p className='nomeColuna'>A Fazer</p>
                {tarefas.map((tarefa) =>
                    <>
                        {
                            tarefa.status == 1 &&
                            <div className='card' key={tarefa.id}>
                                <div className='divTitulo'>
                                    <textarea className='titulo' spellCheck value={tarefa.titulo} maxLength={50} disabled />
                                    <Avatar alt="Usuário" sx={{ width: 28, height: 28 }} src={tarefa.usuario.foto} />
                                </div>
                                <textarea className='descricao' rows={5} spellCheck type="text" value={tarefa.descricao} maxLength={50} disabled />
                                <div className='divFooter'>
                                    <FaTrash className='icone' onClick={() => deletarTarefa(tarefa)} />
                                    <p className='data'>Criado: {tarefa.criacao}</p>
                                </div>
                            </div>
                        }
                    </>
                )}
            </div>
            <div className="coluna">
                <p className='nomeColuna'>Em Andamento</p>
                {tarefas.map((tarefa) =>
                    <>
                        {
                            tarefa.status == 2 &&
                            <div className='card' key={tarefa.id}>
                                <div className='divTitulo'>
                                    <textarea className='titulo' rows={4} spellCheck value={tarefa.titulo} maxLength={50} disabled />
                                    <Avatar alt="Usuário" sx={{ width: 28, height: 28 }} src={tarefa.usuario.foto} />
                                </div>
                                <textarea className='descricao' rows={5} spellCheck type="text" value={tarefa.descricao} maxLength={200} disabled />
                                <div className='divFooter'>
                                    <FaTrash className='icone' onClick={() => deletarTarefa(tarefa)} />
                                    <p className='data'>Criado: {tarefa.criacao}</p>
                                </div>
                            </div>
                        }
                    </>
                )}
            </div>
            <div className="coluna">
                <p className='nomeColuna'>Concluído</p>
                {tarefas.map((tarefa) =>
                    <>
                        {
                            tarefa.status == 3 &&
                            <div className='card' key={tarefa.id}>
                                <div className='divTitulo'>
                                    <textarea className='titulo' spellCheck value={tarefa.titulo} maxLength={50} disabled />
                                    <Avatar alt="Usuário" sx={{ width: 28, height: 28 }} src={tarefa.usuario.foto} />
                                </div>
                                <textarea className='descricao' rows={5} spellCheck type="text" value={tarefa.descricao} maxLength={200} disabled />
                                <div className='divFooter'>
                                    <FaTrash className='icone' onClick={() => deletarTarefa(tarefa)} />
                                    <p className='data'>Criado: {tarefa.criacao}</p>
                                </div>
                            </div>
                        }
                    </>
                )}
            </div>
        </div>
    )
}

export default Colunas;