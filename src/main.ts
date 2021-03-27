import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Fieldset from 'primevue/fieldset';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';

import 'modern-normalize/modern-normalize.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/saga-blue/theme.css';

const app = createApp(App);

app.use(PrimeVue);

app.component('Fieldset', Fieldset);
app.component('Menubar', Menubar);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('InputMask', InputMask);

app.mount('#app');
