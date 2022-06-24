<script>
	export let links = [];
	export let mode = "neutral";
</script>

<nav aria-label="Breadcrumbs">
	<div class="{mode == 'neutral' ? 'breadcrumb-neutral' : 'breadcrumb'} print--hide">
		<ol class="breadcrumb__list">
			{#each links as link}
			<li class="breadcrumb__item">
				{#if link.url}
				<a class="breadcrumb__link" href="{link.url}">{link.label}</a>
				{:else}
				{link.label}
				{/if}
			</li>
			{/each}
		</ol>
	</div>
</nav>