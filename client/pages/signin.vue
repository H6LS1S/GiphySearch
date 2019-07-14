<template>
  <ValidationObserver
    v-slot="{ invalid }"
    ref="observer" tag="form"
    @submit.prevent="singup()"
  >
    <TextField
      v-model="email"
      type="email" rules="required|email"
      outlined autofocus label="Email"
      prepend-icon="mdi-email-outline"
    />
    <TextField
      v-model="password"
      :type="show1 ? 'text' : 'password'"
      :append-icon="changeVisibility(show1)"
      rules="required" vid="confirm"
      outlined counter label="Password"
      prepend-icon="mdi-lock-outline"
      @click:append="show1 = !show1"
    />

    <v-btn color="primary" block>
      Sign in
    </v-btn>
  </ValidationObserver>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ValidationObserver } from 'vee-validate';

@Component({
  layout: 'blank',
  head: {
    title: 'Sign In',
  },
  components: {
    TextField: () => import('~/components/inputs/TextField'),
    ValidationObserver,
  },
})
export default class SignInPage extends Vue {
  email: string = '';
  password: string = '';
  show1: boolean = false;

  changeVisibility(condition) {
    if (condition) {
      return 'mdi-eye-outline'
    }

    return 'mdi-eye-off-outline'
  }
}
</script>
