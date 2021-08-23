import { RouteRecordRaw } from 'vue-router';

const specificSubmissionRoutes: RouteRecordRaw[] = [
	{
		path: '/submission/:submissionId',
		component: () => import('~/pages/submission/SubmissionViewPage.vue'),
	},
	{
		path: '/submission/:submissionId/source',
		component: () => import('~/pages/submission/SubmissionViewSourcePage.vue'),
	},
	{
		path: '/submission/:submissionId/resubmit',
		component: () => import('~/pages/SubmissionResubmitPage.vue'),
	},
];

const specificDrillRoutes: RouteRecordRaw[] = [
	{
		path: '/drill/:drillId',
		component: () => import('~/pages/drill/DrillViewPage.vue'),
	},
	{
		path: '/drill/:drillId/submit',
		component: () => import('~/pages/drill/DrillSubmitSolutionPage.vue'),
	},
	{
		path: '/drill/:drillId/edit',
		component: () => import('~/pages/drill/DrillEditPage.vue'),
	},
];

const accountRoutes: RouteRecordRaw[] = [
	{
		path: '/login',
		component: () => import('~/pages/account/LoginPage.vue'),
	},
	{
		path: '/register',
		component: () => import('~/pages/account/RegisterPage.vue'),
	},
	{
		path: '/profile/:username',
		component: () => import('~/pages/account/ProfileViewPage.vue'),
	},
	{
		path: '/profile/:username/edit',
		component: () => import('~/pages/account/ProfileEditPage.vue'),
	},
];

const createRoutes: RouteRecordRaw[] = [
	{
		path: '/create/drill',
		component: () => import('~/pages/create/CreateDrillPage.vue'),
	},
	{
		path: '/create/drilldash',
		component: () => import('~/pages/create/CreateDrillDashPage.vue'),
	},
];

const websiteRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('~/pages/website/LandingPage.vue'),
	},
];

export const routes: RouteRecordRaw[] = [
	...specificSubmissionRoutes,
	...specificDrillRoutes,
	...accountRoutes,
	...createRoutes,
	...websiteRoutes,
];
