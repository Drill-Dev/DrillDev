<template lang="pug">
AuthLayout(title="Register for DrillDev")
	AuthInputBox(title="Username" type="text" v-model="username")
	AuthInputBox(title="Email" type="text" v-model="email")
	AuthInputBox(title="Password" type="password" v-model="password")
	AuthInputBox(
		title="Confirm password"
		type="password"
		v-model="confirmPassword"
	)
	label.row.cursor-pointer
		input(type="checkbox")
		.ml-4
			| I have read and agreed to the #{ ' ' }
			a.text-blue-700(href target="_blank") Terms and Conditions #{ ' ' }
			| and the #{ ' ' }
			a.text-blue-700(href target="_blank") Privacy Policy
	AuthButton.bg-blue-700.text-white.transition-all.duration-25(
		title="Register"
		class="hover:bg-blue-900"
	)
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import AuthButton from '~/components/AuthButton.vue';
import AuthInputBox from '~/components/AuthInputBox.vue';
import AuthLayout from '~/components/AuthLayout.vue';

export default defineComponent({
	name: 'RegisterPage',
	components: { AuthLayout, AuthInputBox, AuthButton },
	setup() {
		const username = ref('');
		const email = ref('');
		const password = ref('');
		const confirmPassword = ref('');

		return { username, email, password, confirmPassword };
	},
});
</script>
