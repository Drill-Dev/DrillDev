<template lang="pug">
.column.h-full
	navigation-bar
	router-view
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NavigationBar from '~/components/navigation-bar.vue';

export default defineComponent({
	components: { NavigationBar },
});
</script>
