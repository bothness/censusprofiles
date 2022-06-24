<script>
	import { setContext } from "svelte";
	import Breadcrumb from "./partial/Breadcrumb.svelte";
	import Highlighted from "./partial/Highlighted.svelte";
	import Navbox from "./partial/Navbox.svelte"
	import Meta from "./partial/Meta.svelte";
	
	export let mode = "neutral";
	export let background = "grey";
	export let breadcrumb = null;
	export let contents = null;
	export let highlighted = null;
	export let date = null;
	export let updated = null;
	export let hr = true;
	
	setContext("mode", mode);
	setContext("background", background);
</script>

<div class="page-neutral-intro {background == 'grey' ? 'background--gallery' : ''}">
	<div class="wrapper">
		<div class="col-wrap">
			<div class="col">
				{#if breadcrumb}
				<Breadcrumb links={breadcrumb} mode={background == 'none' ? 'neutral' : mode}/>
				{/if}
				<div class="col col--md-47" class:col--lg-38={highlighted} class:col--lg-48={!highlighted}>
					<slot/>
					{#if date}
					<p class="page-neutral-intro__meta margin-top--0 margin-bottom--3">{date}</p>
					{/if}
					{#if contents}
					<Navbox links={contents} title="Contents"/>
					{/if}
				</div>
				{#if highlighted}
				<Highlighted links={highlighted}/>
				{/if}
			</div>
		</div>
	</div>
	<slot name="meta"/>
	{#if updated}
	<Meta label="Last updated" value={updated} {background}/>
	{/if}
	{#if background == "none" && hr}
	<div class="wrapper">
		<div class="col-wrap">
			<div class="col">
				<hr style="border: 0; height: 0; border-top: 1px solid #808080;">
			</div>
		</div>
	</div>
	{/if}
</div>