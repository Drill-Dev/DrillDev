<template lang="pug">
.flex.flex-col
	navigation-bar
	router-view
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NavigationBar from '~/components/NavigationBar.vue';

export default defineComponent({
	components: { NavigationBar },
});
</script>
