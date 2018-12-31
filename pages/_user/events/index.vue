<template>
  <v-layout>
    <v-flex
      xs12>
      <v-container
        fluid>
        <Title
          title="Events" />
        <v-layout>
          <v-flex
            xs12>
            <v-data-table
              :headers="headers"
              :items="events">
              <template
                slot="items"
                slot-scope="{ item }">
                <td> {{ item.id }}</td>
              </template>
              <template
                slot="no-data">
                <v-alert
                  :value="true"
                  color="info">
                  <v-icon
                    class="v-alert__icon"
                    @click="$router.push('/events')">
                    event_note
                  </v-icon>
                  You have no registered events.
                </v-alert>
              </template>
            </v-data-table>
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
    data() {
      return {
        dialog: false,
        headers: [
          {
            text: "ID",
            value: "id",
          },
        ]
      }
    },
    computed: {
      events() {
        return []
      },
    },
    methods: {
    },
    layout: "user"
  }
</script>

<style>
</style>
