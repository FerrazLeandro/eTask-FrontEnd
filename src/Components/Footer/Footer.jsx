import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import './Footer.css';

function Footer() {
    return(
        <div className='footer'>
        <Typography variant="body2" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://leandroferraz.tech">
                Leandro Ferraz
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
        </div>
    )
}

export default Footer;