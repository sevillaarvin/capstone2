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
                      label="First Name"/>
                    <v-text-field
                      v-model="newMember.lastName"
                      label="Last Name"/>
                    <v-text-field
                      v-model="newMember.username"
                      label="Username"/>
                    <v-text-field
                      v-model="newMember.email"
                      label="Email"/>
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
                @click="createMember">Save</v-btn>
            </v-card-actions>
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
            <td>{{ item.username }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.created_at | long-date }}</td>
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
                    v-model="currentMember.role"
                    label="Role" />
                  <v-text-field
                    v-model="currentMember.firstName"
                    label="First Name"/>
                  <v-text-field
                    v-model="currentMember.lastName"
                    label="Last Name"/>
                  <v-text-field
                    v-model="currentMember.username"
                    label="Username"/>
                  <v-text-field
                    v-model="currentMember.email"
                    label="Email"/>
                  <!-- TODO: Add birthdate -->
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
  </v-layout>
</template>

<script>
  import Title from "~/components/TheTitle"

  export default {
    components: {
      Title
    },
    async asyncData({ error, store }) {
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
        newMember: {},
        currentMember: {},
        headers: [
          {
            text: "ID",
            value: "id",
          },
          {
            text: "Role",
            value: "role",
          },
          {
            text: "First Name",
            value: "firstName",
          },
          {
            text: "Last Name",
            value: "lastName",
          },
          {
            text: "Username",
            value: "username",
          },
          {
            text: "Email",
            value: "email",
          },
          {
            text: "Created Date",
            value: "created_at",
          },
        ]
      }
    },
    computed: {
      members() {
        return this.$store.getters["admin/members"]
      },
      roleNames() {
        return this.$store.getters["admin/roles"]
          .map(role => role.name)
      },
    },
    methods: {
      async createMember() {
        const { role: roleName, ...member } = this.newMember
        const role_id = this.$store.getters["admin/roles"].find(role => role.name === roleName).id
        let result

        try { result = await this.$axios.$post("/member", {
            role_id,
            ...member
          })
        } catch (e) {
          console.log(e)
        }
        console.log(result)
      },
      dismissCreate() {
        this.dialog.new = false
        this.newMember = {}
      },
      selectMember(member) {
        this.currentMember = member
        this.dialog.edit = true
      },
      async updateMember() {
        const {
          id,
          role: roleName,
          firstName,
          lastName,
          username,
          email
        } = this.currentMember
        const role_id = this.roles.find(role => role.name === roleName).id

        try {
          await this.$axios.$patch("/member", {
            id,
            role_id,
            firstName,
            lastName,
            username,
            email
          })
        } catch (e) {
          console.log(e)
        }
      },
      async deleteMember() {
        const { id } = this.currentMember
        try {
          const data = await this.$axios.$delete("/member/" + id)
        } catch (e) {
          console.log(e)
        }
        // TODO: Optimize this
        try {
          await this.$store.dispatch("admin/setMembers")
        } catch (e) {
          console.log(e)
        }
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