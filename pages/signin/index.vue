<template>
  <v-layout>
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
          <h1>Sign-in</h1>
        </v-card-title>
        <!-- TODO: Convert to snackbar -->
        <v-alert 
          v-model="showError"
          type="error"
          dismissible>
          {{ errorMessage }}
        </v-alert>
        <v-form
          @submit.prevent="onSubmit">
          <v-container>
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  v-model="user.username"
                  browser-autocomplete="username"
                  type="text"
                  label="Username or Email" />
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  v-model="user.password"
                  browser-autocomplete="current-password"
                  type="password"
                  label="Password" />
              </v-flex>
            </v-layout>
            <v-layout
              row
              wrap>
              <v-flex xs12>
                <v-card-actions>
                  <v-checkbox
                    label="Remember me?" />
                  <v-spacer />
                  <v-btn
                    flat>
                    Forgot Password?
                  </v-btn>
                </v-card-actions>
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
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          username: "",
          password: ""
        },
        showError: false,
        errorMessage: ""
      }
    },
    created() {
      if (this.$auth.$state.loggedIn) {
        this.$router.replace("/")
      }
    },
    methods: {
      async onSubmit() {
        await this.$auth.loginWith("local", {
          data: this.user
        }).catch(e => {
          const status = e.response.status
          const message = e.response.data
          if (status == 400 || status == 404) {
            this.errorMessage = message
            this.showError = true
          }
        })
      }
    }
  }
</script>

<style>
</style>
