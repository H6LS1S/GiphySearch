<template>
  <ValidationObserver
    v-slot="{ invalid }"
    ref="observer"
    tag="form"
    @submit.prevent="singUp()"
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
      rules="required|min:8"
      vid="confirm"
      outlined
      counter
      label="Password"
      autocomplete="new-password"
      prepend-icon="mdi-lock-outline"
      @click:append="show1 = !show1"
    />
    <TextField
      :type="show2 ? 'text' : 'password'"
      :append-icon="changeVisibility(show2)"
      rules="required|confirmed:confirm"
      outlined
      counter
      label="Confirmed password"
      autocomplete="new-password"
      prepend-icon="mdi-lock-reset"
      @click:append="show2 = !show2"
    />

    <v-btn :disabled="invalid" color="primary" block @click="singUp">
      Sign up
    </v-btn>

    <v-flex pt-2>
      <v-alert v-if="error" icon="mdi-shield-lock-outline" outlined type="error">
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
    title: 'Sign Up',
  },
  components: {
    TextField: () => import('~/components/inputs/TextField'),
    ValidationObserver,
  },
})
export default class SignUpPage extends Vue {
  email: string = '';
  password: string = '';
  show1: boolean = false;
  show2: boolean = false;
  error: boolean = false;

  changeVisibility(condition) {
    if (condition) {
      return 'mdi-eye-outline';
    }

    return 'mdi-eye-off-outline';
  }

  async singUp() {
    const validation = await this.$refs.observer.validate();
    if (!validation) return;
    try {
      await this.$axios.post('users', {
        email: this.email,
        password: this.password,
      })

      await this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password,
        },
      })

      this.$router.push('/');
    } catch (err) {
      this.error = err;
    }
  }
}
</script>
