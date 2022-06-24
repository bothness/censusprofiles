<script>
  import { getContext } from "svelte";

  export let colspan = 1; // 1, 2 or 3
  export let rowspan = 1;
  export let title = "Section title";
  export let url = "/";
  export let description = "A short text description of this section.";
  export let image = null;

  let hovered = false;

  const { cols } = getContext("tiles");
</script>

<article
  class="height--31-indented-ellipsis padding-top--0 padding-right--0 padding-bottom--0 padding-left--0 js-hover-click"
  class:background--mercury={!hovered}
  class:background--ship-grey={hovered}
  style:grid-column="span {colspan == 1 ? 1 : colspan > $cols ? $cols : colspan}"
  style:grid-row="span {rowspan}"
  on:mouseover={() => hovered = true}
  on:mouseout={() => hovered = false}>
  {#if !image}
  <div
    class="min-height--10 padding-top--2 padding-left--1 padding-right--1"
    class:background--gallery={!hovered}
    class:background--ship-grey={hovered}
    class:js-hover-click--child={hovered}>
    <h3 class="flush">
      <a href="{url}">
        {title}
        <span class="box__clickable"></span>
      </a>
    </h3>
  </div>
  <div
    class="box__content padding-top--1 padding-right--1 padding-bottom--1 padding-left--1"
    class:border-top--iron-sm={!hovered}
    class:border-top--iron-md={!hovered}
    class:border-top--thunder-sm={hovered}
    class:border-top--thunder-md={hovered}
    class:js-hover-click--child={hovered}>
    <p>{description}</p>
  </div>
  {:else}
  <div
    class="js-hover-click height--31 print--hide"
    class:background--mercury={!hovered}
    class:background--ship-grey={hovered}>
    <div class="box__image padding-top--16 padding-right--1 padding-left--1">
      <h3 class="flush">
        <a href="{url}">
          {title}
          <span class="image-holder height--14">
            <img src="{image}" alt="{title}" class="no-border"/>
          </span>
          <span class="box__clickable"></span>
        </a>
      </h3>
      <p class="box__content flush">{description}</p>
    </div>
  </div>
  {/if}
</article>

<style>
  article {
    position: relative;
  }
  p {
    font-size: 14px;
  }
</style>