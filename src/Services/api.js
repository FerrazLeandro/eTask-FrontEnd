import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:8080/api"
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