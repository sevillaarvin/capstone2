<template>
  <v-layout>
    <v-flex xs12>
      <v-toolbar
        flat
        color="white">
        <v-toolbar-title>
          Members
        </v-toolbar-title>
        <v-spacer />
        <v-dialog
          v-model="dialog.new"
          max-width="500px">
          <v-btn
            slot="activator"
            color="primary"
            dark
            class="mb-2">
            New Member
          </v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">New Member</span>
            </v-card-title>
            <v-form
              @submit.prevent="createMember">
              <v-card-text>
                <v-container
                  fluid>
                  <v-layout
                    wrap>
                    <v-flex
                      xs12>
                      <v-select
                        :items="roleNames"
                        v-model="newMember.role"
                        label="Role" />
                      <v-text-field
                        v-model="newMember.firstName"
                        label="First Name" />
                      <v-text-field
                        v-model="newMember.lastName"
                        label="Last Name" />
                      <v-select
                        :items="genders"
                        v-model="newMember.gender"
                        label="Gender" />
                      <v-text-field
                        v-model="newMember.username"
                        label="Username" />
                      <v-text-field
                        v-model="newMember.email"
                        label="Email" />
                      <v-text-field
                        v-model="newMember.birthdate"
                        label="Birthdate" />
                      <v-radio-group
                        v-model="newMember.deactivated"
                        row
                        label="Deactivated">
                        <v-radio
                          :value="false"
                          label="No" />
                        <v-radio
                          :value="true"
                          label="Yes" />
                      </v-radio-group>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  flat
                  @click="dismissCreate">Cancel</v-btn>
                <v-btn
                  color="blue darken-1"
                  flat
                  type="submit">Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-divider />
      <v-data-table
        :headers="headers"
        :items="members">

        <template
          slot="items"
          slot-scope="{ item }">
          <tr
            class="cursor-pointer"
            @click="selectMember(item)">
            <td>{{ item.id }}</td>
            <td>{{ item.role }}</td>
            <td>{{ item.firstName }}</td>
            <td>{{ item.lastName }}</td>
            <td>{{ item.gender }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.birthdate | long-date }}</td>
            <td>{{ item.created_at | long-date }}</td>
            <td>{{ item.deactivated ? 'Yes' : 'No' }}</td>
          </tr>
        </template>
      </v-data-table>
      <v-dialog
        v-model="dialog.edit"
        width="500">
        <v-card>
          <v-container
            fluid>
            <v-layout>
              <v-flex
                xs12>
                <v-form
                  @submit.prevent="updateMember">
                  <v-text-field
                    v-model="currentMember.id"
                    label="ID"
                    disabled />
                  <v-select
                    :items="roleNames"
                    :disabled="currentMember.id == $auth.$state.user.userId"
                    v-model="currentMember.role"
                    label="Role" />
                  <v-text-field
                    v-model="currentMember.firstName"
                    label="First Name" />
                  <v-text-field
                    v-model="currentMember.lastName"
                    label="Last Name" />
                  <v-select
                    :items="genders"
                    v-model="currentMember.gender"
                    label="Gender" />
                  <v-text-field
                    v-model="currentMember.username"
                    label="Username" />
                  <v-text-field
                    v-model="currentMember.email"
                    label="Email" />
                  <v-text-field
                    v-model="currentMember.birthdate"
                    label="Birthdate" />
                  <v-radio-group
                    v-model="currentMember.deactivated"
                    row
                    label="Deactivated">
                    <v-radio
                      :value="false"
                      label="No" />
                    <v-radio
                      :value="true"
                      label="Yes" />
                  </v-radio-group>
                  <v-card-actions>
                    <v-btn>
                      Reset Password
                    </v-btn>
                    <v-btn
                      type="submit">
                      Update
                    </v-btn>
                    <v-btn
                      color="error"
                      @click="deleteMember">
                      Delete
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
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
  import Title from "~/components/TheTitle"

  export default {
    components: {
      Title
    },
    async asyncData({
      error,
      store
    }) {
      try {
        await store.dispatch("admin/setRoles")
        await store.dispatch("admin/setMembers")
      } catch (e) {
        error(e)
      }

      return {
        dialog: {
          new: false,
          edit: false,
        },
        snackbar: false,
        snackbarMessage: "",
        snackbarColor: "",
        newMember: {},
        currentMember: {},
        headers: [{
          text: "ID",
          value: "id",
        }, {
          text: "Role",
          value: "role",
        }, {
          text: "First Name",
          value: "firstName",
        }, {
          text: "Last Name",
          value: "lastName",
        }, {
          text: "Gender",
          value: "gender",
        }, {
          text: "Username",
          value: "username",
        }, {
          text: "Email",
          value: "email",
        }, {
          text: "Birthdate",
          value: "birthdate",
        }, {
          text: "Created Date",
          value: "created_at",
        }, {
          text: "Deactivated",
          value: "deactivated",
        }]
      }
    },
    computed: {
      members() {
        return this.$store.getters["admin/members"]
      },
      roleNames() {
        return this.$store.getters["admin/roles"]
          .map((role) => role.name)
      },
      genders() {
        return this.$store.getters["member/genders"]
      },
    },
    methods: {
      async createMember() {
        try {
          await this.$store.dispatch("admin/createMember", this.newMember)
          this.showSnackbar("Member has been added", "success")
          this.loadMembers()
          this.dismissCreate()
        } catch (e) {
          this.showSnackbar("Something went wrong", "error")
        }
      },
      dismissCreate() {
        this.dialog.new = false
        this.newMember = {}
      },
      selectMember(member) {
        const {
          ...currentMember
        } = member
        this.currentMember = currentMember
        this.dialog.edit = true
      },
      loadMembers() {
        this.$store.dispatch("admin/setMembers").then()
      },
      async updateMember() {
        try {
          await this.$store.dispatch("admin/updateMember", this.currentMember)
          this.showSnackbar("Member has been updated", "success")
          this.loadMembers()
          this.dismissUpdate()
        } catch (e) {
          this.showSnackbar("Something went wrong", "error")
        }
      },
      dismissUpdate() {
        this.dialog.edit = false
        this.currentItem = {}
      },
      async deleteMember() {
        const {
          id
        } = this.currentMember

        try {
          await this.$store.dispatch("admin/deleteMember", id)
          this.showSnackbar("Item has been deleted", "success")
          this.loadMembers()
          this.dismissUpdate()
        } catch (e) {
          this.showSnackbar("Something went wrong. Make sure all transactions related to member has been removed.", "error")
        }
      },
      showSnackbar(message, color) {
        this.snackbarMessage = message
        this.snackbarColor = color
        this.snackbar = true
      },
    },
    layout: "admin",
  }
</script>

<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
</style>
