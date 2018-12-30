<template>
  <v-layout>
    <v-flex
      xs12>
      <v-container>
        <Title
          title="Profile" />
        <v-layout>
          <v-flex
            xs12>
            <v-card>
              <v-form
                @submit.prevent="updateMember">
                <v-container>
                  <v-layout
                    row
                    wrap>
                    <v-flex
                      xs12
                      sm6>
                      <v-text-field
                        v-model="currentUser.firstName"
                        type="text"
                        label="First Name" />
                    </v-flex>
                    <v-flex
                      xs12
                      sm6>
                      <v-text-field
                        v-model="currentUser.lastName"
                        type="text"
                        label="Last Name" />
                    </v-flex>
                    <v-flex
                      xs12>
                      <v-select
                        v-model="currentUser.gender"
                        :items="genders"
                        label="Gender" />
                    </v-flex>
                    <v-flex
                      xs12>
                      <v-text-field
                        v-model="currentUser.email"
                        label="Email" />
                    </v-flex>
                    <v-flex
                      xs12>
                      <v-text-field
                        v-model="currentUser.username"
                        label="Username" />
                    </v-flex>
                    <v-flex
                      xs12>
                      <v-text-field
                        v-model="currentUser.birthdate"
                        label="Birthdate" />
                    </v-flex>
                    <v-flex
                      xs12>
                      <v-text-field
                        v-model="currentUser.address"
                        label="Address" />
                    </v-flex>
                  </v-layout>
                  <v-card-actions>
                    <v-container
                      fluid>
                      <v-layout>
                        <v-flex
                          xs12>
                          <v-btn
                            type="submit">
                            Update
                          </v-btn>
                          <v-btn
                            color="error"
                            @click="deactivateUser">
                            Deactivate
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-actions>
                </v-container>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
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
    async asyncData({ error, store }) {
      try {
        await store.dispatch("setUserDetails")
      } catch (e) {
        error(e)
      }

      return {
        currentUser: { ...store.getters.userDetails },
        snackbar: false,
        snackbarColor: "",
        updateResult: "",
      }
    },
    components: {
      Title
    },
    computed: {
      genders() {
        return this.$store.getters["user/genders"]
      },
    },
    methods: {
      async updateMember() {
        try {
          await this.$store.dispatch("updateUserDetails", this.currentUser)
          await this.loadUserDetails()
          this.showSnackbar("User updated", "success")
        } catch (e) {
          this.showSnackbar("Something went wrong", "error")
        }
      },
      async loadUserDetails() {
        try {
          await this.$store.dispatch("setUserDetails")
        } catch (e) {
          this.showSnackbar("Something went wrong", "error")
        }
      },
      showSnackbar(message, color) {
        this.updateResult = message
        this.snackbarColor = color
        this.snackbar = true
      },
      async deactivateUser() {
        try {
          const { id } = this.currentUser
          await this.$store.dispatch("updateUserDetails", { id, deactivated: true })
          this.showSnackbar("User updated", "success")
        } catch (e) {
          this.showSnackbar("Something went wrong", "error")
        }
      }
    },
    layout: "user"
  }
</script>

<style>
</style>
