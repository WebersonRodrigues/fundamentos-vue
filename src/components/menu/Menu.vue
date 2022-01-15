<template>
    <ul class="menu">
        <li>
            <a @click="() => this.$router.push({path:'/'})">Dashboard</a>
        </li>
        <li>
            <a @click="() => this.$router.push({path:'/controle-de-produtos'})">Produtos</a>
        </li>
        <li>
            <a @click="() => this.$router.push({path:'/controle-de-clientes'})">Clientes</a>
        </li>
        <li>
            <a @click="logout">Sair</a>
        </li>
    </ul>
</template>

<script>
import usuarioService from '../../services/usuario-service';
import utilsStorage from '../../utils/storage';

export default {
    name:"Menu",
    data(){
        return{

        }
    },
    methods:{
        logout(){
            usuarioService.logout()
            .then(() =>  {
                utilsStorage.removerUsuarioNaStorage();
                utilsStorage.removerTokenNaStorage();

                this.$router.push({path:'/login'});
            })
            .catch(error => {
                console.log(error);
            })            
        }
    }
}
</script>
<style scoped>

    ul{
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: var(--cor-primaria);
    }

    li {
        float: left;
    }

    li:first-child{
        margin-left: 40px;
    }

    li:last-child{
        float: right;
        margin-right: 10px;
    }

    ul.menu li a {
        display: block;
        color: #FFF;
        padding: 15px 17px;
        text-decoration: none;
        text-align: center;
        cursor: pointer;
    }

    li a:hover{
        background-color: var(--cor-secundaria);
    }

</style>