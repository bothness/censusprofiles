<script>
	export let background = "grey";
	export let label = "Last updated";
	export let value = "date";
</script>

<div class="meta-wrap--thin" class:meta-wrap={background == 'grey'}>
	<div class="wrapper">
		<dl class="col-wrap">
			<div class="col padding-left--0 meta__item meta__item--no-border">
				<dt class="meta__term inline">{label}:</dt>
				<dd class="inline">{@html value}</dd>
			</div>
		</dl>
	</div>
</div>