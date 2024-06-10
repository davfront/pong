import Router from '@/utils/Router.js';

import '@/views/view-not-found.ce.js';
import '@/views/view-welcome.ce.js';
import '@/game/view-game-set-mode.ce.js';
import '@/game/view-game-offline.ce.js';

const router = new Router({
  useHash: false,
  baseUrl: '',
  linkAttribute: 'data-link',
  linkActiveClass: 'active',
  routes: [
    {
      name: 'welcome',
      path: '/',
      title: 'Pong',
      template: '<view-welcome></view-welcome>',
    },
    {
      name: 'game-mode',
      path: '/game',
      title: 'Game mode',
      template: '<view-game-set-mode></view-game-set-mode>',
    },
    {
      name: 'game-solo',
      path: '/game/solo',
      title: 'Game solo',
      template: '<view-game-offline></view-game-offline>',
    },
    {
      name: 'game-duo',
      path: '/game/duo',
      title: 'Game duo',
      template: '<view-game-offline duo></view-game-offline>',
    },
    {
      name: 'not-found',
      path: '/not-found',
      title: 'Not Found',
      template: '<view-not-found></view-not-found>',
    },
  ],
  fallbackRouteName: 'not-found',
  renderTarget: '#app',
});

router.init();

export let redirectTo = router.push;
export let currentRoute = router.currentRoute;
