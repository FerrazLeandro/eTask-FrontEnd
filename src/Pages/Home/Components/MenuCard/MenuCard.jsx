import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { FiMoreVertical } from 'react-icons/fi';
import { getTarefas, putTarefa } from '../../../../services/api';
import { useState } from 'react';
import TarefaContext from './../../../../Context/TarefaContext';
import { useContext } from 'react';

function MenuCard(tarefa) {
    const [tarefas, setTarefas] = useContext(TarefaContext);
    const [tarefaDetalhe, setTarefaDetalhe] = useState(tarefa.state.data);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const buscarTarefas = async () => {
        try {
            const data = await getTarefas();
            setTarefas(data);
        } catch (e) {
            console.error(e);
        }
    }

    const atualizarTarefa = async (tarefaDetalhe, status) => {
        try {
            const tarefaAtualizada = {
                id: tarefaDetalhe.state.data.id,
                titulo: tarefaDetalhe.state.data.titulo,
                descricao: tarefaDetalhe.state.data.descricao,
                criacao: tarefaDetalhe.state.data.criacao,
                status: status,
                usuario: {
                    id: tarefaDetalhe.state.data.usuario.id
                }
            }
            await putTarefa(tarefaAtualizada);
            buscarTarefas()
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <FiMoreVertical className='menu'
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            />
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={() => atualizarTarefa(tarefaDetalhe, 2)}>Iniciar</MenuItem>
                <MenuItem onClick={() => atualizarTarefa(tarefaDetalhe, 3)}>Concluir</MenuItem>
            </Menu>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={() => atualizarTarefa(tarefaDetalhe, 2)}>Iniciar</MenuItem>
                <MenuItem onClick={() => atualizarTarefa(tarefaDetalhe, 3)}>Concluir</MenuItem>
                <MenuItem onClick={() => atualizarTarefa(tarefaDetalhe, 1)}>Reabrir</MenuItem>
            </Menu>
        </div>
    );
}

export default MenuCard;