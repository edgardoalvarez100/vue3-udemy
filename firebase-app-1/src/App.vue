<template>

  <a-layout class="layout" v-if="!userStore.loadingSession">
    <a-layout-header>
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }" v-model:selectedKeys="selectedKeys">
        <a-menu-item v-if="userStore.userData" key="home">
          <router-link to="/">Home</router-link>
        </a-menu-item>
        <a-menu-item v-if="userStore.userData" key="perfil">
          <router-link to="/perfil">Perfil</router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="login">
          <router-link to="/login">Login</router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="register">
          <router-link to="/register">Register</router-link>
        </a-menu-item>
        <a-menu-item key="logout" @click="userStore.logoutUser" v-if="userStore.userData">
          Logout
        </a-menu-item>
      </a-menu>
    </a-layout-header>


    <a-layout-content style="padding: 0 50px;">
      <div class="container">

        <router-view></router-view>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
  <div v-if="userStore.loadingSession">Loading Session....</div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { useUserStore } from './stores/user';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const userStore = useUserStore()
const route = useRoute()
const selectedKeys = ref([])

watch(() => route.name, () => { selectedKeys.value = [route.name] })

</script>
<style>
.container {
  background-color: #fff;
  padding: 24px;
  min-height: calc(100vh - 64px - 48px);
}

.text-center {
  text-align: center;
}


body {
  margin: 0;
}
</style>