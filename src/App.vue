<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="#" class="navbar-brand">Menu.com.vc</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/dashboard" class="nav-link">Dashboard</a>
        </li>
        <li class="nav-item">
          <a href="/clientes" class="nav-link">Clientes</a>
        </li>
        <li class="nav-item">
          <a href="/pedidos" class="nav-link">Pedidos</a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>