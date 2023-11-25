import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Header from './components/Header.vue'
import Main from "./components/Main.vue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
// import '@ant-design/icons-vue';

const app = createApp(Header);
app.use(Antd).mount('#app')
