<template>
  <ValidationObserver
    v-slot="{ invalid }"
    ref="observer"
    tag="form"
    @submit.prevent="singIn()"
  >
    <TextField
      v-model="email"
      type="email"
      rules="required|email"
      outlined
      autofocus
      label="Email"
      autocomplete="email"
      prepend-icon="mdi-email-outline"
    />
    <TextField
      v-model="password"
      :type="show1 ? 'text' : 'password'"
      :append-icon="changeVisibility(show1)"
      rules="required"
      vid="confirm"
      outlined
      counter
      label="Password"
      autocomplete="current-password"
      prepend-icon="mdi-lock-outline"
      @click:append="show1 = !show1"
    />

    <v-btn :disabled="invalid" color="primary" block @click="singIn">
      Sign in
    </v-btn>

    <v-flex pt-2>
      <v-alert
        v-if="error"
        icon="mdi-shield-lock-outline"
        outlined
        type="error"
      >
        Error: Unauthorized
      </v-alert>
    </v-flex>
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
  error: boolean = false;

  changeVisibility(condition) {
    if (condition) {
      return 'mdi-eye-outline';
    }

    return 'mdi-eye-off-outline';
  }

  async singIn() {
    const validation = await this.$refs.observer.validate();
    if (!validation) return;
    try {
      await this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password,
        },
      });

      this.$router.push('/');
    } catch (err) {
      this.error = err;
    }
  }
}
</script>
