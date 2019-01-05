<template>
  <v-layout>
    <v-flex
      xs12>
      <v-container>
        <v-card>
          <Title
            title="Profile" />
          <v-layout>
            <v-flex
              xs12>
              <v-form
                @submit.prevent="updateMember">
                <v-card-text>
                  <v-text-field
                    v-model="currentUser.firstName"
                    color="secondary"
                    label="First Name" />
                  <v-text-field
                    v-model="currentUser.lastName"
                    color="secondary"
                    label="Last Name" />
                  <v-text-field
                    v-model="currentUser.gender"
                    color="secondary"
                    label="Gender" />
                  <v-text-field
                    v-model="currentUser.email"
                    color="secondary"
                    label="Email" />
                  <v-text-field
                    v-model="currentUser.username"
                    color="secondary"
                    label="Username" />
                  <v-text-field
                    v-model="currentUser.birthdate"
                    color="secondary"
                    label="Birthdate" />
                  <v-text-field
                    v-model="currentUser.address"
                    color="secondary"
                    label="Address" />
                </v-card-text>
                <v-divider />
                <v-card-text>
                  <v-text-field
                    v-model="currentUser.password"
                    color="secondary"
                    type="password"
                    label="Current Password" />
                  <v-text-field
                    v-model="currentUser.newPassword"
                    color="secondary"
                    type="password"
                    label="New Password" />
                  <v-text-field
                    v-model="currentUser.confirmPassword"
                    color="secondary"
                    type="password"
                    label="Confirm Password" />
                </v-card-text>
                <v-card-actions>
                  <v-container
                    fluid>
                    <v-layout>
                      <v-flex
                        xs12>
                        <v-btn
                          color="secondary"
                          type="submit">
                          Update
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-actions>
              </v-form>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      top>
      {{ updateResult }}
    </v-snackbar>
  </v-layout>
</template>

<script>
  import Title from "~/components/TheTitle"

  export default {
    async asyncData(context) {
      try {
        await context.store.dispatch("setUserDetails")
      } catch (e) {
        context.error(e)
      }

      return {
        currentUser: context.store.getters.userDetails,
        snackbar: false,
        snackbarColor: "",
        updateResult: "",
      }
    },
    components: {
      Title
    },
    methods: {
      async updateMember() {
        try {
          await this.$store.dispatch("updateUserDetails", this.currentUser)
          await this.loadUserDetails()
          this.showSnackbar("User updated", "success")
        } catch (e) {
          console.log(e)
          this.showSnackbar("Something went wrong", "error")
        }
      },
      async loadUserDetails() {
        try {
          await context.store.dispatch("setUserDetails")
        } catch (e) {
          this.showSnackbar("Something went wrong", "error")
        }
      },
      showSnackbar(message, color) {
        this.updateResult = message
        this.snackbarColor = color
        this.snackbar = true
      },
    },
    layout: "admin"
  }
</script>

<style>
</style>
