import type { RouteRecordRaw } from 'vue-router';

const specificSubmissionRoutes: RouteRecordRaw[] = [
	{
		path: '/submission/:submissionId',
		component: () => import('~/pages/submission/view-submission-page.vue'),
	},
	{
		path: '/submission/:submissionId/source',
		component: () =>
			import('~/pages/submission/view-submission-source-page.vue'),
	},
	{
		path: '/submission/:submissionId/resubmit',
		component: () => import('~/pages/submission/resubmit-submission-page.vue'),
	},
];

const specificDrillRoutes: RouteRecordRaw[] = [
	{
		path: '/drill/:drillId',
		component: () => import('~/pages/drill/view-drill-page.vue'),
	},
	{
		path: '/drill/:drillId/submit',
		component: () => import('~/pages/drill/create-drill-submission-page.vue'),
	},
];

const accountRoutes: RouteRecordRaw[] = [
	{
		path: '/login',
		component: () => import('~/pages/account/login-page.vue'),
	},
	{
		path: '/register',
		component: () => import('~/pages/account/register-page.vue'),
	},
	{
		path: '/profile/:username',
		component: () => import('~/pages/account/view-profile-page.vue'),
	},
	{
		path: '/profile/:username/edit',
		component: () => import('~/pages/account/edit-profile-page.vue'),
	},
	{
		path: '/password-reset',
		component: () => import('~/pages/account/reset-password-page.vue'),
	},
];

const manageRoutes: RouteRecordRaw[] = [
	{
		path: '/manage/drill',
		component: () => import('~/pages/manage/manage-drills-page.vue'),
	},
	{
		path: '/manage/drill/:drillId',
		component: () => import('~/pages/manage/manage-drill-page.vue'),
	},
	{
		path: '/manage/drilldash',
		component: () => import('~/pages/manage/manage-drilldashes-page.vue'),
	},
	{
		path: '/manage/drilldash/:drilldashId',
		component: () => import('~/pages/manage/create-drilldash-page.vue'),
	},
];

const websiteRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('~/pages/website/landing-page.vue'),
	},
];

export const routes: RouteRecordRaw[] = [
	{
		path: '',
		component: () => import('~/layouts/website-layout.vue'),
		children: [
			...specificSubmissionRoutes,
			...specificDrillRoutes,
			...accountRoutes,
			...manageRoutes,
			...websiteRoutes,
		],
	},
];
