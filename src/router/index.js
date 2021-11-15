import { createRouter, createWebHistory } from '@ionic/vue-router';
import store from "../store/store";

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/scan',
    name: 'Scan',
    component: () => import('@/views/Scan.vue')
  },
  {
    path: '/event/:id/categories',
    name: 'Categories',
    component: () => import('@/views/Categories.vue')
  },
  {
    path: '/event/:id/categorie/:idCategorie',
    name: 'Plats',
    component: () => import('@/views/Plats.vue')
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('@/views/Events.vue')
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('@/views/SignIn.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.getLoginStatus) {
        next(false);
      } else {
        next();
      }
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/Orders.vue')
  },
  {
    path: '/add-event',
    name: 'AddEvent',
    component: () => import('@/views/AddEvent.vue'),
    beforeEnter: (to, from, next) => {
      if (Object.keys(store.state.events.eventTmp).length > 0) {
        store.commit("setEventTmp", {});
        next();
      } else {
        next();
      }
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/views/Account.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/views/Shop.vue')
  },
  {
    path: '/my-events',
    name: 'MyEvents',
    component: () => import('@/views/MyEvents.vue')
  },
  {
    path: '/manage-event/:id/budget',
    name: 'MyEventDetails',
    component: () => import('@/views/MyEventDetails.vue')
  },
  {
    path: '/manage-event/:id',
    name: 'ManageEvent',
    component: () => import('@/views/ManageEvent.vue')
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('@/views/ResetPassword.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  let currentRoute = from;
  if (currentRoute.name === "AddEvent" && (store.state.events.currentStep < 3)) {
    if (confirm("Voulez-vous quitter la page ? Vous allez perdre les modifications en cours")) {
      return next();
    } else {
      next(false);
    }
  }
  next();
})

export default router;
