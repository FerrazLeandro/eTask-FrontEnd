import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { useContext } from 'react';
import Context from './../../Context/Context';
import Logo from '../../assets/ico.png';
import { VscSignOut } from 'react-icons/vsc';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Header.css'
import { auth } from '../../services/firebase';

function Header() {
    const [user, setUser] = useContext(Context);
    let navigate = useNavigate();


    function sair() {
        signOut(auth).then(() => {
            navigate("/");
            setUser('')
        }).catch((error) => {
            alert("Erro ao sair da conta")
        });

    }

    return (
        <AppBar position="static" sx={{ backgroundColor: '#161616' }}>
            <Container>
                <Toolbar disableGutters>
                    <img src={Logo} alt="Logo" className='logo' />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            ml: 1,
                            display: { flexGrow: 1 },
                            fontWeight: 400,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        eTask
                    </Typography>

                    <Box sx={{ display: 'flex', flexGrow: 0 }}>
                        <Avatar alt="Foto" src={user.foto} sx={{ mr: 2}}/>
                        <VscSignOut className='iconeSair' onClick={() => sair()} />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;