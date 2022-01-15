<template>
    <div class="box-login">

        <div class="logo">
            <h1>Login</h1>
        </div>

        <Input
          label="E-mail"
          placeHolder="exemplo@exemplo.com"
          v-model="usuario.email"
        ></Input>
        
        <Input
          label="Senha"
          placeHolder="123456"
          type="password"
          v-model="usuario.senha"
        ></Input>

        <Button value="Entrar" :callback="login"></Button>
        
    </div>
</template>
<script>
import Input from '../components/input/Input.vue';
import Button from '../components/button/Button.vue';
import Usuario from '../models/Usuario';
import usuarioService from '../services/usuario-service';
import utilsStorage from '../utils/storage';

export default {
  name:"Login",
  components:{
    Input,
    Button
  },
  data(){
    return {
      usuario: new Usuario()
    }
  },
  methods:{
    recebendoValor(valor){
      alert(valor);
    },
    login(){

      if(!this.usuario.modeloValidoLogin()){
        this.$swal({
            icon: "warning",
            title: "Email e senha são obrigatórios.",
            confirmButtonColor: "#FF3D00",
            animate: true
          })
        return;
      }

      usuarioService
      .login(this.usuario.email, this.usuario.senha)
      .then(response => {
        this.usuario = new Usuario(response.data.usuario);

        utilsStorage.salvarUsuarioNaStorage(this.usuario);
        utilsStorage.salvarTokenNaStorage(response.data.token);
        
        this.$router.push({name: "ControleDeProdutos"});
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>

  .box-login {
    width: 300px;
    margin: auto;
    border: 1px solid #ddd;
    margin-top: 70px;
    padding: 30px;
  }

  .logo {
    text-align: center;
    color: var(--cor-primaria);
    
  }
</style>
