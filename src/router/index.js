import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue';
import Scan from '../views/Scan.vue';
import Categories from '../views/Categories.vue';
import Events from '../views/Events.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import Orders from "../views/Orders";
import AddEvent from "../views/AddEvent";
import Account from "../views/Account";
import Plats from "../views/Plats";
import Shop from "../views/Shop";

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
    path: '/event/:id/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/event/:id/categories/:libelle',
    name: 'Plats',
    component: Plats
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
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
