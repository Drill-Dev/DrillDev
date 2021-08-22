<template>
	<label for="file">Upload and test an HTML file</label><br />
	<input type="file" id="file" name="file" /><br />
	<button @click="submitCode">Submit</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { serverKy } from '~/utils/ky';

export default defineComponent({
	setup() {
		async function submitCode() {
			await serverKy.post('run');
		}

		return {
			submitCode,
		};
	},
});
</script>
