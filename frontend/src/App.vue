<template>
	<div class="flex flex-col h-full">
		<div class="flex-grow">
			<router-view />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'App',
});
</script>

<style>
html,
body,
#app {
	height: 100%;
}
</style>
