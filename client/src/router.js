import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import ApodList from './views/ApodList.vue';
import ApodDetail from './components/ApodDetail.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login,
    },
    {
      path: '/list',
      name: 'ApodList',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ApodList,
      children: [{
        path: '/list/:id',
        name: 'ApodDetail',
        component: ApodDetail,
      }],
    },
  ],
});
