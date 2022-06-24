<script>
	export let title = "Highlighted content";
	export let links = [];
</script>

<div class="nav-secondary--border-left-lg col col--md-47 col--lg-19 col--lg-offset-2 padding-left margin-top-lg--3">
	<h2 class="margin-top-lg--1">{title}</h2>
	<ul class="list--neutral margin-top--negative-one-fix">
		{#each links as link}
		<li>
			<a href="{link.url}" data-gtm-title="{link.label}" data-gtm-type="highlighted-links">{link.label}
</a>
		</li>
		{/each}
	</ul>
</div>