<template>
  <v-layout>
    <v-flex xs12>
      <v-container
        fluid>
        <Title :title="'Members'" />
        <v-layout>
          <v-flex xs12>
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
              v-model="dialog"
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
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  import Title from "~/components/TheTitle"

  export default {
    components: {
      Title
    },
    async asyncData(context) {
      let roles
      try {
        await context.store.dispatch("setAdminMembers")
        roles = await context.app.$axios.$get("/role")
      } catch (e) {
        context.error(e)
        return
      }

      return {
        dialog: false,
        currentMember: {},
        roles,
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
        return this.$store.getters.adminMembers
      },
      roleNames() {
        return this.roles.map(role => role.name)
      },
    },
    methods: {
      selectMember(member) {
        this.currentMember = member
        this.dialog = true
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
          await this.$store.dispatch("setAdminMembers")
        } catch (e) {
          console.log(e)
        }
      },
    },
    layout: "user",
  }
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
