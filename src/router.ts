import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

function responderRouteParams(route: any) {
  return {
    id: parseInt(route.params.id, 10)
  };
}

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
    }, {
      path: '/op-chief',
      name: 'Operations Chief Home',
      component: () => import('./views/opChiefView.vue'),
      children: [{
          path: 'active-missions',
          component: () => import('./views/MissionsInProgress.vue'),
        }, {
          path: 'create-mission',
          component: () => import('./views/NewMission.vue'),
        }, {
          path: 'create-responder',
          component: () => import('./views/CreateResponder.vue'),
        }, {
          path: 'create-equipment',
          component: () => import('./views/CreateEquipment.vue'),
        },
      ],
    }, {
      path: '/call-center',
      name: 'Create Event',
      component: () => import('./views/CreateEvent.vue')
    }, {
      path: '/first-responder/:id',
      component: () => import('./views/ResponderView.vue'),
      props: responderRouteParams
    }
  ],
});
