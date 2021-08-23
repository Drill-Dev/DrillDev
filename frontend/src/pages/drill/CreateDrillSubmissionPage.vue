<template lang="pug">
.flex.flex-col
	input(type='file' ref='fileInput' name='file')
	button(@click="submitCode") Submit
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { serverKy } from '~/utils/ky';

export default defineComponent({
	setup() {
		const fileInput = ref<HTMLInputElement>();

		async function submitCode() {
			const formData = new FormData();
			formData.append('file', fileInput.value!.files![0] as Blob);

			const response = await serverKy.post('run', {
				body: formData,
			});

			const { status } = await response.json();
			console.log(status);
		}

		return {
			fileInput,
			submitCode,
		};
	},
});
</script>
