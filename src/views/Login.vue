<template lang="pug">
  v-container
    v-layout(row justify-center)
      v-form
        div(class="error-container")
          v-slide-y-transition
            v-subheader(v-if="loginError" class="error--text justify-center login-error")
              | {{ loginErrorMsg }}
        v-text-field(v-model="user.username"
          label="Username"
          v-validate="'required'"
          data-vv-name="username"
          data-vv-as="username"
          :error-messages="$validator.errors.first('username')"
          )
        v-text-field(v-model="user.password"
          type="password"
          label="password"
          v-validate="'required'"
          data-vv-name="password"
          :error-messages="$validator.errors.first('password')"
          data-vv-as="password"
          )
        v-btn(@click="login") Login
        v-btn(@click="googleLogin") Google Login
</template>

<script>
/* eslint-disable no-console */
import api from '@/api/restApi';


export default {
  name: 'TopMenu',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      loginErrorMsg: 'Invalid username or password',
      loginError: false,
    };
  },
  methods: {
    googleLogin() {
      this.$gAuth.signIn()
        .then((GoogleUser) => {
          // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
          console.log('user', GoogleUser);
          // GoogleUser.getId() : Get the user's unique ID string.
          // GoogleUser.getBasicProfile() : Get the user's basic profile information.
          // GoogleUser.getAuthResponse() : Get the response object from
          // the user's auth session. access_token and so on
          // this.isSignIn = this.$gAuth.isAuthorized;
        }).catch((error) => {
          console.log(error);
        });
    },
    login() {
      this.loginError = false;
      this.$validator.validateAll()
        .then((result) => {
          if (!result) {
            return;
          }
          if (!this.user.username || !this.user.password) {
            this.loginErrorMsg = 'Please Provide username and password';
            return;
          }
          api.sendPost('/login', this.user)
            .then((res) => {
              if (res.status === 200) {
                localStorage.setItem('accessToken', res.data.access_token);
                this.$router.push('/');
                console.log(res);
              } else {
                this.loginErrorMsg(res.data.message);
              }
            }, (error) => {
              this.loginError = true;
              this.loginErrorMsg = error.response.data.message;
            });
        });
    },
  },
  mounted() {
  },
};
</script>
