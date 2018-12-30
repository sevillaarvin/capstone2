<template>
  <v-layout
    justify-center>
    <v-flex
      :sm8="!drawer"
      :md6="!drawer"
      :lg4="!drawer"
      xs12>
      <v-form>
        <v-text-field
          v-model="search"
          :solo="!drawer"
          :box="drawer"
          append-icon="search"
          placeholder="Search"/>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      drawer: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        search: "",
      }
    },
    watch: {
      search(searchTerm) {
        try {
          const { category } = this.$route.params || {}
          this.$store.dispatch("store/setSearchItems", { searchTerm, category })
        } catch (e) {
          console.error("SearchBar", "Something went wrong")
        }
      }
    },
  }
</script>
