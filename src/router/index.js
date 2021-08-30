import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue';
import Scan from '../views/Scan.vue';
import Categorie from '../views/Categorie.vue';
import Event from '../views/Event.vue';
import Shop from '../views/Shop.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import Order from "../views/Order";
import AddEvent from "../views/AddEvent";

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/scan',
    name: 'Scan',
    component: Scan
  },
  {
    path: '/categorie',
    name: 'Categorie',
    component: Categorie
  },
  {
    path: '/event',
    name: 'Event',
    component: Event
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/add-event',
    name: 'AddEvent',
    component: AddEvent
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
