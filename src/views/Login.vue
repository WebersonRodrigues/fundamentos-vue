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

export default {
  name:"Login",
  components:{
    Input,
    Button
  },
  data(){
    return {
      usuario:{
        email:'',
        senha:''
      }
    }
  },
  methods:{
    recebendoValor(valor){
      alert(valor);
    },
    login(){
      // Aqui enviaria email e senha para api.
      // Se tudo der certo, eu envio para a tela de controle de produtos.
      // Caso contrario mandaria uma mensagem de usuário e senha inválidos
      this.$router.push({name: "ControleDeProdutos"});
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
