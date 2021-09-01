<template lang="pug">
AuthLayout(title="Login to DrillDev")
	AuthInputBox(title="Email", type="text", v-model="usernameOrEmail")
	AuthInputBox(title="Password", type="password", v-model="password")
	AuthButton.bg-blue-700.text-white.transition-all.duration-25(
		title="Login",
		class="hover:bg-blue-900",
		@click="onLogin"
	)
</template>

<script lang="ts">
import validator from 'email-validator';
import { computed, defineComponent, ref } from 'vue';

import AuthButton from '~/components/auth-button.vue';
import AuthInputBox from '~/components/auth-input-box.vue';
import AuthLayout from '~/components/auth-layout.vue';
import { serverKy } from '~/utils/ky';

export default defineComponent({
	name: 'LoginPage',
	components: { AuthLayout, AuthInputBox, AuthButton },
	setup() {
		const usernameOrEmail = ref('');
		const password = ref('');

		const isEmail = computed(() => validator.validate(usernameOrEmail.value));

		const onLogin = async () => {
			const _response = await serverKy.post('auth/login', {
				json: {
					[isEmail.value ? 'email' : 'username']: usernameOrEmail.value,
					password: password.value,
				},
			});
			// TODO: store response in localstorage
		};

		return { usernameOrEmail, password, onLogin };
	},
});
</script>
