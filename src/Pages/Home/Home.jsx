import { useEffect, useContext, useState } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../../services/firebase'
import { FaTrash } from 'react-icons/fa';
import { VscSignOut } from 'react-icons/vsc';
import { getTarefas, deleteTarefa, postTarefa } from './../../Services/api';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Context from './../../Context/Context';
import Footer from "../../Components/Footer/Footer";
import './Home.css';

function Home() {
    const [tarefas, setTarefas] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [titulo, setTitulo] = useState('');
    const [user, setUser] = useContext(Context);

    const analytics = getAnalytics();
    let navigate = useNavigate();

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
                    id: 1
                }
            }
            console.log(tarefaCadastrada);
            const data = await postTarefa(tarefaCadastrada);
            buscarTarefas();
            setTitulo('');
            setDescricao('');
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


    function sair() {
        signOut(auth).then(() => {
            navigate("/");
            setUser('')
            localStorage.removeItem('eTask-user');
        }).catch((error) => {
            alert("Erro ao sair da conta")
        });

    }

    useEffect(() => {
        if (user?.nome == null)
            navigate("/");

        logEvent(analytics, 'screen_view', {
            firebase_screen: "Home",
            firebase_screen_class: "Home"
        });
        buscarTarefas()
    }, [user]);

    return (
        <div>
            <div className='container'>
                <div className="colunaUsuario">
                    <div className='divUsuario'>
                        <Avatar alt="Usuário" sx={{ width: 40, height: 40 }} src={user?.foto} />
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
                            Add Task
                        </Button>
                    </div>
                    <VscSignOut className='iconeSair' onClick={() => sair()} />
                </div>
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
                                        <p className='data'>Criado: {tarefa.criacao}</p>
                                        <FaTrash className='icone' onClick={() => deletarTarefa(tarefa)} />
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
                                        <p className='data'>Criado: {tarefa.criacao}</p>
                                        <FaTrash className='icone' onClick={() => deletarTarefa(tarefa)} />
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
                                        <p className='data'>Criado: {tarefa.criacao}</p>
                                        <FaTrash className='icone' onClick={() => deletarTarefa(tarefa)} />
                                    </div>
                                </div>
                            }
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;