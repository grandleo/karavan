import Echo from "laravel-echo";
window.Pusher = require("pusher-js");

const echoConfig = {
    broadcaster: 'pusher',
    key: '2311',
    cluster: 'eu',
    encrypted: false,
    forceTLS: false,
    wsPort: 6001,
    wsHost: 'api.immunoteka.ru',
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