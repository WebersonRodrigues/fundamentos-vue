<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="titulo">Cards de produtos</h1>
        <hr />
      </div>
    </div>

    <div class="row mt-3">
      <div v-for="produto in produtos" :key="produto.id">
        <Card>
          <template v-slot:nome> {{ produto.nome }} </template>

          <template v-slot:valor> {{ produto.valor | real }} </template>

          <template v-slot:observacao> {{ produto.observacao }} </template>

          <template v-slot:acoes>
            <i
              @click="editarProduto(produto)"
              class="fas fa-pencil-alt icones-tabela"
            ></i>
            <i
              @click="excluirProduto(produto)"
              class="fas fa-trash-alt icones-tabela"
            ></i>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../components/card/Card.vue";
import ProdutoMixin from "../mixins/produto-mixin";

export default {
  name: "ListaProdutoCards",
  mixins: [ProdutoMixin],
  components: {
    Card,
  },
  data() {
    return {};
  },
  methods: {
        trocarImagem(produto){
            console.log(produto)
        }
  },
};
</script>