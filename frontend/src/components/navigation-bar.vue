<template lang="pug">
.flex.flex-row.border-b.px-8
	.flex.flex-row.flex-1
		NavigationBarTab(v-for="tab of leftTabs", :tab="tab")
	.flex.flex-row.flex-1.justify-end
		NavigationBarTab(v-for="tab of rightTabs", :tab="tab")
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { Tab } from '~/types/tab';

import NavigationBarTab from './navigation-bar-tab.vue';

const leftTabs: Tab[] = [
	{
		title: 'Drills',
		route: '/drills',
	},
	{
		title: 'Drilldashes',
		route: '/drilldashes',
	},
];

const rightTabs: Tab[] = [
	{
		title: 'Login',
		route: '/login',
	},
	{
		title: 'Register',
		route: '/register',
	},
];

export default defineComponent({
	components: { NavigationBarTab },
	setup() {
		return { leftTabs, rightTabs };
	},
});
</script>
