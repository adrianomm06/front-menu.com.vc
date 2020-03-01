<template>
	<div>
		<h4>Pedidos</h4>
		<table class="table">
			<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Cliente</th>
				<th scope="col">Data da Compra</th>
				<th scope="col">Valor</th>
				<th scope="col">Status</th>
				<th scope="col"></th>
				<th scope="col"></th>
			</tr>
			</thead>
			<tbody>
				<tr v-for="pedido in pedidos" v-bind:key="pedido.id">
					<td scope="row">{{ pedido.id }}</td>
					<td>{{ pedido.cliente.primeiro_nome }} {{ pedido.cliente.ultimo_nome }}</td>
					<td>{{ pedido.data_pedido | moment('DD/MM/YYYY') }}</td>
					<td>R$ {{ pedido.valor }}</td>
					<td>{{ pedido.status }}</td>
					<td><a class="btn btn-sm btn-primary" :href="'/pedidos/' + pedido.id">Editar</a></td>
					<td><button class="btn btn-sm btn-danger" @click="removePedido(pedido.id)">Remover</button></td>
				</tr>
			</tbody>
		</table>

   <a class="btn btn-sm btn-primary" href="/pedidos/new">Adicionar Pedido</a>
	</div>
</template>

<script>
import PedidoDataService from "../../services/PedidoDataService";

export default {
  name: "pedido-lista",
  data() {
    return {
      pedidos: [],      
    };
  },
  methods: {
    retrievePedidos() {
      PedidoDataService.getAll()
        .then(response => {          
          this.pedidos = response.data;
        })
        .catch(e => {
          console.log(e.response.data.error);
        });
    },

    refreshList() {
      this.retrievePedidos();
    },

		removePedido(id) {
      PedidoDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch(e => {
          console.log(e.response.data.error);
        });
    },     
  },
  mounted() {
    this.retrievePedidos();
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