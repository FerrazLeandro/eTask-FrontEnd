import axios from 'axios'

const api = axios.create({
    baseURL: "https://etask-backend-production.up.railway.app/api"
});

export default api;

export const getTarefas = async () => {
    try {
        const { data } = await api.get("/tarefa")
        return data
    } catch (e) {
        console.error(e)
    }
}

export const postTarefa = async (tarefa) => {
    try {
        const data = await api.post("/tarefa", tarefa)
        return data
    } catch (e) {
        console.error(e)
    }
}

export const putTarefa = async (tarefa) => {
    try {
        const data = await api.put(`/tarefa/${tarefa.id}`, tarefa)
        return data
    } catch (e) {
        console.error(e)
    }
}

export const deleteTarefa = async (tarefa) => {
    try {
        const data = await api.delete(`/tarefa/${tarefa.id}`)
        return data
    } catch (e) {
        console.error(e)
    }
}

export const getUsuario = async (email) => {
    try {
        const { data } = await api.get(`/usuario/${email}`)
        return data
    } catch (e) {
        console.error(e)
    }
}

export const postUsuario = async (usuario) => {
    try {
        const data = await api.post("/usuario", usuario)
        return data
    } catch (e) {
        console.error(e)
    }
}