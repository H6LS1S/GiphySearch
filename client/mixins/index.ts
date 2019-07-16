import Vue from 'vue';

Vue.mixin({
  methods: {
    toFormatDate(date: Date) {
      return new Date(date).toLocaleDateString('en-EN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
});
