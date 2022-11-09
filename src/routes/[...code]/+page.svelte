<script>
	import { onMount, setContext } from "svelte";
	import { format } from "d3-format";
	import { afterNavigate, goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { page } from "$app/stores";
	import { themes, mapsources, years } from "$lib/config";
	import { suffixer, plusminus } from "$lib/utils";

	import Titleblock from "$lib/layout/Titleblock.svelte";
	import Headline from "$lib/layout/partial/Headline.svelte";
	import Content from "$lib/layout/Content.svelte";
	import Cards from "$lib/layout/Cards.svelte";
	import Card from "$lib/layout/partial/Card.svelte";
	import Em from "$lib/ui/Em.svelte";
	import Select from "$lib/ui/Select.svelte";
	import Icon from "$lib/ui/Icon.svelte";
	import BarChart from "$lib/chart/BarChart.svelte";
	import ProfileChart from "$lib/chart/ProfileChart.svelte";
	import LineChart from "$lib/chart/LineChart.svelte";
	import { Map, MapSource, MapLayer } from "@onsvisual/svelte-maps";
	import MapTooltip from "@onsvisual/svelte-maps/src/MapTooltip.svelte";

	export let data;
	let { places, lookup, place, ew, type, child_type, count } = data;
	$: ({ places, lookup, place, ew, type, child_type, count } = data);

	const assets = "https://bothness.github.io/censusprofiles";

	let year = years[years.length - 1];
	$: type_keys = !type ? null : child_type ? [type.key, child_type.key] : [type.key];

	onMount(() => {
		if (!place) {
			goto(`${base}/${ew.areacd}/?year=${years[years.length - 1]}`);
		} else {
			let yr = $page.url.searchParams.get('year');
			year = yr ? yr : years[years.length - 1];
		}
	});

	afterNavigate(() => {
		let yr = $page.url.searchParams.get('year');

		if (yr && years.includes(+yr)) {
			year = yr;
		} else if (place) {
			goto(`${base}/${place.areacd}/?year=${years[years.length - 1]}`, {noscroll: true});
		}

		if (map) map.fitBounds(place.bounds, {padding: 20});
	});

	// STYLE CONFIG
	// Set theme globally (options are 'light' or 'dark')
	let theme = "light";
	setContext("theme", themes[theme]);
	
	// DOM Elements
	let map = null;

	// Functions etc
	function navTo(code) {
		if (code && code != place.areacd) {
			goto(`${base}/${code}/?year=${year}`, {noscroll: true});
		}
	}

	// Postcode multi-select
	let placeholder = "Type a place name or postcode";
	let filterText = "";
	async function getPostcodes(filterText) {
		if (filterText.length > 2 && /\d/.test(filterText)) {
			let res = await fetch(`https://api.postcodes.io/postcodes/${filterText}/autocomplete`);
			let json = await res.json();
			return json.result.map(d => ({areacd: d, areanm: d, postcode: true}));
		} else if (filterText.length > 2) {
			return places.filter(p => p.areanm.toLowerCase().slice(0, filterText.length) == filterText.toLowerCase());
		}
		return [];
	}
	async function doSelect(e) {
		if (e.detail.postcode) {
			let res = await fetch(`https://api.postcodes.io/postcodes/${e.detail.areacd}`);
			let json = await res.json();
			if (json.result) {
				let place = places.find(p => p.areacd == json.result.codes.admin_district);
				if (place) {
					if (window.dataLayer) window.dataLayer.push({event: "postcodeSelect", name: place.areanm, code: place.areacd});
					placeholder = "Type a place name or postcode";
					navTo(place.areacd);
				} else {
					placeholder = "Postcode must be in England or Wales";
				}
			}
		} else {
			if (window.dataLayer) window.dataLayer.push({event: "nameSelect", name: e.detail.areanm, code: e.detail.areacd});
			navTo(e.detail.areacd);
			placeholder = "Type a place name or postcode";
		}
	}
	function mapSelect(e) {
		if (window.dataLayer && e.detail.feature) window.dataLayer.push({event: "nameSelect", name: e.detail.feature.properties.areanm, code: e.detail.id});
		navTo(e.detail.id);
	}
</script>

<svelte:head>
	<title>{place ? `${place.areanm} census population profile` : 'Census population profiles'} - {years[0]} to {years[years.length - 1]}</title>
	<link rel="icon" href="{assets}/favicon.ico" />
	<meta property="og:title" content="{place ? `${place.areanm} census population profile` : 'Census population profiles'} - {years[0]} to {years[years.length - 1]}" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{place ? `${assets}/${place.areacd}/` : `${assets}/`}" />
	<meta property="og:image" content="{assets}/img/og.png" />
	<meta property="og:image:type" content="image/png" />
	<meta name="description" content="{place ? `Explore census data and demographic trends for ${place.areanm}, from ${years[0]} to ${years[years.length - 1]}` : `Explore census data and demographic trends for places in England and Wales, from ${years[0]} to ${years[years.length - 1]}`}">
	<meta property="og:description" content="{place ? `Explore census data and demographic trends for ${place.areanm}, from ${years[0]} to ${years[years.length - 1]}` : `Explore census data and demographic trends for places in England and Wales, from ${years[0]} to ${years[years.length - 1]}`}" />
	{#if !place}
	<meta name="google-site-verification" content="bOaidjIuCmXziEqN28CxFcoWHBVn8vQo6uekfAZZx6o" />
	{/if}
</svelte:head>

{#if place && year}
<Titleblock
	background="none"
	breadcrumb="{place.areacd == ew.areacd ? [] : [...[...place.parents].reverse().map(p => ({label: p.areanm, url: `${base}/${p.areacd}/?year=${year}`})), {label: place.areanm}]}">
	<Headline>{place.areanm}</Headline>
	<Select items={places} mode="search" idKey="areacd" labelKey="areanm" {placeholder} bind:filterText loadOptions={getPostcodes} autoClear on:select={doSelect}/>
	<p class="subtitle">
		{#if place.areacd != ew.areacd}
		<strong>{place.areanm}</strong> <small>({place.areacd})</small> is a {type.label_lng ? type.label_lng : type.label} in {place.parents[0].areanm}.
		The {type.label}'s population of {format(',')(place.data.population[`${year}`])} at the time of the {year} census made it the {suffixer(place.data.population[`${year}_rank`])} largest in {lookup[type.parent].areanm}.
		{#if place.data.population[`${year}_change`]}
		{place.areanm} saw a population {plusminus(place.data.population[`${year}_change`], ["increase", "decrease", "change"])} of {format('.1f')(Math.abs(place.data.population[`${year}_change`]))}% from {year - 10}.
		{/if}
		{:else}
		The population of <strong>{place.areanm}</strong> <small>({place.areacd})</small> was {format(',')(place.data.population[`${year}`])} at the time of the {year}
		{#if place.data.population[`${year}_change`]}
		census, {plusminus(place.data.population[`${year}_change`], ["an increase", "a decrease", "a change"])} of {format('.1f')(Math.abs(place.data.population[`${year}_change`]))}% from {year - 10}.
		{:else}
		census.
		{/if}
		{/if}
	</p>
</Titleblock>

<Content>
	<Cards title="Demographic data for {place.areanm}">
		<span slot="meta">
			<select on:change={e => goto(`${base}/${place.areacd}/?year=${e.target.value}`, {noscroll: true})}>
				{#each years as y}
				<option value={y} selected={y == year}>Census {y}</option>
				{/each}
			</select>
		</span>
		<Card title="Population">
			<div class="num-big">
				{format(',')(place.data.population[`${year}`])}
				{#if count > 1}
				<div class="btn-group">
					<button class="btn-chevron" disabled={!place.data.population[`${year}_next`]} on:click={() => goto(`${base}/${place.data.population[`${year}_next`]}/?year=${year}`, {noscroll: true})}><Icon type="chevron" rotation={90}/></button>
					<button class="btn-chevron" disabled={!place.data.population[`${year}_prev`]} on:click={() => goto(`${base}/${place.data.population[`${year}_prev`]}/?year=${year}`, {noscroll: true})}><Icon type="chevron" rotation={-90}/></button>
				</div>
				{/if}
			</div>
			<div class="num-suffix">people in {year}</div>
			{#if place.areacd != ew.areacd}
			<div class="num-desc"><Em color="lightgrey">{suffixer(place.data.population[`${year}_rank`])} largest</Em> of {count} {type.plural} in {lookup[type.parent].areanm}</div>
			{/if}
		</Card>
		<Card title="10 year change">
			<div class="num-big">
				{#if place.data.population[`${year}_change`]}
				{plusminus(place.data.population[`${year}_change`])}{format('.1f')(Math.abs(place.data.population[`${year}_change`]))}%
				{:else}
				N/A
				{/if}
				{#if count > 1}
				<div class="btn-group">
					<button class="btn-chevron" disabled={!place.data.population[`${year}_change_next`]} on:click={() => goto(`${base}/${place.data.population[`${year}_change_next`]}/?year=${year}`, {noscroll: true})}><Icon type="chevron" rotation={90}/></button>
					<button class="btn-chevron" disabled={!place.data.population[`${year}_change_prev`]} on:click={() => goto(`${base}/${place.data.population[`${year}_change_prev`]}/?year=${year}`, {noscroll: true})}><Icon type="chevron" rotation={-90}/></button>
				</div>
				{/if}
			</div>
			<div class="num-suffix">{plusminus(place.data.population[`${year}_change`], ["more people than", "fewer people than", "compared to"])} {year - 10}</div>
			{#if place.areacd != ew.areacd}
			<div class="num-desc">
				{#if place.data.population[`${year}_change`]}
				<Em color="lightgrey">{suffixer(place.data.population[`${year}_change_rank`])} largest increase</Em> of {count} {type.plural} in {lookup[type.parent].areanm}
				{:else}
				Comparable data not available for {year - 10}
				{/if}
			</div>
			{/if}
		</Card>
		<Card title="Change since 1981">
			<LineChart data={place.areacd == ew.areacd ? [place.data.population] : [place.data.population, ew.data.population]} zKey="areanm" xDomain={years} xVal={year}/>
		</Card>
		<Card title="Density">
			<div class="num-big">
				{format(',.0f')(place.data.density[`${year}`])}
				{#if count > 1}
				<div class="btn-group">
					<button class="btn-chevron btn-right" disabled={!place.data.density[`${year}_next`]} on:click={() => goto(`${base}/${place.data.density[`${year}_next`]}/?year=${year}`, {noscroll: true})}><Icon type="chevron" rotation={90}/></button>
					<button class="btn-chevron btn-left" disabled={!place.data.density[`${year}_prev`]} on:click={() => goto(`${base}/${place.data.density[`${year}_prev`]}/?year=${year}`, {noscroll: true})}><Icon type="chevron" rotation={-90}/></button>
				</div>
				{/if}
			</div>
			<div class="num-suffix">people per square km</div>
			{#if place.areacd != ew.areacd}
			<div class="num-desc"><Em color="lightgrey">{suffixer(place.data.density[`${year}_rank`])} densest</Em> of {count} {type.plural} in {lookup[type.parent].areanm}</div>
			{/if}
		</Card>
		<Card title="Age profile">
			<ProfileChart data={place.areacd == ew.areacd ? place.data.age : [...place.data.age, ...ew.data.age]} xKey="category" yKey="{year}_perc" zKey="areanm"/>
		</Card>
		<Card title="Sex">
			<BarChart data={place.areacd == ew.areacd ? place.data.sex : [...place.data.sex, ...ew.data.sex]} xKey="{year}_perc" yKey="category" zKey="areanm"/>
		</Card>
	</Cards>

	<Cards title="Explore related areas">
		<Card colspan={2} rowspan={2} blank>
			<div style:height="450px">
				<Map bind:map style="{base}/data/mapstyle.json" location={{bounds: place.bounds}} options={{fitBoundsOptions: {padding: 20}, maxBounds: [-12,47,7,62]}} controls>
					{#each mapsources as s}
					<MapSource id={s.key} type="vector" url={s.url} layer={s.key} promoteId={s.promoteId} maxzoom={8} props={{bounds: [-6.3603,49.88234,1.76357,55.8112]}}>
						{#each s.layers as l}
						{#if type_keys.includes(l.key)}
						<MapLayer
							id="{l.key}-fill"
							type="fill"
							paint={{
								'fill-color': l.key == type.key ? ['case', ['==', ['feature-state', 'selected'], true], 'rgb(17,140,123)', 'grey'] : 'rgb(17,140,123)',
								'fill-opacity': ['case', ['==', ['feature-state', 'hovered'], true], 0.3, 0.1]
							}}
							filter={type.key == 'lad' ? l.filter :
								l.key == type.key ? [...l.filter, ["!=", "areacd", place.areacd]] : 
								[...l.filter, ["in", "areacd", ...place.children.map(d => d.areacd)]]}
							hover let:hovered select selected={place.areacd}
							on:select={mapSelect}>
							<MapTooltip content={hovered ? lookup[hovered].areanm : ''}/>
						</MapLayer>
						<MapLayer
							id="{l.key}-line"
							type="line"
							paint={{'line-color': l.key == type.key ? 'grey' : 'rgb(17,140,123)', 'line-width': 1}}
							filter={l.key == type.key ?
								[...l.filter, ["!=", "areacd", place.areacd]] : 
								[...l.filter, ["in", "areacd", ...place.children.map(d => d.areacd)]]}/>
						<MapLayer
							id="{l.key}-active"
							type="line"
							paint={{'line-color': 'rgb(17,140,123)', 'line-width': 2}}
							filter={[...l.filter, ["==", "areacd", place.areacd]]}/>
						{/if}
						{/each}
					</MapSource>
					{/each}
				</Map>
			</div>
		</Card>
		<Card title="Parent areas of {place.areanm}">
			{#if place.parents[0]}
			{#each [...place.parents].reverse() as parent, i}
			<span class="parent" style:margin-left="{i == 0 ? 0 : `${(i - 1) * 20}px`}">
				{#if i != 0}<Icon type="subdir"/>{/if}
				<a href="{base}/{parent.areacd}/?year={year}" sveltekit:noscroll>{parent.areanm}</a>
			</span>
			{/each}
			{:else}
			<span class="muted">No parent areas</span>
			{/if}
		</Card>
		<Card title="Areas in {place.areanm}">
			{#if place.children[0]}
			{#each place.children as child, i}
			<a href="{base}/{child.areacd}/?year={year}" sveltekit:noscroll>{child.areanm}</a>{i == place.children.length - 1 ? '' : ', '} 
			{/each}
			{:else}
			<span class="muted">No areas available within {place.areanm}</span>
			{/if}
		</Card>
	</Cards>
</Content>
{:else if !place}
<Content>
	<a class="redirect" href="{base}/{ew.areacd}/?year={years[years.length - 1]}">Loading England and Wales...</a>
</Content>
{/if}

<style>
	:global(.tile) {
		color: black;
		font-size: 1rem;
	}
	:global(p) {
		font-size: 1rem;
	}
	:global(.mapboxgl-ctrl-icon, .maplibregl-ctrl-icon) {
		visibility: visible !important;
	}
	a {
		color: #206095;
		text-decoration: underline;
	}
	a:hover {
		color: rgb(0, 60, 87);
	}
	a.redirect {
		display: block;
		margin-top: 20px !important;
	}
	.subtitle {
		margin: 8px 0;
	}
	.parent {
		display: block;
	}
	.muted {
		color: grey;
	}
	select {
		appearance: none;
		background: #206095 url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="8"><path d="M1.5.3L6 5.4 10.5.3c.2-.2.4-.2.6 0l.7.7c.1.2.1.4 0 .5L6.3 7.7c-.2.2-.4.2-.6 0L.2 1.6C.1 1.4.1 1.2.2 1L.9.3c.2-.1.4-.1.6 0z" fill="white"/></svg>') padding-box no-repeat;
		background-position: calc(100% - 10px) 50%;
		background-size: 16px;
		color: white;
		font-weight: bold;
		border: none;
		border-radius: 0;
		padding: 5px 36px 5px 9px;
		margin: 0 8px;
		font-size: 1rem;
		transform: translateY(-2px);
	}
	select:focus {
		outline: 4px solid orange;
	}
	.num-big {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		font-size: 3rem;
		font-weight: bold;
		line-height: 1.2;
	}
	.num-suffix {
		display: block;
		max-width: 100%;
		line-height: 1.1;
	}
	.num-desc {
		display: block;
		margin-top: 18px;
		color: #666;
		line-height: 1.6;
	}
	.btn-group {
		display: inline-flex;
		flex-direction: column;
		overflow: hidden;
		margin: 4px -5px 4px 0;
	}
	.btn-chevron {
		background: none;
		border: none;
		font-size: 20px;
		margin: 0;
		padding: 0;
		color: #206095;
	}
	.btn-chevron:disabled {
		color: #bbb;
	}
	.btn-chevron:hover {
		color: black;
	}
	/* Safari */
	@-webkit-keyframes spin {
		0% { -webkit-transform: rotate(0deg); }
		100% { -webkit-transform: rotate(360deg); }
	}
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
</style>