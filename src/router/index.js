import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue';
import Scan from '../views/Scan.vue';
import Categorie from '../views/Categorie.vue';
import Events from '../views/Events.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import Orders from "../views/Orders";
import AddEvent from "../views/AddEvent";
import Account from "../views/Account";

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
    path: '/events',
    name: 'Events',
    component: Events
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
    path: '/orders',
    name: 'Order',
    component: Orders
  },
  {
    path: '/add-event',
    name: 'AddEvent',
    component: AddEvent
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
