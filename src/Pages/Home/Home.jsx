import { useEffect, useState } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../../services/firebase'
import './Home.css';

function Home() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('eTask-user')))
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
        if (user?.displayName == null)
            navigate("/");

        logEvent(analytics, 'screen_view', {
            firebase_screen: "Home",
            firebase_screen_class: "Home"
        });
    });

    return (
        <div>
            <h1>Oi</h1>
            <button onClick={sair}>Sair</button>
        </div>
    )
}

export default Home;