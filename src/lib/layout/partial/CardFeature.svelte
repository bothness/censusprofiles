<script>
  import { getContext } from "svelte";

  export let colspan = 1; // 1, 2 or 3
  export let rowspan = 1;
  export let title = "Local statistics";
  export let url = "https://www.ons.gov.uk/help/localstatistics";
  export let description = "Where to find statistics covering specific areas";
  export let image = "https://static.ons.gov.uk/images/cf4ffa0c-d7ea-43a9-85a4-03ea05bbaaaf/original/local-statistics.png";

  const { cols } = getContext("tiles");
</script>

<article class="tile tile__highlighted-content" style:grid-column="span {colspan == 1 ? 1 : colspan > $cols ? $cols : colspan}" style:grid-row="span {rowspan}">
  <div class="tile__highlighted-content-image-container">
    <img class="tile__highlighted-content-image" src="{image}" alt="">
  </div>
  <h2 class="margin-top--0 margin-bottom--0">
    <a class="margin-left--0 tile__link tile__link--highlighted-content-title font-size--24" href="{url}" data-gtm-group="in-focus" data-gtm-group-position="1">
      {title}
    </a>
  </h2>
  <p class="tile__text-description margin-top--0 margin-bottom--0">{description}</p>
</article>

<style>
  h3 {
    font-size: 1.3rem;
    font-weight: bold;
  }
  .blank {
    padding: 0;
    line-height: 1;
  }
  .tile, .blank {
    color: black;
    margin: 4px 0 0 !important;
  }
</style>