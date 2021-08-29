import type { ActionThis, GetterThis, RawStore } from '../types';
import type * as actorActions from './actions';
import type * as actorGetters from './getters';

type ActorActions = typeof actorActions;
type ActorGetters = typeof actorGetters;

export type ActorStoreState = {
	id: string | undefined; // an ID of undefined means that the user isn't logged in
};

export type FilesActionThis = ActionThis<
	'actor',
	ActorStoreState,
	ActorGetters,
	ActorActions
>;

export type FilesGetterThis = GetterThis<ActorStoreState, ActorGetters>;

export type FilesStore = RawStore<
	'files',
	ActorStoreState,
	ActorGetters,
	ActorActions
>;
