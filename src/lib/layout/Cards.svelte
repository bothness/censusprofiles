
<script>
  import { setContext } from "svelte";
	import { writable } from 'svelte/store';

  export let title = null;
  export let colwidth = "medium"; // narrow, medium, wide or full
  export let gridgap = 16;

  const defs = {
    narrow: {w: 180, c: 4},
    medium: {w: 280, c: 3},
    wide: {w: 380, c: 2},
    full: {w: "100%", c: 1}
  };

  let w;

  const cols = writable(defs[colwidth].c);

  $: columns = colwidth == "full" ? 1 : w ? Math.floor((w + gridgap) / (defs[colwidth].w + gridgap)) : defs[colwidth].c;
  $: cols.set(columns);

  setContext("tiles", { cols });
</script>

<div class="tiles">
  {#if title}
	<h2>{title}</h2>
  <slot name="meta"/>
  {/if}
  <div
    bind:clientWidth={w}
    class="tiles-grid margin-bottom"
    style:grid-template-columns="repeat({colwidth == 'full' ? '1fr' : 'auto-fit, minmax(min(' + defs[colwidth].w + 'px, 100%), 1fr))'}"
    style:grid-gap="{gridgap}px">
    <slot/>
  </div>
</div>

<style>
  h2 {
    display: inline-block;
  }
  .tiles-grid {
		display: grid;
		width: 100%;
		justify-content: stretch;
		grid-auto-flow: row dense;
    margin: 8px 0;
	}
</style>