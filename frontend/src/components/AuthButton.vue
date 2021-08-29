<template lang="pug">
button.border.rounded-xl.px-5.py-3 {{ title }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'AuthButton',
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
