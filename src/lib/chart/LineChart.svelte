<script>
    import { scaleLinear } from "d3-scale";

	export let data;
    export let yKey = (xKey) => `${xKey}_index`;
	export let zKey = "areanm";
	export let height = 65;
	export let lineWidth = 2;
	export let xDomain = [1981, 1991, 2001, 2011];
	export let xVal = 2011;
	export let formatTick = (tick) => `${tick - 1 > 0 ? '+' : ''}${Math.round((tick - 1) * 100)}`;

	$: yDomain = makeYDomain(data);
	$: zDomain = data.map(d => d[zKey]).filter((v, i, a) => a.indexOf(v) === i);
	
    $: xScale = scaleLinear().domain([xDomain[0], xDomain[xDomain.length - 1]]).range([0, 100]);
	$: yScale = scaleLinear().domain([yDomain[0], yDomain[1]]).range([100, 0]);

    function makeYDomain(data) {
        let min;
        let max;
        data.forEach(d => {
            xDomain.forEach(x => {
                let val = d[yKey(x)];
                if (!min || val < min) min = val;
                if (!max || val > max) max = val;
            });
        });
        return [min, max];
    }
    function makePath(d) {
        let series = xDomain.map(x => ({x, y: d[yKey(x)]}));
		return "M" + series.map(d => `${xScale(d.x)} ${yScale(d.y)}`).join("L");
	};
</script>

<ul class="legend-block">
	{#if zDomain[1]}
	{#each zDomain as group, i}
	<li>
		<div class="legend-vis marker-vis" style:border-bottom="{i == 0 ? `${lineWidth + 1.5}px solid #27A0CC`: `${lineWidth}px solid black`}"></div>
		<span class="{i == 0 ? 'bold' : 'brackets'}">{group}</span>
	</li>
	{/each}
	{/if}
</ul>

<div class="line-group" style:height="{height}px">
	<div class="baseline" style:top="{yScale(1)}%"/>
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {#each [...data].reverse() as d, i}
        <path d={makePath(d, )} vector-effect="non-scaling-stroke" stroke="{i == data.length - 1 ? '#27A0CC' : 'black'}" stroke-width="{i == data.length - 1 ? lineWidth + 1.5 : lineWidth}"/>
        {/each}
    </svg>
	<div class="point" style:left="{xScale(xVal)}%" style:top="{yScale(data[0][yKey(xVal)])}%"/>
	{#if xVal != xDomain[0]}
	<div class="point-text bold" style:left="{xScale(xVal)}%" style:top="{yScale(data[0][yKey(xVal)])}%">{formatTick(data[0][yKey(xVal)])}%</div>
	{/if}
</div>

<div class="x-scale" style:height="1rem">
	<div style:left="0">{xDomain[0]}</div>
	<div style:right="0">{xDomain[xDomain.length - 1]}</div>
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
	.line-group, .x-scale {
		display: block;
		position: relative;
		width: 100%;
	}
	.line-group {
		margin-top: 24px;
	}
	.baseline {
		position: absolute;
		left: 0;
		width: 100%;
		border-top: 1.5px solid #555;
	}
	.x-scale {
		position: relative;
		font-size: 0.9rem;
	}
	.x-scale > div {
		position: absolute;
		top: 0;
		line-height: normal;
		padding-top: 2px;
	}
	.marker-vis {
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
	svg {
		width: 100%;
		height: 100%;
        overflow: visible;
	}
	path {
		fill: none;
	}
	.point {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: #27A0CC;
		border-radius: 50%;
		transform: translate(-50%,-50%);
	}
	.point-text {
		position: absolute;
		line-height: 1;
		background-color: rgba(245,245,246,0.7);
		transform: translate(-100%,calc(-100% - 7px));
	}
</style>