import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/clientes",      
      name: "clientes",
      component: () => import("./components/cliente/Listar")
    },
    {
      path: "/clientes/new",
      name: "cliente-novo",
      component: () => import("./components/cliente/Adicionar")
    },
    {
      path: "/clientes/:id",
      name: "cliente",
      component: () => import("./components/cliente/Editar")
    },
    {
        path: "/pedidos",      
        name: "pedidos",
        component: () => import("./components/pedido/Listar")
      },
      {
        path: "/pedidos/new",
        name: "pedido-novo",
        component: () => import("./components/pedido/Adicionar")
      },
      {
        path: "/pedidos/:id",
        name: "pedido",
        component: () => import("./components/pedido/Editar")
      }
  ]
});