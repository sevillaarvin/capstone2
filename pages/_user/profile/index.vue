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
                      xs12
                      sm6>
                      <v-text-field
                        v-model="currentUser.username"
                        label="Username" />
                    </v-flex>
                    <v-flex
                      xs12
                      sm6>
                      <v-text-field
                        v-model="currentUser.email"
                        label="Email" />
                    </v-flex>
                    <v-flex
                      xs12
                      sm6
                      md4>
                      <v-menu
                        v-model="menu">
                        <v-text-field
                          slot="activator"
                          v-model="currentUser.birthdate"
                          readonly
                          label="Birthdate" />
                        <v-date-picker
                          v-model="currentUser.birthdate"
                          no-title
                          @input="menu = false" />
                      </v-menu>
                    </v-flex>
                    <v-flex
                      xs12
                      md8>
                      <v-text-field
                        v-model="currentUser.address"
                        label="Address" />
                    </v-flex>
                    <v-flex
                      xs12>
                      <v-card-actions
                        class="justify-space-between">
                        <v-btn
                          type="submit"
                          color="secondary">
                          Update
                        </v-btn>
                        <v-dialog
                          v-model="dialog"
                          max-width="500px">
                          <v-btn
                            slot="activator"
                            color="error">
                            Deactivate
                          </v-btn>
                          <v-card>
                            <v-card-title
                              primary-title
                              class="title">
                              Deactivate account
                            </v-card-title>
                            <v-card-text>
                              You are about to deactivate your account. Are you sure?
                            </v-card-text>
                            <v-card-actions>
                              <v-btn
                                color="error"
                                @click="deactivateUser">
                                Deactivate
                              </v-btn>
                              <v-btn
                                @click="dialog = false">
                                Cancel
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-card-actions>
                    </v-flex>
                  </v-layout>
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

        const currentUser = { ...store.getters.userDetails }

        return {
          currentUser,
          snackbar: false,
          snackbarColor: "",
          updateResult: "",
          menu: false,
          dialog: false,
        }
      } catch (e) {
        error(e)
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
          this.$router.push("/signout")
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
