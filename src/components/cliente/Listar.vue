<template>
	<div>
		<h4>Clientes</h4>
		<table class="table">
			<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Primeiro Nome</th>
				<th scope="col">Ultimo Nome</th>
				<th scope="col">Email</th>
				<th scope="col"></th>
				<th scope="col"></th>
			</tr>
			</thead>
			<tbody>
				<tr v-for="cliente in clientes" v-bind:key="cliente.id">
					<td scope="row">{{ cliente.id }}</td>
					<td>{{ cliente.primeiro_nome }}</td>
					<td>{{ cliente.ultimo_nome }}</td>
					<td>{{ cliente.email }}</td>
					<td><a class="btn btn-sm btn-primary" :href="'/clientes/' + cliente.id">Editar</a></td>
					<td><button class="btn btn-sm btn-danger" @click="removeCliente(cliente.id)">Remover</button></td>
				</tr>
			</tbody>
		</table>

   <a class="btn btn-sm btn-primary" href="/clientes/new">Adicionar Cliente</a>
	</div>
</template>

<script>
import ClienteDataService from "../../services/ClienteDataService";

export default {
  name: "cliente-lista",
  data() {
    return {
      clientes: [],
    };
  },
  methods: {
    retrieveClientes() {
      ClienteDataService.getAll()
        .then(response => {          
          this.clientes = response.data;
        })
        .catch(e => {
          console.log(e.response.data.error);
        });
    },

    refreshList() {
      this.retrieveClientes();
    },

		removeCliente(id) {
      ClienteDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch(e => {
          console.log(e.response.data.error);
        });
    },     
  },
  mounted() {
    this.retrieveClientes();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>