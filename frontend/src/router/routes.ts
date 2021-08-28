import { RouteRecordRaw } from 'vue-router';

const specificSubmissionRoutes: RouteRecordRaw[] = [
	{
		path: '/submission/:submissionId',
		component: () => import('~/pages/submission/ViewSubmissionPage.vue'),
	},
	{
		path: '/submission/:submissionId/source',
		component: () => import('~/pages/submission/ViewSubmissionSourcePage.vue'),
	},
	{
		path: '/submission/:submissionId/resubmit',
		component: () => import('~/pages/submission/ResubmitSubmissionPage.vue'),
	},
];

const specificDrillRoutes: RouteRecordRaw[] = [
	{
		path: '/drill/:drillId',
		component: () => import('~/pages/drill/ViewDrillPage.vue'),
	},
	{
		path: '/drill/:drillId/submit',
		component: () => import('~/pages/drill/CreateDrillSubmissionPage.vue'),
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
		component: () => import('~/pages/account/ViewProfilePage.vue'),
	},
	{
		path: '/profile/:username/edit',
		component: () => import('~/pages/account/EditProfilePage.vue'),
	},
	{
		path: '/password-reset',
		component: () => import('~/pages/account/ResetPasswordPage.vue'),
	},
];

const manageRoutes: RouteRecordRaw[] = [
	{
		path: '/manage/drill',
		component: () => import('~/pages/manage/ManageDrillsPage.vue'),
	},
	{
		path: '/manage/drill/:drillId',
		component: () => import('~/pages/manage/ManageDrillPage.vue'),
	},
	{
		path: '/manage/drilldash',
		component: () => import('~/pages/manage/ManageDrilldashesPage.vue'),
	},
	{
		path: '/manage/drilldash/:drilldashId',
		component: () => import('~/pages/manage/CreateDrilldashPage.vue'),
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
	...manageRoutes,
	...websiteRoutes,
];
