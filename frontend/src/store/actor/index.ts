import { defineStore } from 'pinia';

import * as actions from './actions';
import * as getters from './getters';
import { createActorStoreState } from './state';

export const useActorStore = defineStore('actor', {
	state: createActorStoreState(),
	actions,
	getters,
});
