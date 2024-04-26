import { defineStore } from "pinia";
import axios from "axios";
// import { useRouter } from 'vue-router'

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
    authErrors: {},
    authAlerts: null,
    authStatus: null,
    inAuthProcess: false
  }),
  getters: {
    user: (state) => state.authUser,
    errors: (state) => state.authErrors,
    alerts: (state) => state.authAlerts,
    status: (state) => state.authStatus,
    inProcess: (state) => state.inAuthProcess
  },
  actions: {
    getCookie(cname) {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      let expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    removeCookie(cname) {
      const d = new Date();
      d.setTime(d.getTime() + (-1));
      let expires = "expires="+d.toUTCString();
      document.cookie = cname + "='';" + expires + ";path=/";
    },
    clear(){
      this.authStatus = null;
      this.authAlerts = null;
      this.authErrors = {};
    },
    // async getToken() {
    //   await axios.get("/sanctum/csrf-cookie");
    // },
    getUser() {
      let sessionToken = sessionStorage.getItem('sessionToken');
      if (sessionToken) {
        this.inAuthProcess = true;
//
console.log('Getting user...');
//
        let options = {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        }
        axios.get("/user", options)
        .then(
          (response) => {
            this.inAuthProcess = false;
            this.authUser = response.data.user;
          },
          (error) => {
            this.inAuthProcess = false;
            console.log(error);
          }
        );
      } else {
        let rememberToken = this.getCookie('rememberToken');
//
console.log(rememberToken);
//
        if (rememberToken) {
          this.inAuthProcess = true;
//
console.log('Remembering session...');
//
          let options = {
            headers: {
              Authorization: `Bearer ${rememberToken}`
            }
          }
          axios.get("/remember", options)
          .then(
            (response) => {
              this.inAuthProcess = false;
              sessionStorage.setItem('sessionToken', response.data.sessionToken);
              this.getUser();
            },
            (error) => {
              this.inAuthProcess = false;
              console.log(error);
            }
          );
        }
      }
    },
    handleLogin(data) {
      this.clear();
//
console.log('Login...');
//
      this.inAuthProcess = true;

      axios.post("/login", {
        email: data.email,
        password: data.password,
        remember: data.remember
      })
      .then(
        (response) => {
          this.inAuthProcess = false;
//
console.log(response);
//
          this.authStatus = response.status;
//
console.log(this.authStatus);
//
console.log(response.data.rememberToken);

          sessionStorage.setItem('sessionToken', response.data.sessionToken);
          if (data.remember) this.setCookie('rememberToken', response.data.rememberToken, 30);
          
          this.getUser();
        },
        (error) => {
          this.inAuthProcess = false;
//
console.log(error);
//
            if (error.response) {
//
console.log('Client error...');
//
              this.authStatus = error.response.status;
              if (error.response.status == 422) {
                this.authAlerts = error.response.data.errors.user;
              } else if (error.response.status == 403) {
                this.authAlerts = error.response.data.errors.email;
              } else {
                this.authErrors = error.response.data.errors;
              }
            } else {
//
console.log('Network error...');
//
              this.authStatus = 503;
              this.authAlerts = 'Connection refused';
            }
        }
      );
    },
    handleRegister(data) {
      this.clear();
//
console.log('Registring...');
//
      this.inAuthProcess = true;

      axios.post("/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation
      })
      .then(
        (response) => {
          this.inAuthProcess = false;
//
console.log(response);
//
          this.authAlerts = response.data.message;
          this.authStatus = response.status;
//
console.log(this.alerts);
console.log(this.status);
//
        },
        (error) => {
//
console.log(error);
//
          this.inAuthProcess = false;

          if (error.response) {
//
console.log('Client error...');
//
            this.authStatus = error.response.status;
            this.authErrors = error.response.data.errors;
//
console.log(this.authErrors);
//
          } else {
//
console.log('Network error...');
//
            this.authStatus = 503;
            this.authAlerts = 'Connection refused';
          }
        }
      );
    },
    async handleLogout() {
//
console.log('Logout...');
//
      this.clear();
      let sessionToken = sessionStorage.getItem('sessionToken');
      if (sessionToken) {
        this.inAuthProcess = true;

        let options = {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        }
        axios.post("/logout", null, options)
        .then(
          (response) => {
//
console.log(response);
//
            this.inAuthProcess = false;
            this.authStatus = response.status;
            this.authAlerts = response.data.message;
            
            sessionStorage.removeItem('sessionToken');
            this.removeCookie('rememberToken');
            this.authUser = null;
          },
          (error) => {
//
console.log(error);
//
            this.inAuthProcess = false;

            if (error.response) {
//
console.log('Client error...');
//
              this.authStatus = error.response.status;
              this.authAlerts = error.response.data.message;
            } else {
//
console.log('Network error...');
//
              this.authStatus = 503;
              this.authAlerts = 'Connection refused';
            }
          }
        );
      }
    },
  },
});