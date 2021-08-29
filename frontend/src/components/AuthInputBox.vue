<template lang="pug">
.flex.flex-col
	.font-bold {{ title }}
	input.border.rounded-xl.px-5.py-3.mt-2(
		:placeholder='title',
		:type='type',
		:value='modelValue',
		@input='onUpdate'
	)
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'AuthInputBox',
	props: {
		modelValue: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
	},
	emits: ['update:modelValue'],
	setup(_props, ctx) {
		const onUpdate = (event: Event) => {
			const newValue = (event.target as HTMLInputElement).value;
			ctx.emit('update:modelValue', newValue);
		};
		return { onUpdate };
	},
});
</script>
