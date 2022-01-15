<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h2 class="titulo">Produtos</h2>
        <hr />
      </div>
    </div>

    <div class="row sub-cointainer">
      <div class="col-sm-2">
        <Button :callback="adicionarProduto" value="Adicionar"></Button>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Valor</th>
              <th>Data de cadastro</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in produtos" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.nome }}</td>
              <td>{{ item.quantidadeEstoque }}</td>
              <td>{{ item.valor | real }}</td>
              <td>{{ item.dataCadastro | data }}</td>
              <td>
                <i @click="editarProduto(item)" class="fas fa-pencil-alt icones-tabela"></i>
                <i @click="excluirProduto(item)" class="fas fa-trash-alt icones-tabela"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "../components/button/Button.vue";
import produtoService from "@/services/produto-service";
import Produto from "../models/Produto";
import conversorMonetario from "../utils/conversor-monetario";
import conversorDeData from "../utils/conversor-data";

export default {
  name: "ControleDeProdutos",
  components: {
    Button,
  },
  filters: {
    data(data) {
      return conversorDeData.aplicarMascaraEmDataIso(data)
    },
    real(valor) {
      return conversorMonetario.aplicarMascaraParaRealComPrefixo(valor);
    },
  },
  data() {
    return {
      produtos: [],
    };
  },
  mounted() {
    this.obterTodosOsProdutos();
  },
  methods: {

    adicionarProduto(){
      this.$router.push({ name: "NovoProduto" })
    },

    editarProduto(produto){
      this.$router.push({ name: "EditarProduto", params: {id: produto.id } })
    },

    excluirProduto(produto){
      
      if(confirm(`Deseja excluir o produto "${produto.id} - ${produto.nome}"`)){
        
        produtoService.deletar(produto.id)
        .then(() => {
          let indice = this.produtos.findIndex(p => p.id == produto.id);
          this.produtos.splice(indice, 1);
          
          setTimeout(() =>{
            alert("Produto excluido com sucesso!");
          },500);
     
        })
        .catch(error =>{
          console.log(error);
        });

      }

    },

    ordernarProdutos(a, b){
      // A < B = -1
      // A > B = 1
      // A == B = 0
      return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
    },

    obterTodosOsProdutos() {
      produtoService
        .obterTodos()
        .then((response) => {
          let produtos = response.data.map((p) => new Produto(p));
          this.produtos = produtos.reverse();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.icones-tabela{
  margin: 5px;
  cursor: pointer;
  color: var(--cor-primaria);
}
</style>
