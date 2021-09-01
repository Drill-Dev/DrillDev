<template lang="pug">
router-link.px-2.py-4.transition-all.duration-50(
	:to="tab.route",
	class="hover:bg-gray-100"
) {{ tab.title }}
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import type { Tab } from '~/types/Tab';

export default defineComponent({
	name: 'NavigationBarTab',
	props: {
		tab: {
			required: true,
			type: Object as PropType<Tab>,
		},
	},
});
</script>

<style scoped>
.router-link-active::after {
	content: '';
	display: block;
	height: 3px;
	background-color: #0059ff;
}
</style>
