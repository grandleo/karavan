'use client'

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: '2311',
    cluster: 'eu',
    wsHost: 'api.apteka.grand',
    // host: 'api.apteka.grand',
    wsPort: 6001,
    auth: {
        headers: {
            Authorization: `Bearer 2|rqvus3hhoRAVv00VUJiIeerj2ErLS0priRTZMC8w`,
            Accept: 'application/json'
        },
    },
    transports: ['websocket'],
    disableStats: true,
    enabledTransports: ['ws'],
    forceTLS: false,
});

export default echo;