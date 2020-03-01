<template>
  <div v-if="currentCliente" class="edit-form">
    <h4>Cliente</h4>
    <form>
			<p v-if="errors.length">
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
        <ul>
          <li v-for="(error, index) in errors" v-bind:key="index" >{{ error }}</li>
        </ul>
      </p>

      <div class="form-group">
        <label for="primeiro_nome">Nome</label>
        <input type="text" class="form-control" id="primeiro_nome"
          v-model="currentCliente.primeiro_nome"
        />
      </div>
      <div class="form-group">
        <label for="ultimo_nome">Ultimo Nome</label>
        <input type="text" class="form-control" id="ultimo_nome"
          v-model="currentCliente.ultimo_nome"
        />
      </div>
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="text" class="form-control" id="email"
          v-model="currentCliente.email"
        />
      </div>
    </form>

    <p>{{ message }}</p>

    <button type="submit" class="btn btn-sm btn-success" @click="updateCliente">Salvar</button>
    <a href="/clientes" class="ml-2 btn btn-sm btn-danger">Cancelar</a>
  </div>



</template>

<script>
import ClienteDataService from "../../services/ClienteDataService";

export default {
  name: "cliente",
  data() {
    return {
      errors: [],
      currentCliente: null,
      message: ''
    };
  },
  methods: {
    getCliente(id) {
      ClienteDataService.get(id)
        .then(response => {
          this.currentCliente = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCliente() {
      this.errors = [];

      if(!this.currentCliente.primeiro_nome){
        this.errors.push('O nome é obrigatório.');
        return;
      }

      if(!this.currentCliente.ultimo_nome){
        this.errors.push('O ultimo nome é obrigatório.');
        return;
      }

      if(!this.currentCliente.email){
        this.errors.push('O e-mail é obrigatório.');
        return;
      }

      ClienteDataService.update(this.currentCliente.id, this.currentCliente)
        .then(() => {
          this.message = 'Cliente salvo com sucesso!';
        })
        .catch(e => {
          this.message = e.response.data.error;
        });
    },    
  },
  mounted() {
    this.message = '';
    this.getCliente(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 400px;
  margin: auto;
}
</style>