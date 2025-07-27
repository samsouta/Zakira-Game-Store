import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import Cookies from 'js-cookie';

window.Pusher = Pusher;
const token = Cookies.get('token');
const echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: 'mt1', // can be anything
  wsHost: import.meta.env.VITE_PUSHER_HOST,
  wsPort: Number(import.meta.env.VITE_PUSHER_PORT),
  forceTLS: false,
  disableStats: true,
  enabledTransports: ['ws'],
  authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
  auth: {
    headers: {
      'Authorization': `Bearer ${token}`,
      // 'Accept': 'application/json',
    },
  },
  // auth: {
        // headers: {
        //     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        //     'Accept': 'application/json',
        // },
  //   },
});

export default echo;

