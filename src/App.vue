<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/non-existing">Non-Existing Page</router-link>
    </nav>
    <router-view></router-view> <!-- Здесь будет отображаться выбранный компонент -->
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>

</style>
