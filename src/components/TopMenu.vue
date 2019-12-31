
<script>
/* eslint-disable no-console */
import api from '@/api/restApi';

export default {
  name: 'TopMenu',
  methods: {
    onMenuClick(path) {
      this.$router.push(path);
    },
    logout() {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };
      api.sendPost('/logout/access', null, config).then((res) => {
        if (res.status === 200) {
          localStorage.removeItem('accessToken');
          this.$router.push('/login');
        }
      }, (error) => {
        console.log(error);
      });
      // api.sendGet('/users').then((res) => {
      //   console.log(res);
      // });
    },
  },
};
</script>

<style  lang="stylus" scoped>
  .main-navbar
    background-color: #4f6faa
  .mega-menu
    padding-top: 28px;
  .v-btn.small-icon
    .v-icon
      font-size: 16px !important
</style>

<template lang="pug">
  div
    v-toolbar.main-navbar(
    height="40"
    dark=""
    ref="appNavbar"
    style="padding: 0 !important;"
    )

      v-layout(column="" flat )
        v-flex(xs12="" row justify-center  wrap)
          v-expand-transition
            ul(key="ul")
              v-btn(color="#4f6faa" dark="" @click="onMenuClick('/dashboard')" )
                | Dashboard
              v-btn(color="#4f6faa" dark="" @click="logout" )
                | Logout
              <!--v-menu(bottom  offset-y)-->
              <!--template(v-slot:activator="{ on }")-->
              <!--v-btn.small-icon(color="#4f6faa" dark="" v-on="on" @click="GoCartItems1")-->
              <!--| San Pham-->

</template>
