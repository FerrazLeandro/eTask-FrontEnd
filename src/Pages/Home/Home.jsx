import { useEffect, useContext, useState } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { getTarefas, deleteTarefa, postTarefa } from '../../services/api';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Context from './../../Context/Context';
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import './Home.css';

function Home() {
    const [descricao, setDescricao] = useState('');
    const [titulo, setTitulo] = useState('');
    const [user, setUser] = useContext(Context);
    const [aberta, setAberta] = useState([])
    const [emAndamento, setEmAndamento] = useState([])
    const [concluida, setConcluida] = useState([])

    const analytics = getAnalytics();
    let navigate = useNavigate();

    const buscarTarefas = async () => {
        try {
            const data = await getTarefas();
            setAberta(data.filter((item) => item.status === 1));
            setEmAndamento(data.filter((item) => item.status === 2));
            setConcluida(data.filter((item) => item.status === 3));
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

    const deletarTarefa = async (tarefa) => {
        try {
            await deleteTarefa(tarefa);
            buscarTarefas()
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (!user)
            navigate("/");

        logEvent(analytics, 'screen_view', {
            firebase_screen: "Home",
            firebase_screen_class: "Home"
        });
        buscarTarefas()
    }, []);

    return (
        <div>
            <Header />
            <div className="main">
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
                <div>
                    <div className="divColuna">
                        <p className='nomeColuna'>A Fazer</p>
                        <div className="coluna">
                            {aberta?.map((tarefa) =>
                                <div className='card' key={tarefa.id} draggable="true">
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
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="divColuna">
                        <p className='nomeColuna'>Em Andamento</p>
                        <div className="coluna">
                            {emAndamento?.map((tarefa) =>

                                <div className='card' key={tarefa.id} draggable="true">
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
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="divColuna">
                        <p className='nomeColuna'>Concluído</p>
                        <div className="coluna">
                            {concluida?.map((tarefa) =>
                                <div className='card' key={tarefa.id} draggable="true">
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;