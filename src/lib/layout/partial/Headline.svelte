<script>
	import { getContext } from 'svelte';
	
	export let mode = getContext("mode");
</script>

<h1 class="{mode == 'neutral' ? 'page-neutral-intro__title' : 'page-intro__title'}">
	<slot/>
</h1>

<style>
	h1 {
		line-height: 1;
	}
</style>