<template lang="pug">
.flex.h-screen.justify-center.items-center
	form.column.w-100.h-75.justify-evenly.border.rounded-3xl.p-8(
		@submit="onSubmit"
	)
		.text-3xl.font-black Reset Password
		input.border.rounded-3xl.h-10.px-5(
			placeholder="New password",
			v-model="newPassword",
			type="password"
		)
		input.border.rounded-3xl.h-10.px-5(
			placeholder="Confirm new password",
			v-model="confirmPassword",
			type="password"
		)
		.text-red-700(v-show="!passwordsMatch") Passwords do not match.
		button.border.rounded-3xl.h-10.px-5(:disabled="!passwordsMatch") Submit
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import { serverKy } from '~/utils/ky';

export default defineComponent({
	name: 'ResetPasswordPage',
	setup() {
		const router = useRouter();
		const { token }: { token?: string } = router.currentRoute.value.query;
		const newPassword = ref('');
		const confirmPassword = ref('');
		const passwordsMatch = computed(
			() => newPassword.value === confirmPassword.value
		);
		const onSubmit = async (event: Event) => {
			event.preventDefault();
			if (passwordsMatch.value) {
				await serverKy.post(`auth/reset/${token}`, {
					json: { password: newPassword.value },
				});
			}
		};
		return { newPassword, confirmPassword, passwordsMatch, onSubmit };
	},
});
</script>
