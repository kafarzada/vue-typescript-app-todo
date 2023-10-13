import { createApp } from 'vue';
import App from './App.vue';

// eslint-disable-next-line import/no-extraneous-dependencies, import/order
import { createAuth0 } from '@auth0/auth0-vue';

import router from './router';

const app = createApp(App).use(router);

app.use(
    createAuth0({
        domain: 'dev-rpj01nwxdw834qzs.us.auth0.com',
        clientId: 'yNsdLkDNOQVJjihu4ezwQynDywRcyf3i',
        authorizationParams: {
            redirect_uri: window.location.origin,
        },
    }),
);

app.mount('#app');
