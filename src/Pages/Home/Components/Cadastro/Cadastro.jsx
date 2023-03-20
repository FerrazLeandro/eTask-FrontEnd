import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { getTarefas, postTarefa } from './../../../../services/api';
import { useState } from 'react';
import { useContext } from 'react';
import Context from './../../../../Context/Context';
import TarefaContext from './../../../../Context/TarefaContext';

function Cadastro() {
    const [descricao, setDescricao] = useState('');
    const [titulo, setTitulo] = useState('');
    const [user, setUser] = useContext(Context);
    const [tarefas, setTarefas] = useContext(TarefaContext);


    const buscarTarefas = async () => {
        try {
            const data = await getTarefas();
            setTarefas(data);
        } catch (e) {
            console.error(e);
        }
    }

    const criarTarefa = async () => {
        try {
            const tarefaCadastrada = {
                titulo: titulo,
                descricao: descricao,
                criacao: new Date(Date.now()),
                status: 1,
                usuario: {
                    id: user.id
                }
            }
            const data = await postTarefa(tarefaCadastrada);
            buscarTarefas();
            setTitulo('');
            setDescricao('');
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <div className="colunaUsuario">
                <div className='divUsuario'>
                    <p>Olá {user?.nome}, que tal adicionar novas tarefas ao quadro?</p>
                </div>
                <div className='card' >
                    <label htmlFor="Titulo">Título</label>
                    <TextareaAutosize
                        className='input'
                        aria-label="Titulo"
                        minRows={2}
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />
                    <label htmlFor="Descrição">Descrição</label>
                    <TextareaAutosize
                        className='input'
                        aria-label="Descrição"
                        minRows={5}
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <Button onClick={() => criarTarefa()} variant="outlined" startIcon={<AddIcon />}>
                        Adicionar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Cadastro;