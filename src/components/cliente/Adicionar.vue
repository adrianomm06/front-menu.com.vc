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
        <label for="primeiro_nome">Nome</label>
        <input
          type="text"
          class="form-control"
          id="primeiro_nome"
          required
          v-model="cliente.primeiro_nome"
          name="primeiro_nome"
        />
      </div>

      <div class="form-group">
        <label for="ultimo_nome">Ultimo Nome</label>
        <input
          class="form-control"
          id="ultimo_nome"
          required
          v-model="cliente.ultimo_nome"
          name="ultimo_nome"
        />
      </div>

      <div class="form-group">
        <label for="email">E-mail</label>
        <input
          class="form-control"
          id="email"
          required
          v-model="cliente.email"
          name="email"
        />
      </div>

      <button @click="saveCliente" class="btn btn-success">Salvar</button>
    </div>

    <div v-else>
      <h4>Cliente salvo com sucesso!</h4>
      <br />
      <div>
        <button class="btn btn-sm btn-success" @click="newCliente">Novo Cliente</button>              
        <a class="ml-2 btn btn-sm btn-primary" href="/clientes">Listagem Cliente</a> 
      </div>   
    </div>
  </div>
</template>

<script>
import ClienteDataService from "../../services/ClienteDataService";

export default {
  name: "cliente-novo",
  data() {
    return {
      errors: [],
      cliente: {
        id: null,
        primeiro_nome: "",
        ultimo_nome: "",
        email: ""
      },
      submitted: false
    };
  },
  methods: {
    saveCliente() {
      this.errors = [];

      if(!this.cliente.primeiro_nome){
        this.errors.push('O nome é obrigatório.');
        return;
      }

      if(!this.cliente.ultimo_nome){
        this.errors.push('O ultimo nome é obrigatório.');
        return;
      }

      if(!this.cliente.email){
        this.errors.push('O e-mail é obrigatório.');
        return;
      }

      var data = {
        primeiro_nome: this.cliente.primeiro_nome,
        ultimo_nome: this.cliente.ultimo_nome,
        email: this.cliente.email
      };

      ClienteDataService.create(data).then(response => {          
        this.cliente.id = response.data.id;          
        this.submitted = true;
      })
      .catch(e => {
        this.errors.push(e.response.data.error);
      });        
    },
    
    newCliente() {
      this.submitted = false;
      this.cliente = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 400px;
  margin: auto;
}
</style>