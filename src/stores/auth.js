import { defineStore } from "pinia";
import axios from "axios";
// import { useRouter } from 'vue-router'

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
    authErrors: {},
    authAlerts: null,
    authStatus: null,
  }),
  getters: {
    user: (state) => state.authUser,
    errors: (state) => state.authErrors,
    alerts: (state) => state.authAlerts,
    status: (state) => state.authStatus,
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
//     async getUser() {
// await this.getToken();
//       const data = await axios.get("/api/user");
//       this.authUser = data.data;
//     },
    async handleLogin(data) {
      this.clear();
//
console.log('Login...');
//
      try {
        const response = await axios.post("/login", {
          email: data.email,
          password: data.password
        });
//
console.log(response);
//
        this.authStatus = response.status;
//
console.log(this.authStatus);
//
        this.authUser = response.data.user;
        sessionStorage.setItem('session_token', response.data.session_token);
        if (data.remember) this.setCookie('remember_token', response.data.remember_token, 30);
      } catch (error) {
//
console.log(error);
//
        this.authStatus = error.response.status;
        if (error.response.status == 401) {
          this.authAlerts = error.response.data.message;
        } else {
          this.authErrors = error.response.data.errors;
        }
//
console.log(this.status);
console.log(this.alerts);
console.log(this.errors);
//
      }
    },
    async handleRegister(data) {
//
console.log('Registring...');
//
      this.clear();
      try {
        const response = await axios.post("/register", {
          name: data.name,
          email: data.email,
          password: data.password,
        });
//
console.log(response);
//
        this.authAlerts = response.data.message;
        this.authStatus = response.status;
//
console.log(this.alerts);
console.log(this.status);
//
      } catch (error) {
//
console.log(error);
//
        this.authStatus = error.response.status;
        this.authErrors = error.response.data.errors;
//
console.log(this.status);
console.log(this.errors);
//
      }
    },
    async handleLogout() {
//
console.log('Logout...');
//
      this.clear();
      let token = sessionStorage.getItem('session_token');
      if (token) {
        try{
          let options = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
          const response = await axios.post("/logout", null, options);
//
console.log(response);
//
          this.authStatus = response.status;
          this.authAlerts = response.data.message;
          
          this.authUser = null;
          sessionStorage.removeItem('session_token');
          this.removeCookie('remember_token');
        } catch(error) {
//
console.log(error);
//
          this.authStatus = error.response.status;
          this.authAlerts = error.response.data.message;
        }
      }
    },
//     async handleForgotPassword(email) {
//       this.authErrors = [];
//  this.getToken();
//       try {
//         const response = await axios.post("/forgot-password", {
//           email: email,
//         });
//         this.authStatus = response.data.status;
//       } catch (error) {
//         if (error.response.status === 422) {
//           this.authErrors = error.response.data.errors;
//         }
//       }
//     },
    // async handleResetPassword(resetData) {
    //   this.authErrors = [];
    //   try {
    //     const response = await axios.post("/reset-password", resetData);
    //     this.authStatus = response.data.status;
    //   } catch (error) {
    //     if (error.response.status === 422) {
    //       this.authErrors = error.response.data.errors;
    //     }
    //   }
    // },
  },
});