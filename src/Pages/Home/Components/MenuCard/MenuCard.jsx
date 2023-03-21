import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { FiMoreVertical } from 'react-icons/fi';
import { getTarefas, putTarefa } from '../../../../services/api';
import { useState } from 'react';
import TarefaContext from './../../../../Context/TarefaContext';
import { useContext } from 'react';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

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

    function handleShow (mensagem, tipo) {
        Store.addNotification({
            title: "eTask",
            message: mensagem,
            type: tipo,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }

    const atualizarTarefa = async (tarefaDetalhe, status, descricaoStatus) => {
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
            handleShow("Tarefa " + descricaoStatus + " com sucesso", "success")
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
                <MenuItem onClick={() => atualizarTarefa(tarefaDetalhe, 2, "iniciada")}>Iniciar</MenuItem>
                <MenuItem onClick={() => atualizarTarefa(tarefaDetalhe, 3, "concluída")}>Concluir</MenuItem>
                <MenuItem onClick={() => atualizarTarefa(tarefaDetalhe, 1, "reaberta")}>Reabrir</MenuItem>
            </Menu>
        </div>
    );
}

export default MenuCard;