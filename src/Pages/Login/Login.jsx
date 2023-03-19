import { auth, provider } from '../../services/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";
import Context from './../../Context/Context';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import './Login.css';
import { postUsuario } from '../../services/api';
import { getUsuario } from './../../services/api';

function Login() {
    const [user, setUser] = useContext(Context);

    let navigate = useNavigate();
    const analytics = getAnalytics();

    const logar = () => {
        signInWithPopup(auth, provider).then((data) => {
            buscarUsuario(data.user)
        })
    }

    const buscarUsuario = async (user) => {
        try {
            const data = await getUsuario(user.email);

            if (!data) {
                criarUsuario(user)
            } else {
                const usuario = {
                    id: data?.id,
                    nome: data?.nome,
                    foto: data?.foto,
                    email: data?.email,
                }
                setUser(usuario)
                navigate("/home");
            }
        } catch (e) {
            console.error(e)
        }

    }

    const criarUsuario = async (user) => {
        const usuario = {
            nome: user?.displayName,
            foto: user?.photoURL,
            email: user?.email,
        }

        try {
            const { data } = await postUsuario(usuario);
            setUser(data);
            navigate("/home");
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (user)
            navigate("/home");

        logEvent(analytics, 'screen_view', {
            firebase_screen: "Login",
            firebase_screen_class: "Login"
        });
    }, []);


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