<template lang="pug">
AuthLayout(title='Login to DrillDev')
	AuthInputBox(title='Email', type='text', v-model='email')
	AuthInputBox(title='Password', type='password', v-model='password')
	AuthButton.bg-blue-700.text-white.transition-all.duration-25(
		title='Login',
		class='hover:bg-blue-900'
	)
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AuthLayout from '~/components/AuthLayout.vue';
import AuthInputBox from '~/components/AuthInputBox.vue';
import AuthButton from '~/components/AuthButton.vue';

export default defineComponent({
	name: 'LoginPage',
	components: { AuthLayout, AuthInputBox, AuthButton },
	setup() {
		const email = ref('');
		const password = ref('');

		return { email, password };
	},
});
</script>
