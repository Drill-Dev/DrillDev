<template lang="pug">
AuthLayout(title="Login to DrillDev")
	AuthInputBox(title="Email", type="text", v-model="usernameOrEmail")
	AuthInputBox(title="Password", type="password", v-model="password")
	.text-red-500.font-bold {{ currentError }}
	AuthButton.bg-blue-700.text-white.transition-all.duration-25(
		title="Login",
		class="hover:bg-blue-900",
		@click="onLogin"
	)
</template>

<script lang="ts">
import validator from 'email-validator';
import type { HTTPError } from 'ky';
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import AuthButton from '~/components/auth-button.vue';
import AuthInputBox from '~/components/auth-input-box.vue';
import AuthLayout from '~/components/auth-layout.vue';
import { serverKy } from '~/utils/ky';

export default defineComponent({
	name: 'LoginPage',
	components: { AuthLayout, AuthInputBox, AuthButton },
	setup() {
		const router = useRouter();

		const usernameOrEmail = ref('');
		const password = ref('');

		const isEmail = computed(() => validator.validate(usernameOrEmail.value));

		const currentError = ref('');

		const onLogin = async () => {
			try {
				await serverKy.post('auth/login', {
					json: {
						[isEmail.value ? 'email' : 'username']: usernameOrEmail.value,
						password: password.value,
					},
				});
				router.push('/');
			} catch (error) {
				const httpError = error as HTTPError;
				currentError.value = await httpError.response.text();
			}
		};

		return { usernameOrEmail, password, onLogin, currentError };
	},
});
</script>
