<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="titulo">{{ modoCadastro ? "Adicionar" : "Editar" }} produto</h1>
        <hr />
      </div>
    </div>

    <div class="row">
      <div class="col-sm-2">
        <div class="form-group">
          <label for="id">Código</label>
          <input id="id" v-model="produto.id" type="text" disabled class="form-control" />
        </div>
      </div>

      <div class="col-sm-10">
        <div class="form-group">
          <label for="nome">Nome</label>
          <input id="nome" v-model="produto.nome" type="text" class="form-control" />
        </div>
      </div>
 
      <div class="col-sm-3">
        <div class="form-group">
          <label for="quantidade">Quantidade</label>
          <input id="quantidade" v-model="produto.quantidadeEstoque" type="text" class="form-control" />
        </div>
      </div>
     <div class="col-sm-3">
        <div class="form-group">
          <label for="valor">Valor</label>
          <input id="valor" v-model="produto.valor" type="text" class="form-control" />
        </div>
      </div>
      <div class="col-sm-3">
        <div class="form-group">
          <label for="data-cadastro">Data cadastro</label>
          <input id="data-cadastro" v-model="produto.dataCadastro" type="date" class="form-control" />
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <label for="observacao">Observação</label>
          <textarea
            id="observacao"
            v-model="produto.observacao"
            type="date"
            class="form-control"
            rows="4"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <hr />
      </div>

      <div class="col-sm-12">
        <div v-show="modoCadastro" class="form-check-inline">
          <label class="form-check-label">
            <input v-model="continuarAdicionando"  type="checkbox" class="form-check-input"  />
            Continuar adicionando
          </label>
        </div>

        <button  @click="cancelarAcao" class="btn btn-default float-right" type="button">
          Cancelar
        </button>
        <button @click="salvarProduto" class="btn btn-primary float-right mr-2" type="button">
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import Produto from '../models/Produto';
import produtoService from '../services/produto-service';
import conversorDeData from "../utils/conversor-data";

export default {
    name:"Produto",
    data(){
        return {
            produto: new Produto(),
            modoCadastro: true,
            continuarAdicionando: false,
        }
    },
    mounted(){
        let id = this.$route.params.id;
        if(!id) return;

        this.modoCadastro = false;
        this.obterProdutoPorId(id);
    },
    methods:{
        obterProdutoPorId(id){
            produtoService.obterPorId(id)
            .then(response => {
                this.produto = new Produto(response.data);
            })
            .catch(error =>{
                console.log(error)
                this.$swal({
                  icon: 'error',
                  title: 'Não foi possível obter o produto pelo id ' + id,
                  confirmButtonColor: '#FF3D00',
                  animate: true
                });
            })
        },

        cancelarAcao(){
            this.produto = new Produto();
            this.$router.push({name: "ControleDeProdutos"})
        },
        codastrarProduto(){
            if(!this.produto.modeloValidoParaCadastro()){
                this.$swal({
                  icon: 'warning',
                  title: 'O nome do produto é obrigatório para o cadastro.',
                  confirmButtonColor: '#FF3D00',
                  animate: true
                });
                return;
            }

            this.produto.dataCadastro = 
                conversorDeData.aplicarMascaraISOEmFormatoAmericano(this.produto.dataCadastro);
        
            produtoService.cadastrar(this.produto)
            .then(() => {
                this.$swal({
                  icon: 'success',
                  title: 'Produto cadastrado com sucesso!',
                  confirmButtonColor: '#FF3D00',
                  animate: true
                });

                this.produto = new Produto();

                if(!this.continuarAdicionando){
                    this.$router.push({name: "ControleDeProdutos"})
                }
            })
            .catch(error =>{
                console.log(error);
                this.$swal({
                  icon: 'error',
                  title: 'Não foi possível cadastrar o produto',
                  confirmButtonColor: '#FF3D00',
                  animate: true
                });
            });
        },

        atualizarProduto(){
            if(!this.produto.modeloValidoParaAtualizar()){
                this.$swal({
                  icon: 'warning',
                  title: 'O código e nome do produto são obrigatórios para o cadastro.',
                  confirmButtonColor: '#FF3D00',
                  animate: true
                });
                return;
            }
            
            this.produto.dataCadastro = 
                conversorDeData.aplicarMascaraISOEmFormatoAmericano(this.produto.dataCadastro);

            produtoService.atualizar(this.produto)
            .then(() =>{
                this.$swal({
                  icon: 'success',
                  title: 'Produto atualizado com sucesso!',
                  confirmButtonColor: '#FF3D00',
                  animate: true
                });
                this.$router.push({name: "ControleDeProdutos"});
            })
            .catch(error => {
                console.log(error);
                this.$swal({
                  icon: 'error',
                  title: 'Não foi possível atualizar o produto',
                  confirmButtonColor: '#FF3D00',
                  animate: true
                });
            });
        },

        salvarProduto(){
            (this.modoCadastro) ? this.codastrarProduto() : this.atualizarProduto();
        }   
    }
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>