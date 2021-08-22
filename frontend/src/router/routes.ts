import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
	{
		path: '/submit',
		component: () => import('~/pages/SubmitSolution.vue'),
	},
];
