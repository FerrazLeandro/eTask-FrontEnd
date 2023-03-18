import { useEffect, useContext } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../../services/firebase'
import Context from './../../Context/Context';
import Menu from './Components/Menu/Menu';
import Colunas from "./Components/Colunas/Colunas";
import './Home.css';

function Home() {
    const [user, setUser] = useContext(Context);

    const analytics = getAnalytics();
    let navigate = useNavigate();

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
        // if (user?.displayName == null)
        //     navigate("/");

        // logEvent(analytics, 'screen_view', {
        //     firebase_screen: "Home",
        //     firebase_screen_class: "Home"
        // });
    }, [user]);

    return (
        <div>
            <Menu />
            <Colunas />
            <button onClick={sair}>Sair</button>
        </div>
    )
}

export default Home;