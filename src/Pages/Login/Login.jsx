import { auth, provider } from '../../services/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";
import Context from './../../Context/Context';
import './Login.css';

function Login() {
    const [user, setUser] = useContext(Context);

    let navigate = useNavigate();
    const analytics = getAnalytics();

    const logar = () => {
        // signInWithPopup(auth, provider).then((data) => {
        //     let response = {
        //         displayName: data.user.displayName,
        //         photoURL: data.user.photoURL
        //     }
            // setUser(response);
            navigate("/home");
        // })
    }

    useEffect(() => {
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