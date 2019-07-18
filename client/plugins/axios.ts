const routingRedirection = {
  503: '/',
  500: '/',
  409: '/',
  404: '/',
  401: '/signin',
};

export default function({ $axios, store, redirect }) {
  $axios.onError(error => {
    const { status } = error.response;
    redirect(routingRedirection[status]);
  });
}
