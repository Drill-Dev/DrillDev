<template lang="pug">
template(v-for='tab of tabs')
	router-link(:to='tab.route') {{ tab.title }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

type Tab = {
	title: string;
	route: string;
};

const tabs: Tab[] = [
	{
		title: 'Drills',
		route: '/drills',
	},
	{
		title: 'Drilldashes',
		route: '/drilldashes',
	},
];

export default defineComponent({
	setup() {
		return { tabs };
	},
});
</script>
