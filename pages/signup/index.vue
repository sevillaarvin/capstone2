<template>
  <v-layout
    fill-height
    align-center>
    <v-flex
      xs12
      sm8
      offset-sm2
      md6
      offset-md3
      lg4
      offset-lg4>
      <v-card>
        <v-card-title
          class="justify-center">
          <h1>Sign-up</h1>
        </v-card-title>
        <v-form
          @submit.prevent="onSubmit">
          <v-container>
            <v-layout
              row
              wrap>
              <v-flex
                xs12
                sm6>
                <v-text-field
                  v-model="user.firstName"
                  type="text"
                  label="First Name"/>
              </v-flex>
              <v-flex
                xs12
                sm6>
                <v-text-field
                  v-model="user.lastName"
                  type="text"
                  label="Last Name"/>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  v-model="user.username"
                  browser-autocomplete="username"
                  type="text"
                  label="Username"/>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  v-model="user.email"
                  type="email"
                  label="Email"/>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  v-model="user.password"
                  browser-autocomplete="new-password"
                  type="password"
                  label="Password" />
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  v-model="user.confirmPassword"
                  browser-autocomplete="new-password"
                  type="password"
                  label="Confirm Password" />
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-btn
                  block
                  type="submit">
                  Submit
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      top>
      {{ snackbarMessage }}
    </v-snackbar>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        },
        snackbar: false,
        snackbarMessage: "",
        snackbarColor: "",
      }
    },
    created() {
      if (this.$auth.$state.loggedIn) {
        this.$router.replace("/dashboard")
      }
    },
    methods: {
      async onSubmit() {
        const { confirmPassword, ...user } = this.user
        try {
          await this.$store.dispatch("signUpUser", user)
          // this.$router.push("/signin")
          this.$auth.loginWith("local", {
            data: {
              username: user.username,
              password: user.password,
            },
          })
          this.showSnackbar("Signed up successfully", "success")
        } catch(e) {
          this.showSnackbar("Something went wrong", "error")
        }
      },
      showSnackbar(message, color) {
        this.snackbarMessage = message
        this.snackbarColor = color
        this.snackbar = true
      },
    }
  }
</script>

<style>
</style>
