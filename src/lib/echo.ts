import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import Cookies from 'js-cookie';

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

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
  enabledTransports: ['ws', 'wss'],
  authEndpoint: import.meta.env.VITE_AUTH_ENDPOINT,
  auth: {
    headers: {
      'Authorization': `Bearer ${token}`,
      // 'Accept': 'application/json',
    },
  },
});

export default echo;

