<template>
  <v-btn v-bind="page.attr" dark icon class="mx-3">
    <v-icon v-html="page.icon" />
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component()
export default class PageLink extends Vue {
  @Prop({ type: Object, required: true }) page: object;
}
</script>
