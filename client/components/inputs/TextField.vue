<template>
  <ValidationProvider
    :vid="vid"
    :name="$attrs.label"
    :rules="rules"
  >
    <v-text-field
      v-model="value"
      v-bind="$attrs"
      v-on="$listeners"
      :error-messages="errors"
      :success="valid"
      slot-scope="{ errors, valid }"
    />
  </ValidationProvider>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ValidationProvider } from 'vee-validate';

@Component({
  components: {
    ValidationProvider,
  },
})
export default class TextField extends Vue {
  @Prop({ type: String, required: true }) rules: string;
  @Prop({ type: String, required: false }) vid: string;

  value: string = '';
}
</script>
