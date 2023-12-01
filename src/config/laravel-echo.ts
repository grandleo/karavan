import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
    interface Window {
        Pusher: typeof Pusher;
    }
}

window.Pusher = require("pusher-js");

const echoConfig = {
    broadcaster: 'pusher',
    key: process.env.NEXT_PUBLIC_WEBSOCKET_KEY,
    cluster: process.env.NEXT_PUBLIC_WEBSOCKET_CLUSTER,
    encrypted: false,
    forceTLS: false,
    wsPort: 6001,
    wsHost: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
    // Дополнительные настройки, если нужно
    // authEndpoint: '/broadcasting/auth',
    // auth: {
    //   headers: {
    //     Authorization: `Bearer ${YOUR_AUTH_TOKEN}`,
    //   },
    // },
};

const echo = new Echo(echoConfig);

export default echo;