<template lang="pug">
.column.h-full
	.flex-grow
		router-view
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
