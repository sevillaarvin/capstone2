<template>
  <v-layout
    justify-center>
    <v-flex
      xs12
      sm8
      md6
      lg4>
      <v-form>
        <v-text-field
          v-model="search"
          solo
          placeholder="Search"/>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        search: "",
      }
    },
    watch: {
      search(searchTerm) {
        try {
          this.$store.dispatch("store/setSearchItems", { searchTerm })
        } catch (e) {
          console.error("SearchBar", "Something went wrong")
        }
      }
    },
  }
</script>
