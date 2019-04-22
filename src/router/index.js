import Vue from 'vue';
import Router from 'vue-router';
import AuthGuard from './auth-guard';
import Home from '@/components/Home';
import Login from '@/components/Auth/Login';
import Registration from '@/components/Auth/Registration';
import Task from '@/components/task/Task';
import TaskId from '@/components/task/TaskId';
import ClientHome from '@/components/client/AppClientHome';

import AppTicherAll from '@/components/client/AppTicherAll';

import AppNewCollection from '@/components/client/AppNewCollection';
import AppNewPosition from '@/components/client/AppClientPositions';
import ClientId from '@/components/client/AppClientID';
import AllClients from '@/components/client/AllClient';
import Analytics from '@/components/Analytics/AppHomeAnalytics';

import Schedule from '@/components/Schedule/AppSchedule';
import AppNewShedule from '@/components/Schedule/components/AppNewShedule';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'reg',
      component: Registration
    },
    {
      path: '/task',
      name: 'task',
      component: Task,
      beforeEnter: AuthGuard
    },
    {
      path: '/task/:id',
      props: true,
      name: 'ts',
      component: TaskId,
      beforeEnter: AuthGuard
    },
    {
      path: '/allclients',
      name: 'allclients',
      component: AllClients,
      beforeEnter: AuthGuard
    },
    {
      path: '/clients',
      name: 'clients',
      component: ClientHome,
      beforeEnter: AuthGuard
    },
    {
      path: '/newcollection',
      name: 'newcollection',
      component: AppNewCollection,
      beforeEnter: AuthGuard
    },
    {
      path: '/clients/:id/:keyId',
      name:'subclient',
      props: true,
      component: AppNewPosition,
      beforeEnter: AuthGuard
    },
    {
      path: '/ticher',
      name: 'ticher',
      component: AppTicherAll,
      beforeEnter: AuthGuard
    },
    {
      path: '/position/:id:idCollection:idPosition',
      name: 'position',
      props: true,
      component: ClientId,
      beforeEnter: AuthGuard
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: Analytics,
      beforeEnter: AuthGuard
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule,
      beforeEnter: AuthGuard
    },
    {
      path: '/schedule/new',
      name: 'schedulenew',
      component: AppNewShedule,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
