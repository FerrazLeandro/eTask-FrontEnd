import { auth, provider } from '../../services/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";
import './Login.css';

function Login() {
    const [user, setUser] = useState(localStorage.getItem('eTask-user'));
    let navigate = useNavigate();
    const analytics = getAnalytics();

    const logar = () => {
        signInWithPopup(auth, provider).then((data) => {
            let response = {
                displayName: data.user.displayName,
                photoURL: data.user.photoURL
            }
            localStorage.setItem('eTask-user', JSON.stringify(response))
            navigate("/home");
        })
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('eTask-user')));
        if (user)
            navigate("/home");

        logEvent(analytics, 'screen_view', {
            firebase_screen: "Login",
            firebase_screen_class: "Login"
        });
    }, [user]);

    return (
        <div>
            <h1>Login</h1>
            <button onClick={logar}>Click</button>
        </div>
    )
}

export default Login;