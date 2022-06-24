<script>
  export let mode = "default";
  export let title = "Related links";
  export let id = null;
	export let links = [];
</script>

{#if mode == "neutral"}
<div {id} class="section__content--markdown section__content--markdown--neutral-article">
	<section>
    {#if title}<h2>{title}</h2>{/if}
    <div class="markdown-box-container">
      {#each links as link}
      <p>
        <a href="{link.url}">{link.label}</a>
        <br>{link.type} | {link.meta}
        <br>{link.description}
      </p>
      {/each}
    </div>
  </section>
</div>
{:else}
<div {id} class="tile-neutral width-md--40 margin-bottom--2">
  {#if title}<h2 class="tile-neutral__heading">{title}</h2>{/if}
  <ul class="list--neutral margin-bottom--0">
    {#each links as link}
    <li class="margin-bottom--3">
    <a href="{link.url}">{link.label}</a>
    <p class="tile-neutral-content__meta">
      {link.type}
      <span class="text--aluminium">|</span> {link.meta}
    </p>
    <p class="tile-neutral-content__description margin-top--0 margin-bottom--0 ">
      {link.description}
    </p>
    </li>
    {/each}
  </ul>
</div>
{/if}