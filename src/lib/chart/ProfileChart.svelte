<script>
	export let data;
	export let xKey = "category";
	export let yKey = "value";
	export let zKey = "group";
	export let height = 70;
	export let markerWidth = 2.5;
	export let minmax = ["0 years", "85+"];
	
	function stackData(data, key) {
		let data_indexed = {};
		
		for (const d of data) {
			if (!data_indexed[d[key]]) {
				data_indexed[d[key]] = {
					label: d[key],
					values: []
				};
			}
			data_indexed[d[key]].values.push(d);
		}
		
		let data_stacked = [];
		for (const key in data_indexed) {
			data_stacked.push(data_indexed[key]);
		}
		return data_stacked;
	}
	
	$: xDomain = data.map(d => d[xKey]).filter((v, i, a) => a.indexOf(v) === i);
	$: yDomain = [0, Math.max(...data.map(d => d[yKey]))];
	$: zDomain = data.map(d => d[zKey]).filter((v, i, a) => a.indexOf(v) === i);
	
	$: yScale = (value) => Math.abs(value / yDomain[1]) * 100;
	
	$: data_stacked = stackData(data, zKey);
</script>

<ul class="legend-block">
	{#if zDomain[1]}
	{#each zDomain as group, i}
	<li>
		<div class="legend-vis {i == 0 ? 'bar' : 'marker-vis'}" style:border-bottom-width="{i == 0 ? 0 : markerWidth}px"></div>
		<span class="{i == 0 ? 'bold' : 'brackets'}">{group}</span>
	</li>
	{/each}
	{/if}
</ul>

<div class="bar-group" style:height="{height}px">
	{#each data_stacked as stack, i}
	{#if i == 0}
	{#each stack.values as d, j}
	<div class="bar" style:bottom="0" style:height="{yScale(d[yKey])}%" style:left="{(j / xDomain.length) * 100}%" style:width="calc({(1 / xDomain.length) * 100}% + 0.2px)"/>
	{/each}
	
	{:else}
	{#each stack.values as d, j}
	<div class="marker" style:bottom="calc({yScale(d[yKey])}% - {markerWidth / 2}px)" style:height="0px" style:left="{(j / xDomain.length) * 100}%" style:width="{(1 / xDomain.length) * 100}%" style:border-bottom-width="{markerWidth}px"/>
	{/each}
	{/if}
	{/each}
</div>

<div class="x-scale" style:height="1rem">
	<div style:left="0">{minmax[0]}</div>
	<div style:right="0">{minmax[1]}</div>
</div>

<style>
	.bold {
		font-weight: bold;
	}
	.brackets::before {
		content: "(";
	}
	.brackets::after {
		content: ")";
	}
	.bar-group, .x-scale {
		display: block;
		position: relative;
		width: 100%;
	}
	.x-scale {
		position: relative;
		border-top: 1.5px solid #555;
		font-size: 0.9rem;
	}
	.bar-group > div {
		position: absolute;
		height: 100%;
	}
	.x-scale > div {
		position: absolute;
		top: 0;
		line-height: normal;
		padding-top: 2px;
	}
	.bar {
		background-color: #27A0CC;
	}
	.marker {
		border-bottom: 2.5px solid black;
	}
	.marker-vis {
		border-bottom: 2px solid black;
		transform: translate(0,calc(3px - 0.5rem)) !important;
	}
	ul.legend-block {
		list-style-type: none;
		padding: 0;
		margin: 0 0 5px 0;
		min-height: 1rem;
	}
	ul.legend-block > li {
		display: inline-block;
		margin: 0 10px 0 0;
		padding: 0;
	}
	.legend-vis {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		transform: translate(0,3px);
	}
</style>