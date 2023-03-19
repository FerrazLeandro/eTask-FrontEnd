import { auth, provider } from '../../services/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";
import Context from './../../Context/Context';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Login.css';

function Login() {
    const [user, setUser] = useContext(Context);

    let navigate = useNavigate();
    const analytics = getAnalytics();

    const logar = () => {
        signInWithPopup(auth, provider).then((data) => {
            let response = {
                displayName: data.user.displayName,
                photoURL: data.user.photoURL
            }
            setUser(response);
            navigate("/home");
        })
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
        <div className='containerLogin'>
            <div className='login'>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <div className='introducao'>
                    <p>Se você precisa gerenciar suas tarefas diárias e manter o controle do que precisa ser feito, a plataforma eTask é a solução perfeita para você. Com a eTask, você pode criar, organizar e gerenciar suas tarefas em um só lugar, sem a necessidade de usar diversas ferramentas e aplicativos diferentes.</p>
                    <p> Não perca mais tempo com a desorganização e a falta de foco. Comece a usar a plataforma eTask hoje mesmo e aumente sua produtividade e eficiência no gerenciamento de tarefas. Tudo isso de graça, veja como ela pode transformar a sua rotina.</p>
                </div>
                <Button variant="contained" onClick={() => logar()}>Entrar com o Google</Button>
                <Typography variant="body2" color="#fff" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="https://leandroferraz.tech">
                        Leandro Ferraz
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </div>
        </div>
    );
}

export default Login;