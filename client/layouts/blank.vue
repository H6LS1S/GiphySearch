<template>
  <v-app>
    <v-layout justify-center row wrap fill-height>
      <v-flex xs4 class="primary text-xs-center pa-5">
        <v-layout align-center row wrap fill-height>
          <v-flex xs12>
            <v-card dark flat color="transparent">
              <v-card-title primary-title class="display-1 font-weight-black">
                <span v-if="getFlowType()">Hello Friend</span>
                <span v-else>Welcome Back!</span>
              </v-card-title>
              <v-card-text class="subheading">
                <span v-if="getFlowType()">
                  Enter your personal details and start journey with us
                </span>
                <span v-else>
                  To keep connected with us, please login with your personal
                  info
                </span>
              </v-card-text>
              <v-btn
                :to="getFlowType() ?'/signup': '/signin'" exact
                outlined block
              >
                Next :3
              </v-btn>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs8>
        <v-layout align-center justify-center row wrap fill-height>
          <v-flex xs6>
            <v-content>
              <nuxt />
            </v-content>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class BlankLayuot extends Vue {
  getFlowType() {
    return this.$route.name === 'signin';
  }
}
</script>
