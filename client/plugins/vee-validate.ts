import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';

Vue.use(VeeValidate, { mode: 'eager', inject: true, delay: 2 });
