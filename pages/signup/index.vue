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
                  type="password"
                  label="Password" />
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  v-model="user.confirmPassword"
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
        }
      }
    },
    created() {
      if (this.$auth.$state.loggedIn) {
        this.$router.replace("/dashboard")
      }
    },
    methods: {
      onSubmit() {
        const { confirmPassword, ...user } = this.user
        this.$store.dispatch("signUpUser", user)
        .then(res => {
          this.$router.push("/signin")
        })
        .catch(e => {
        })
      }
    }
  }
</script>

<style>
</style>
