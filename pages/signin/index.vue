<template>
  <v-layout>
    <v-flex
      xs12
      sm8
      offset-sm2
      md6
      offset-md3
      lg4
      offset-lg4>
      <v-card>
        <v-card-title
          class="justify-center">
          <h1>Sign-in</h1>
        </v-card-title>
        <v-form>
          <v-container>
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  type="text"
                  label="Username"/>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  type="password"
                  label="Password" />
              </v-flex>
            </v-layout>
            <v-layout
              row
              wrap>
              <v-flex xs12>
                <v-card-actions>
                  <v-checkbox
                    label="Remember me?" />
                  <v-spacer />
                  <v-btn
                    flat>
                    Forgot Password?
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-btn
                  block>
                  Submit
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {}
</script>

<style>
</style>
