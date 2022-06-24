<script>
	export let title = null;
	export let links = [];
</script>

<nav class="ons-toc" aria-label="Pages in this section">
	{#if title}<h2 class="ons-toc__title ons-u-fs-r--b ons-u-mb-s">{title}</h2>{/if}
	<ol class="ons-list ons-u-mb-m ons-list--dashed">
		{#each links as link}
		{#if link.url}
		<li class="ons-list__item">
			<a href="{link.url}" class="ons-list__link">{link.label}</a>
		</li>
		{:else}
		<li class="ons-list__item" aria-current="true">
		{link.label}</li>
		{/if}
		{/each}
	</ol>
</nav>

<style>
	.ons-toc {
		box-sizing: border-box;
		display: block;
		overflow-wrap: break-word;
		margin-top: 24px;
	}
	.ons-toc__title {
		font-size: 16px !important;
		display: block;
		font-weight: 600;
		margin-block-end: 18px;
		margin-block-start: 0;
		margin-inline-end: 0;
		margin-inline-start: 0;
		margin: 0 0 18px 0;
		padding: 0;
	}
	.ons-list {
		display: block;
		list-style-image: none;
		list-style-position: outside;
		list-style-type: none;
		margin-block-end: 27px;
		margin-block-start: 0;
		margin: 0 0 27px 0;
		margin-inline-end: 0;
		margin-inline-start: 0;
		padding: 0;
		padding-inline-start: 0;
	}
	.ons-list__item {
		display: list-item;
		margin: 0 0 9px 25px;
		padding: 0;
		position: relative;
		font-size: 16px !important;
	}
	.ons-list__item::before {
		border-top-style: solid;
		border-top-width: 1px;
		content: "";
		display: block;
		height: 1px;
		left: 0;
		margin-left: -25px;
		position: absolute;
		top: 14px;
		width: 15px;
	}
</style>