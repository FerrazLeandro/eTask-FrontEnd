import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Footer() {
    return(
        <Typography variant="body2" color="#000" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://leandroferraz.tech">
                Leandro Ferraz
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default Footer;