<template lang="pug">
.row.h-full
	.flex.flex-1.center
		.column.gap-y-5.w-125.m-8
			.text-5xl.font-black {{ title }}
			.font-bold.text-xl.text-gray-700 Drill Development
			slot
	.flex-1
		.h-full.bg-gradient-to-tr.from-blue-500.to-blue-700
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AuthButton from '~/components/auth-button.vue';

export default defineComponent({
	name: 'AuthLayout',
	components: { AuthButton },
	props: {
		title: {
			type: String,
			required: true,
		},
	},
	setup() {
		// TODO
	},
});
</script>
