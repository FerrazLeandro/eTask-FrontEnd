import { useEffect, useContext, useState } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useNavigate } from 'react-router-dom';
import Context from './../../Context/Context';
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Card from './Components/Card/Card'
import './Home.css';
import TarefaContext from './../../Context/TarefaContext';
import Cadastro from "./Components/Cadastro/Cadastro";
import { getTarefas } from "../../services/api";

function Home() {
    const [user, setUser] = useContext(Context);
    const [tarefas, setTarefas] = useContext(TarefaContext);

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
                <Cadastro />
                <div>
                    <div className="divColuna">
                        <p className='nomeColuna'>A Fazer</p>
                        <div className="coluna">
                            {tarefas.map((tarefa) =>
                                <>
                                    {tarefa.status === 1 &&
                                        <Card key={tarefa.id + tarefa.status} state={{ data: tarefa }} />
                                    }
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="divColuna">
                        <p className='nomeColuna'>Em Andamento</p>
                        <div className="coluna">
                            {tarefas.map((tarefa) =>
                                <>
                                    {tarefa.status === 2 &&
                                        <Card key={tarefa.id + tarefa.status} state={{ data: tarefa }} />
                                    }
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="divColuna">
                        <p className='nomeColuna'>Concluído</p>
                        <div className="coluna">
                            {tarefas.map((tarefa) =>
                                <>
                                    {tarefa.status === 3 &&
                                        <Card key={tarefa.id + tarefa.status} state={{ data: tarefa }} />
                                    }
                                </>
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