<script>
	export let backlink = false;
	export let hr = false;
	export let id = null;
</script>

<div {id} class="section__content--markdown section__content--markdown--neutral-article">
	<section>
		<slot/>
		{#if backlink}
		<p><a href="#top">&uarr; Back to the top</a></p>
		{/if}
		{#if hr}
		<hr style="border: 0; height: 0; border-top: 1px solid #808080;">
		{/if}
	</section>
</div>