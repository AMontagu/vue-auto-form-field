<template>
  <div id="app">
    <v-app id="inspire" light>
      <!-- <Header/> -->

      <left-navbar :navbar-items="navbarItems" :app="true" />

      <v-content :key="$route.path">
        <v-container pt-5 px-4 pb-4 fluid>
          <router-view />
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import LeftNavbar from "./components/LeftNavbar.vue";

export default {
  name: "App",
  components: {
    LeftNavbar
  },
  data() {
    return {
      navbarItems: [
        {
          icon: "home",
          text: "vaff",
          path: "/vaff/",
          permission: true
        },
        {
          icon: "home",
          text: "vaffMediaField",
          path: "/vaff-media-field/",
          permission: true
        },
        {
          icon: "home",
          text: "vaffDateTimeField",
          path: "/vaff-date-time-field/",
          permission: true
        }
      ]
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
