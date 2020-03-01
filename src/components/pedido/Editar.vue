<template>
  <div v-if="currentPedido" class="edit-form">
    <h4>Pedido</h4>
    <form>
			<p v-if="errors.length">
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
        <ul>
          <li v-for="(error, index) in errors" v-bind:key="index" >{{ error }}</li>
        </ul>
      </p>

      <div class="form-group">
        <label for="cliente">Cliente</label>
        <input type="text" disabled="disabled" class="form-control" id="cliente" :value="currentPedido.cliente.primeiro_nome + ' ' + currentPedido.cliente.ultimo_nome"/>
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <select class="form-control" id="status" v-model="currentPedido.status">
          <option value="Novo">Novo</option>          
          <option value="Pendente">Pendente</option>
          <option value="Entregue">Entregue</option>
        </select>
      </div>
      <div class="form-group">
        <label for="data_pedido">Data do Pedido</label>
        <input type="tel" class="form-control" disabled="disabled" id="data_pedido" :value="datapedido" v-mask="'##/##/####'" />
      </div>
      <div class="form-group">
        <label for="valor">Valor</label>
         <money class="form-control" 
                id="valor"
                v-model="currentPedido.valor"
                v-bind="money">
        </money>
      </div>
    </form>

    <p>{{ message }}</p>

    <button type="submit" class="btn btn-sm btn-success" @click="updatePedido">Salvar</button>
    <a href="/pedidos" class="ml-2 btn btn-sm btn-danger">Cancelar</a>
  </div>

</template>

<script>
import PedidoDataService from "../../services/PedidoDataService";

export default {
  name: "Pedido",
  data() {
    return {
      errors: [],
      currentPedido: null,
      datapedido: '',
      message: '',      
      money: {
        decimal: '.',
        thousands: '',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false
      }
    };
  },
  methods: {
    getPedido(id) {
      PedidoDataService.get(id)
        .then(response => { 
          var data = new Date(response.data.data_pedido);    
          this.datapedido = data.toLocaleDateString();         
          
          this.currentPedido = response.data;
        })
        .catch(e => {
          console.log(e.response.data.error);
        });
    },

    updatePedido() {
      this.errors = [];

      if(!this.currentPedido.status){
        this.errors.push('O status é obrigatório.');
        return;
      }

      if(!this.currentPedido.valor){
        this.errors.push('O valor é obrigatório.');
        return;
      }      

      PedidoDataService.update(this.currentPedido.id, this.currentPedido)
        .then(() => {
          this.message = 'Pedido salvo com sucesso!';
        })
        .catch(e => {
          this.message = e.response.data.error;
        });
    },    
  },
  mounted() {
    this.message = '';
    this.getPedido(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 400px;
  margin: auto;
}
</style>