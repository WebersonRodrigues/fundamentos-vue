import api from './api';

function obterTodos(){
    return new Promise((resolve, reject) => {
        return api.get('/produtos')
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function obterPorId(id){
    return new Promise((resolve, reject) => {
        return api.get(`/produtos/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function cadastrar(produto){
    return new Promise((resolve, reject) => {
        return api.post(`/produtos`, produto)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function atualizar(produto){
    return new Promise((resolve, reject) => {
        return api.put(`/produtos/${produto.id}`, produto)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function deletar(id){
    return new Promise((resolve, reject) => {
        return api.delete(`/produtos/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

export default {
    obterTodos,
    obterPorId,
    cadastrar,
    atualizar,
    deletar
}