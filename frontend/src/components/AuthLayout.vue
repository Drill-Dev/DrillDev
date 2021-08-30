<template lang="pug">
.flex.flex-row.h-full
	.flex.flex-1.justify-center.items-center
		.flex.flex-col.gap-y-5.w-125.m-8
			.text-5xl.font-black {{ title }}
			.text-xl.font-bold.text-gray-700 Drill Development
			slot
	.flex-1
		.h-full.bg-gradient-to-tr.from-blue-500.to-blue-700
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AuthButton from '~/components/AuthButton.vue';

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
