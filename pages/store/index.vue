<template>
  <v-container
    fluid
    class="cont">
    <v-dialog>
      <v-btn slot="activator">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-card>
        TEST
        <v-divider />
        HMMM
      </v-card>
    </v-dialog>
    <v-layout
      class="lay">
      <v-flex
        xs6
        class="fle">
        Store page
      </v-flex>
      <v-flex
        xs6
        class="fle">
        <v-container
          fluid
          class="cont">
          <v-layout
            class="lay">
            <v-flex class="fle">
              Store page
            </v-flex>
            <v-flex class="fle">
              Store page
            </v-flex>
            <v-flex class="fle">
              Store page
            </v-flex>
          </v-layout>
          <v-layout
            class="lay">
            <v-flex class="fle">
              Store page
            </v-flex>
            <v-flex class="fle">
              Store page
            </v-flex>
            <v-flex class="fle">
              Store page
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap>
      <v-flex xs12>
        <v-carousel
          :cycle="false">
          <v-carousel-item
            key="http://cdn.vuetifyjs.com/images/logos/v-alt.svg"
            :src="src">
            <div class="title pa-3">Title</div>
          </v-carousel-item>
          <v-carousel-item
            key="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
            src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg">
            <div class="title">Title</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
      <v-flex xs1>
        <v-card>
          <v-img
            contain
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" />
          <v-card-title class="red--text text--darken-4">
            Test
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <input
          type="file"
          accept="video/*"
          @change="onFile">
        <v-text-field label="Test"/>
        <v-date-picker v-model="date"/>
        <p>{{ date }}</p>
        <v-time-picker v-model="time"/>
        <p>{{ time }}</p>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <v-alert
          :value="true"
          dismissible
          type="warning">
          This is alert
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <v-progress-circular
          indeterminate/>
        <v-progress-linear
          indeterminate/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        date: "",
        time: "",
        src: "https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
      }
    },
    layout: "store",
    methods: {
      onFile(e) {
        const files = e.target.files
        const file = files[0]
        const fileReader = new FileReader()
        console.log('onfile')
        fileReader.addEventListener("load", () => {
          this.src = fileReader.result
          console.log(this.src)
        })
        fileReader.readAsDataURL(file)
      }
    }
  }
</script>

<style scoped>
.cont {
}

.lay {
  background-color: orange;
}

.fle {
  background-color: yellow;
  border: 1px solid black;
}

.title {
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
