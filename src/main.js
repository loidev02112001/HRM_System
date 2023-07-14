import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from 'vue-query';
import Antd from 'ant-design-vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import router from '@/router/routes';
import './assets/scss/globalStyle.scss';

const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  }
};
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(Antd)
app.use(VueQueryPlugin, vueQueryPluginOptions);
app.mount('#app');
