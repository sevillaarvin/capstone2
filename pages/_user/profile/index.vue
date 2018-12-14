<template>
  <v-layout>
    <v-flex
      xs12>
      <v-container
        fluid>
        <Title
          title="Profile" />
        <v-layout>
          <v-flex
            xs12>
            <v-form
              @submit.prevent="updateMember">
              <v-card>
                <v-card-text>
                  <v-container
                    fluid>
                    <v-layout>
                      <v-flex
                        xs12>
                        <v-form>
                          <v-text-field
                            v-model="currentUser.firstName"
                            label="First Name" />
                          <v-text-field
                            v-model="currentUser.lastName"
                            label="Last Name" />
                          <v-text-field
                            v-model="currentUser.gender"
                            label="Gender" />
                          <v-text-field
                            v-model="currentUser.email"
                            label="Email" />
                          <v-text-field
                            v-model="currentUser.username"
                            label="Username" />
                          <v-text-field
                            v-model="currentUser.birthdate"
                            label="Birthdate" />
                          <v-text-field
                            v-model="currentUser.address"
                            label="Address" />
                        </v-form>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
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
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-actions>
              </v-card>
            </v-form>
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
          this.updateResult = "User updated"
          this.snackbarColor = "success"
        } catch (e) {
          console.log(e)
          this.updateResult = "Something went wrong"
          this.snackbarColor = "error"
        }
        this.snackbar = true
      }
    },
    layout: "user"
  }
</script>

<style>
</style>
