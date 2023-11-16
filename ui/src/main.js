import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Header from './components/Header.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(Header);
app.use(Antd).mount('#app')
