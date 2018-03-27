import {UIRouterReact, servicesPlugin, hashLocationPlugin} from '@uirouter/react';
import appStates from './states';

export const router = new UIRouterReact();
router.plugin(servicesPlugin);
router.plugin(hashLocationPlugin);
appStates.forEach(state => router.stateRegistry.register(state));
router.urlService.rules.initial({ state: 'home'});