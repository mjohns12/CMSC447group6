import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/op-chief',
      name: 'Operations Chief Home',
      component: () => import('./views/opChiefView.vue'),
      children: [{
          path: 'active-missions',
          component: () => import('./views/MissionsInProgress.vue'),
        }, {
          path: 'create-mission',
          component: () => import('./views/MissionsInProgress.vue'),
        }, {
          path: 'create-responder',
          component: () => import('./views/MissionsInProgress.vue'),
        }, {
          path: 'create-equipment',
          component: () => import('./views/MissionsInProgress.vue'),
        },
      ],
    },
  ],
});
