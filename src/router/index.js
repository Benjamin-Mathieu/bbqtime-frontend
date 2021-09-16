import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue';
import Scan from '../views/Scan.vue';
import Categories from '../views/Categories.vue';
import Events from '../views/Events.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import Orders from "../views/Orders.vue";
import AddEvent from "../views/AddEvent.vue";
import Account from "../views/Account.vue";
import Plats from "../views/Plats.vue";
import Shop from "../views/Shop.vue";
import MyEvents from "../views/MyEvents.vue";
import MyEventDetails from "../views/MyEventDetails.vue";
import Settings from "../views/Settings.vue";

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
    path: '/event/:id/categorie/:idCategorie',
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
    name: 'Orders',
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
  },
  {
    path: '/my-events',
    name: 'MyEvents',
    component: MyEvents
  },
  {
    path: '/my-events/:id',
    name: 'MyEventDetails',
    component: MyEventDetails
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
