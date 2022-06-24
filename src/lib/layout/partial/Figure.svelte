<script>
	export let background = null;
	export let embed = null;
	export let download = null;
	export let height = null;
	export let fullwidth = false;
	export let id = null;

	if (!id) id = Math.floor(Math.random() * 10000);
	
	let expanded = false;
	let status = null;

	function sleep (time) {
  	return new Promise((resolve) => setTimeout(resolve, time));
	}

	function clip() {
		status = "Copied to clipboard";
  	navigator.clipboard.writeText(embed);
		sleep(5000).then(() => status = null);
	} 
</script>

<div class="pym-interactive margin-left--0" class:pym-interactive--full-width={fullwidth} style:background-color={background} style:height="{!height ? null : typeof height == 'number' ? height + 'px' : height}">
	<slot/>
</div>
<div class="actions">
	{#if embed}
	<button aria-label="embed code" aria-expanded="{expanded}" on:click={() => expanded = !expanded}>Embed code</button>
	{/if}
	{#if download}
	<button aria-label="download data" on:click="{typeof download == 'function' ? download : () => location.href = download}">Download data</button>
	{/if}
	{#if expanded}
	<div class="details__body">
		<label class="embed-code__label" for="embed-{id}">Embed this interactive</label>
		<input class="embed-code__code width-md--31" value="{embed}" id="embed-{id}" name="embed-{id}" readonly="">
		<span class="embed-code__success-container">
			<button type="button" class="btn btn--primary embed-code__button js-embed-code-copy" on:click={clip}>Copy</button>
			<span role="status">
				{#if status}
				<span class="embed-code__success-message">{status}</span>
				{/if}
			</span>
		</span>
	</div>
	{/if}
</div>

<style>
	.embed-code__success-container {
		position: relative;
	}
	.embed-code__success-container > button {
		top: -21px;
	}
	.actions > button {
		border: none;
		background: none;
		color: rgb(32, 96, 149);
		text-decoration: underline;
		font-size: 16px;
		line-height: normal;
		margin: 0;
		padding: 0 5px 0 0;
		vertical-align: top;
	}
	.actions {
		display: block;
		margin: 5px 0 24px 0;
	}
</style>