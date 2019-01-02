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
                <v-container>
                  <v-layout
                    row
                    wrap>
                    <v-flex
                      xs12
                      class="text-xs-center">
                      <v-avatar
                        v-if="imageUrl"
                        size="100"
                        @click="onPickFile">
                        <v-img
                          :src="imageUrl"
                          class="cursor-pointer" />
                      </v-avatar>
                      <v-avatar
                        v-else
                        size="100">
                        <v-icon
                          size="100"
                          @click="onPickFile">
                          account_circle
                        </v-icon>
                      </v-avatar>
                      <input
                        ref="fileInput"
                        type="file"
                        style="display: none"
                        accept="image/*"
                        @change="onFilePicked">
                    </v-flex>
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
    async asyncData({ error, store }) {
      try {
        await store.dispatch("setUserDetails")

        const currentUser = { ...store.getters.userDetails }
        const { avatar } = store.getters.userInfo

        return {
          currentUser,
          snackbar: false,
          snackbarColor: "",
          updateResult: "",
          menu: false,
          dialog: false,
          imageUrl: avatar,
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
        return this.$store.getters["member/genders"]
      },
    },
    methods: {
      async updateMember() {
        try {
          const avatar = this.imageUrl 
          await this.$store.dispatch("updateUserDetails", { avatar, ...this.currentUser })
          await this.loadUserDetails()
          this.showSnackbar("User updated", "success")
        } catch (e) {
          if (e.response.status === 413) {
            this.showSnackbar("Image too large, please select a smaller file", "error")
            return
          }
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
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        if (files.length === 0) {
          return
        }
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          // BUG: Doesn't allow currentUser.avatar modification
          // Will not dynamically update images in template above
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      },
    },
    layout: "user"
  }
</script>

<style
  scoped>
  .cursor-pointer {
    cursor: pointer;
  }
</style>
