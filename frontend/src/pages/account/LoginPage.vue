<template lang="pug">
.flex.flex-row.h-full
	.flex.flex-1.justify-center.items-center
		.flex.flex-col.gap-y-5.w-125
			.text-5xl.font-black Login to DrillDev
			.text-xl.font-bold.text-gray-700 Drill Development
			AuthInputBox(title='Email', type='text', v-model='email')
			AuthInputBox(title='Password', type='password', v-model='password')
			AuthButton.bg-blue-700.text-white.transition-all.duration-25(
				title='Login',
				class='hover:bg-blue-900'
			)
	.flex-1
		.h-full.bg-gradient-to-tr.from-blue-500.to-blue-700
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AuthInputBox from '~/components/AuthInputBox.vue';
import AuthButton from '~/components/AuthButton.vue';

export default defineComponent({
	name: 'LoginPage',
	components: { AuthInputBox, AuthButton },
	setup() {
		const email = ref('');
		const password = ref('');

		return { email, password };
	},
});
</script>
