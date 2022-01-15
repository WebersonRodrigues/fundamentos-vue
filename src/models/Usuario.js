import Perfil from "./Perfil";

export default class Usuario {
    constructor(obj){
        obj = obj || {};
        this.id = obj.id;
        this.nome = obj.nome;
        this.email = obj.email;
        this.senha = obj.senha;
        this.foto = obj.foto;
        this.perfil = new Perfil(obj.perfil);
        this.dataCadastro = obj.dataCadastro;
    }

    modeloValidoLogin(){
        return !!(this.email && this.senha);
    }
}