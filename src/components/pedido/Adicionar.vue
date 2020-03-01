<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <p v-if="errors.length">
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
        <ul>
          <li v-for="(error, index) in errors" v-bind:key="index" >{{ error }}</li>
        </ul>
      </p>

      <div class="form-group">
      <label for="cliente">Cliente</label>        
        <select class="form-control" id="status" v-model="pedido.cliente_id">
          <option value="">Selecione</option> 
          <option v-for="cliente in clientes" :value="cliente.id" v-bind:key="cliente.id">{{ cliente.primeiro_nome}} {{cliente.ultimo_nome}}</option>         
        </select>
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <select class="form-control" id="status" v-model="pedido.status">
          <option value="Novo">Novo</option>          
          <option value="Pendente">Pendente</option>
          <option value="Entregue">Entregue</option>
        </select>
      </div>
      <div class="form-group">
        <label for="valor">Valor</label>
         <money class="form-control" 
                id="valor"
                v-model="pedido.valor"
                v-bind="money">
        </money>
      </div>

      <button @click="savePedido" class="btn btn-success">Salvar</button>
    </div>

    <div v-else>
      <h4>Pedido salvo com sucesso!</h4>
      <br />
      <div>
        <button class="btn btn-sm btn-success" @click="newPedido">Novo Pedido</button>              
        <a class="ml-2 btn btn-sm btn-primary" href="/pedidos">Listagem de Pedidos</a> 
      </div>   
    </div>
  </div>
</template>

<script>
import ClienteDataService from "../../services/ClienteDataService";
import PedidoDataService from "../../services/PedidoDataService";

export default {
  name: "pedido-novo",
  data() {
    return {
      errors: [],
      clientes: [],
      pedido: {
        id: null,
        data_pedido: "",
        status: "Novo",
        valor: "",
        cliente_id: ""
      },
      submitted: false,
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
    savePedido() {
      this.errors = [];

      if(!this.pedido.cliente_id){
        this.errors.push('O cliente é obrigatório.');
        return;
      }

      if(!this.pedido.status){
        this.errors.push('O status é obrigatório.');
        return;
      }

      if(!this.pedido.valor){
        this.errors.push('O valor é obrigatório.');
        return;
      }

      var data = {
        status: this.pedido.status,
        valor: this.pedido.valor,
        cliente_id: this.pedido.cliente_id
      };

      PedidoDataService.create(data).then(response => {          
        this.pedido.id = response.data.id;          
        this.submitted = true;
      })
      .catch(e => {
        this.errors.push(e.response.data.error);
      });        
    },
    
    newPedido() {
      this.submitted = false;
      this.pedido = {};
    },

    retrieveClientes() {
      ClienteDataService.getAll()
        .then(response => {          
          this.clientes = response.data;
        })
        .catch(e => {
          console.log(e.response.data.error);
        });
    },
  },
  mounted() {
    this.message = '';
    this.retrieveClientes();
  }
};
</script>

<style>
.submit-form {
  max-width: 400px;
  margin: auto;
}
</style>